import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

// Obtenemos la API Key desde las variables de entorno de Supabase
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")

serve(async (req) => {
  try {
    // 1. Recibir los datos del Webhook de la Base de Datos
    const payload = await req.json()
    
    // El "record" contiene la nueva fila insertada en la tabla
    const record = payload.record 
    const clientEmail = record.email
    const audioUrl = record.audio_url 

    // 2. Enviar el email de auto-respuesta al CLIENTE
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Texh Co. <hello@texhco.com>",
        to: clientEmail,
        subject: "Hemos recibido tu idea 💡",
        html: `
          <div style="font-family: sans-serif; color: #212121; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #212121;">¡Hola! Hemos recibido tu nota de voz.</h2>
            <p>Gracias por contactar a Texh Co.</p>
            <p>Nuestro equipo está analizando tu idea y nos pondremos en contacto contigo al correo <strong>${clientEmail}</strong> en las próximas 24-48 horas.</p>
            <br/>
            <p>Saludos,<br/><strong>El equipo de Texh Co.</strong></p>
          </div>
        `,
      }),
    })

    // 3. Enviar el email de notificación A TI (Admin)
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Notificaciones Texh <hello@texhco.com>",
        to: ["marcos.troger@gmail.com", "xiuhq66@gmail.com"],
        subject: "🔥 Nuevo Lead Recibido",
        html: `
          <div style="font-family: sans-serif;">
            <h2>Nuevo lead de voz en la plataforma</h2>
            <p><strong>Email del cliente:</strong> ${clientEmail}</p>
            <p><strong>Audio:</strong> <a href="${audioUrl}">Escuchar Nota de Voz</a></p>
            <p>Entra a tu panel de Supabase para ver más detalles.</p>
          </div>
        `,
      }),
    })

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
