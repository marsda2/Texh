#!/usr/bin/env node

/**
 * TEXH LLC — Markdown to Corporate PDF Generator
 * 
 * Usage:
 *   node generate-pdf.js <path-to-markdown-file> [output-path]
 * 
 * Examples:
 *   node generate-pdf.js "/path/to/Propuesta_Barbaras_Cafe.md"
 *   node generate-pdf.js "/path/to/Presupuesto.md" "/output/folder/"
 */

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const matter = require('gray-matter');
const MarkdownIt = require('markdown-it');

// --- Configuration ---
const SCRIPT_DIR = __dirname;
const TEMPLATE_PATH = path.join(SCRIPT_DIR, 'template.html');
const CSS_PATH = path.join(SCRIPT_DIR, 'texh-print.css');
const LOGO_PATH = path.join(SCRIPT_DIR, 'assets', 'texh-logo.png');

// --- Initialize Markdown Parser ---
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
});

// Enable tables (built-in to markdown-it)
// markdown-it has tables enabled by default

/**
 * Parse the markdown file, extracting YAML frontmatter and body content
 */
function parseMarkdownFile(filePath) {
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data: frontmatter, content } = matter(raw);
  return { frontmatter, content };
}

/**
 * Build header meta HTML from frontmatter data
 */
function buildHeaderMeta(frontmatter) {
  const lines = [];

  if (frontmatter.cliente) {
    lines.push(`<strong>Para:</strong> ${frontmatter.cliente}`);
  }
  if (frontmatter.fecha_creacion) {
    lines.push(`<strong>Fecha:</strong> ${frontmatter.fecha_creacion}`);
  } else {
    // Fallback: use today's date
    lines.push(`<strong>Fecha:</strong> ${new Date().toISOString().split('T')[0]}`);
  }
  if (frontmatter.estado) {
    const estadoLabel = {
      borrador: '📋 Borrador',
      enviado: '📤 Enviado',
      aceptado: '✅ Aceptado',
      rechazado: '❌ Rechazado'
    };
    lines.push(`<strong>Estado:</strong> ${estadoLabel[frontmatter.estado] || frontmatter.estado}`);
  }

  return lines.join('<br>');
}

/**
 * Build the category badge from frontmatter
 */
function buildMetaBadge(frontmatter) {
  if (!frontmatter.categoria && !frontmatter.tipo) return '';

  const labels = {
    desarrollo_web: '🌐 Desarrollo Web',
    marketing: '📱 Marketing Digital',
    branding: '🎨 Branding',
    software_b2b: '🏢 Software B2B',
    presupuesto: '💼 Presupuesto Comercial',
    propuesta: '📄 Propuesta Comercial'
  };

  const parts = [];
  if (frontmatter.tipo) {
    parts.push(labels[frontmatter.tipo] || frontmatter.tipo);
  }
  if (frontmatter.categoria) {
    parts.push(labels[frontmatter.categoria] || frontmatter.categoria);
  }

  return `<div class="texh-meta-badge">${parts.join(' — ')}</div>`;
}

/**
 * Extract a title from the first H1 in the markdown content
 */
function extractTitle(markdownContent) {
  const match = markdownContent.match(/^#\s+(.+)$/m);
  return match ? match[1].replace(/[*_]/g, '') : 'Propuesta Comercial';
}

/**
 * Read a file and convert it to a base64 data URI
 */
function toDataUri(filePath, mimeType) {
  const buf = fs.readFileSync(filePath);
  return `data:${mimeType};base64,${buf.toString('base64')}`;
}

/**
 * Assemble the full HTML document from template + content
 * CSS and logo are inlined since Puppeteer's setContent doesn't resolve file:// URIs
 */
function assembleHTML(markdownContent, frontmatter) {
  let template = fs.readFileSync(TEMPLATE_PATH, 'utf-8');

  // Convert markdown to HTML
  const htmlContent = md.render(markdownContent);

  // Build dynamic parts
  const title = extractTitle(markdownContent);
  const headerMeta = buildHeaderMeta(frontmatter);
  const metaBadge = buildMetaBadge(frontmatter);

  // Inline CSS: read the file content and inject as <style> tag
  const cssContent = fs.readFileSync(CSS_PATH, 'utf-8');
  // Replace the @import with an inline @import that Puppeteer can fetch over network
  const inlineCss = `<style>${cssContent}</style>`;

  // Inline logo as base64 data URI
  const logoDataUri = fs.existsSync(LOGO_PATH)
    ? toDataUri(LOGO_PATH, 'image/png')
    : '';

  // Inject into template
  template = template.replace('{{TITLE}}', title);
  template = template.replace('{{INLINE_CSS}}', inlineCss);
  template = template.replace('{{LOGO_PATH}}', logoDataUri);
  template = template.replace('{{HEADER_META}}', headerMeta || '');
  template = template.replace('{{META_BADGE}}', metaBadge);
  template = template.replace('{{CONTENT}}', htmlContent);

  return template;
}

/**
 * Generate PDF from HTML string using Puppeteer
 */
async function generatePDF(html, outputPath) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // Load HTML content
  await page.setContent(html, {
    waitUntil: 'networkidle0',
    timeout: 30000
  });

  // Wait for fonts to load
  await page.evaluateHandle('document.fonts.ready');

  // Generate PDF
  await page.pdf({
    path: outputPath,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '25mm',
      right: '20mm',
      bottom: '30mm',  // Increased bottom margin so footer does not overlap
      left: '20mm'
    },
    displayHeaderFooter: true,
    headerTemplate: '<div></div>',
    footerTemplate: `
      <div style="width: 100%; font-size: 8px; font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #94a3b8; display: flex; justify-content: space-between; align-items: center; padding: 0 20mm; box-sizing: border-box;">
        <div style="display: flex; align-items: center;">
          <span style="width: 5px; height: 5px; border-radius: 50%; background: #7c3aed; display: inline-block;"></span>
          <span style="margin-left: 6px;">Texh LLC &nbsp;|&nbsp; Engineering your Digital Future &nbsp;|&nbsp; texh.agency</span>
        </div>
        <div style="font-weight: 500; color: #64748b;">
          Confidencial — Uso exclusivo del destinatario &nbsp;|&nbsp; Página <span class="pageNumber"></span> de <span class="totalPages"></span>
        </div>
      </div>
    `,
    preferCSSPageSize: false
  });

  await browser.close();

  return outputPath;
}

/**
 * Determine output path from input path
 */
function resolveOutputPath(inputPath, customOutput) {
  const inputDir = path.dirname(inputPath);
  const inputBasename = path.basename(inputPath, '.md');

  if (customOutput) {
    // If customOutput is a directory, generate filename
    if (fs.existsSync(customOutput) && fs.statSync(customOutput).isDirectory()) {
      return path.join(customOutput, `${inputBasename}.pdf`);
    }
    return customOutput;
  }

  return path.join(inputDir, `${inputBasename}.pdf`);
}

// --- Main Execution ---
async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log(`
╔══════════════════════════════════════════════════════════╗
║           TEXH LLC — PDF Generator v1.0.0               ║
║         Engineering your Digital Future.                 ║
╚══════════════════════════════════════════════════════════╝

  Usage:
    node generate-pdf.js <markdown-file> [output-path]

  Examples:
    node generate-pdf.js ./Propuesta_Cliente.md
    node generate-pdf.js ./Presupuesto.md ./exports/

  The markdown file can include YAML frontmatter with:
    - tipo: presupuesto | propuesta
    - categoria: desarrollo_web | marketing | branding | software_b2b
    - cliente: "Nombre del Cliente"
    - fecha_creacion: 2026-03-23
    - estado: borrador | enviado | aceptado | rechazado
`);
    process.exit(0);
  }

  const inputPath = path.resolve(args[0]);
  const customOutput = args[1] ? path.resolve(args[1]) : null;

  // Validate input
  if (!fs.existsSync(inputPath)) {
    console.error(`❌ Error: File not found: ${inputPath}`);
    process.exit(1);
  }

  if (!inputPath.endsWith('.md')) {
    console.error(`❌ Error: Expected a .md file, got: ${path.extname(inputPath)}`);
    process.exit(1);
  }

  console.log(`\n🔧 TEXH LLC — PDF Generator`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`📄 Input:  ${inputPath}`);

  // Parse markdown
  const { frontmatter, content } = parseMarkdownFile(inputPath);

  if (Object.keys(frontmatter).length > 0) {
    console.log(`📋 Frontmatter detected: ${Object.keys(frontmatter).join(', ')}`);
  }

  // Assemble HTML
  const html = assembleHTML(content, frontmatter);

  // Resolve output path
  const outputPath = resolveOutputPath(inputPath, customOutput);
  console.log(`📦 Output: ${outputPath}`);
  console.log(`\n⏳ Generating PDF with Puppeteer...`);

  try {
    await generatePDF(html, outputPath);
    console.log(`\n✅ PDF generated successfully!`);
    console.log(`   → ${outputPath}\n`);
  } catch (err) {
    console.error(`\n❌ Error generating PDF:`, err.message);
    process.exit(1);
  }
}

main();
