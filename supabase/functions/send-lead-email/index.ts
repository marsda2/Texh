import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

// Obtenemos la API Key desde las variables de entorno de Supabase
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")

serve(async (req) => {
  try {
    // 1. Recibir los datos del Webhook
    const payload = await req.json()
    const record = payload.record 
    const table = payload.table // Sabremos si es voice_leads, quiz_leads o contact_card_leads
    
    let clientEmail = record.email
    let adminSubject = "🔥 Nuevo Lead Recibido"
    let adminHtml = ""
    let clientSubject = "Hemos recibido tu solicitud"
    let clientHtml = ""

    // ======== LÓGICA SEGÚN LA TABLA ========
    if (table === "voice_leads") {
      adminSubject = "🔥 Nuevo Lead de Voz"
      adminHtml = `
        <div style="font-family: sans-serif;">
          <h2>Nuevo lead de voz en la plataforma</h2>
          <p><strong>Email del cliente:</strong> ${record.email}</p>
          <p><strong>Audio:</strong> <a href="${record.audio_url}">Escuchar Nota de Voz</a></p>
        </div>
      `
      clientSubject = "Hemos recibido tu idea 💡"
      clientHtml = `
        <div style="font-family: sans-serif; color: #212121; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #212121;">¡Hola! Hemos recibido tu nota de voz.</h2>
          <p>Gracias por contactar a Texh Co.</p>
          <p>Nuestro equipo está analizando tu idea y nos pondremos en contacto contigo en las próximas 24-48 horas.</p>
          <br/>
          <p>Saludos,<br/><strong>El equipo de Texh Co.</strong></p>
        </div>
      `
    } else if (table === "quiz_leads") {
      adminSubject = "🔥 Nuevo Lead del Estimator Quiz"
      adminHtml = `
        <div style="font-family: sans-serif;">
          <h2>Nuevo lead del Estimator Quiz</h2>
          <p><strong>Nombre:</strong> ${record.name || 'N/A'}</p>
          <p><strong>Email:</strong> ${record.email || 'N/A'}</p>
          <p><strong>Teléfono:</strong> ${record.phone || 'N/A'}</p>
          <p><strong>Servicio:</strong> ${record.selected_service || 'N/A'}</p>
          <p><strong>Urgencia:</strong> ${record.selected_urgency || 'N/A'}</p>
          <p><strong>Presupuesto:</strong> ${record.selected_budget || 'N/A'}</p>
          <p><strong>Notas:</strong> ${record.notes || 'N/A'}</p>
        </div>
      `
      clientSubject = "¡Propuesta de Ecosistema Digital en camino! 🚀"
      clientHtml = `
        <div style="font-family: sans-serif; color: #212121; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #212121;">¡Hola ${record.name || ''}! Hemos recibido tus respuestas.</h2>
          <p>Gracias por completar nuestro Estimator Quiz en Texh Co.</p>
          <p>Estamos procesando la información sobre tu infraestructura digital y te enviaremos una propuesta inicial pronto.</p>
          <br/>
          <p>Saludos,<br/><strong>El equipo de Texh Co.</strong></p>
        </div>
      `
    } else if (table === "contact_card_leads") {
      adminSubject = "🔥 Nuevo Contacto (Digital Card)"
      adminHtml = `
        <div style="font-family: sans-serif;">
          <h2>Alguien solicitó más información vía Tarjeta Digital</h2>
          <p><strong>Email:</strong> ${record.email || 'N/A'}</p>
          <p><strong>Teléfono:</strong> ${record.phone || 'N/A'}</p>
          <p><strong>De parte de (Dueño de tarjeta):</strong> ${record.card_owner || 'N/A'}</p>
        </div>
      `
      // Para las contact cards, el nombre del dueño para ponerlo en el correo
      const cardOwnerName = record.card_owner === 'marcos' ? 'Marcos Troger' : 'Xiuny Huerta';
      
      clientSubject = "Gracias por conectar con nosotros 👋"
      clientHtml = `
        <div style="font-family: sans-serif; color: #212121; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #212121;">¡Hola! Un placer conectar.</h2>
          <p>Hemos recibido tu información de contacto a través de la tarjeta digital de ${cardOwnerName}.</p>
          <p>Nos pondremos en contacto contigo lo antes posible para explorar cómo podemos ayudarte.</p>
          <br/>
          <p>Saludos,<br/><strong>El equipo de Texh Co.</strong></p>
        </div>
      `
    } else if (table === "footer_leads") {
      adminSubject = "🔥 Nuevo Lead (Auditoría Local / Footer)"
      adminHtml = `
        <div style="font-family: sans-serif;">
          <h2>Nueva solicitud de Auditoría / Información</h2>
          <p><strong>Email:</strong> ${record.email || 'N/A'}</p>
          <p><strong>Teléfono:</strong> ${record.phone || 'N/A'}</p>
          <p><strong>Servicio:</strong> ${record.selected_service || 'N/A'}</p>
          <p><strong>Mensaje:</strong> ${record.message || 'N/A'}</p>
        </div>
      `
      clientSubject = "Solicitud recibida. Iniciando proceso ⚙️"
      clientHtml = `
        <div style="font-family: sans-serif; color: #212121; max-width: 600px; margin: 0 auto; background-color: #F0F0F0; padding: 40px; border-radius: 12px;">
          <h2 style="color: #212121; margin-top: 0; font-size: 24px; font-weight: 900; letter-spacing: -0.5px;">Mensaje recibido con éxito.</h2>
          <p style="font-size: 16px; line-height: 1.6;">Gracias por contactar a <strong>Texh Co.</strong></p>
          <p style="font-size: 16px; line-height: 1.6;">Ya tenemos tus datos en nuestro sistema. Nuestro equipo de ingenieros y estrategas está revisando tu caso para entender mejor las oportunidades de tu ecosistema digital.</p>
          <p style="font-size: 16px; line-height: 1.6;">Te daremos una respuesta estructurada y los próximos pasos en un plazo de <strong>24 a 48 horas</strong>.</p>
          <hr style="border: none; border-top: 1px solid #d1d1d1; margin: 30px 0;" />
          <p style="font-size: 14px; color: #666; margin-bottom: 0;"><strong>Texh Co.</strong> — Tecnología compleja. Resultados simples.</p>
        </div>
      `
    } else if (table === "call_bookings") {
      adminSubject = "🔥 Nueva Llamada Agendada"
      adminHtml = `
        <div style="font-family: sans-serif;">
          <h2>Nueva Sesión Estratégica Agendada</h2>
          <p><strong>Email:</strong> ${record.email || 'N/A'}</p>
          <p><strong>Fecha:</strong> ${record.date || 'N/A'}</p>
          <p><strong>Hora:</strong> ${record.time_slot || 'N/A'} (ET)</p>
        </div>
      `
      clientSubject = "Sesión Estratégica Confirmada 📅"
      clientHtml = `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background-color: #212121; color: #ffffff; padding: 40px; border-radius: 12px;">
          <h2 style="color: #C9FF1F; margin-top: 0; font-size: 24px; font-weight: 900; letter-spacing: -0.5px;">Tu sesión está confirmada.</h2>
          <p style="font-size: 16px; line-height: 1.6; color: #e0e0e0;">Gracias por agendar con <strong>Texh Co.</strong></p>
          <p style="font-size: 16px; line-height: 1.6; color: #e0e0e0;">Tu llamada estratégica ha quedado registrada en nuestro sistema para el día <strong>${record.date}</strong> a las <strong>${record.time_slot} (Hora de NY)</strong>.</p>
          <p style="font-size: 16px; line-height: 1.6; color: #e0e0e0;">Por favor, prepárate para compartir el estado actual de tu infraestructura digital. Nos pondremos en contacto contigo a la hora acordada.</p>
          <p style="font-size: 16px; line-height: 1.6; color: #e0e0e0;">Si por algún motivo necesitas cancelar o reprogramar, háznoslo saber con antelación.</p>
          <hr style="border: none; border-top: 1px solid #333333; margin: 30px 0;" />
          <p style="font-size: 14px; color: #888888; margin-bottom: 0;"><span style="color: #ffffff; font-weight: bold;">Texh Co.</span> — Arquitectos Digitales.</p>
        </div>
      `
    } else {
      adminSubject = `🔥 Nuevo registro en la tabla: ${table}`
      adminHtml = `<p>Nuevo registro: ${JSON.stringify(record)}</p>`
    }

    const emailPromises = []

    // 2. Enviar email al CLIENTE (Solo si dejó un email válido, y no solo el teléfono)
    if (clientEmail && clientEmail.includes('@') && clientHtml) {
      emailPromises.push(
        fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: "Texh Co. <hello@texhco.com>",
            to: clientEmail,
            subject: clientSubject,
            html: clientHtml,
          }),
        })
      )
    }

    // 3. Enviar email al ADMIN (Siempre se envía, aunque el cliente no ponga email)
    emailPromises.push(
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: "Notificaciones Texh <hello@texhco.com>",
          to: ["marcos.troger@gmail.com", "xiuhq66@gmail.com"],
          subject: adminSubject,
          html: adminHtml,
        }),
      })
    )

    // Ejecutar envíos
    await Promise.all(emailPromises)

    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    })

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { "Content-Type": "application/json" },
      status: 400,
    })
  }
})
