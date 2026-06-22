import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { fileURLToPath } from "url";
import fs from "fs";
import nodemailer from "nodemailer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // JSON parsing
  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Example Contact API
  app.post("/api/contact", async (req, res) => {
    const { name, email, message, company } = req.body;
    console.log(`New contact request from ${name} (${email}) [Company: ${company || "none"}]: ${message}`);

    // Try loading Firebase config & DB
    let db: any = null;
    try {
      const configPath = path.join(process.cwd(), "firebase-applet-config.json");
      if (fs.existsSync(configPath)) {
        const firebaseConfig = JSON.parse(fs.readFileSync(configPath, "utf-8"));
        const { initializeApp } = await import("firebase/app");
        const { getFirestore } = await import("firebase/firestore");
        const app = initializeApp(firebaseConfig);
        db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
      }
    } catch (error) {
      console.error("Failed to initialize Firebase on server-side contact API:", error);
    }

    // Save submission to Firestore so leads are never lost
    let savedToDb = false;
    if (db) {
      try {
        const { collection, addDoc } = await import("firebase/firestore");
        const docRef = await addDoc(collection(db, "quotes_submissions"), {
          name,
          email,
          company: company || "",
          message,
          createdAt: new Date().toISOString()
        });
        console.log(`Saved quote submission to Firestore with ID: ${docRef.id}`);
        savedToDb = true;
      } catch (dbErr) {
        console.error("Failed to save quote submission to Firestore:", dbErr);
      }
    }

    // Load SMTP Settings for sending the email
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
    const smtpPort = parseInt(process.env.SMTP_PORT || "587");
    const targetEmail = process.env.CONTACT_EMAIL || "chinchuarchibo@gmail.com";

    let emailSent = false;
    let transporter: nodemailer.Transporter | null = null;

    if (smtpUser && smtpPass) {
      try {
        transporter = nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: smtpPort === 465,
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });
      } catch (transporterErr) {
        console.error("Failed to create email transporter:", transporterErr);
      }
    }

    const emailSubject = `Nueva solicitud de cotización de: ${name}`;
    const emailText = `
Detalles de la Solicitud de Cotización:
------------------------------------------
Cliente: ${name}
Correo: ${email}
Empresa: ${company || "No especificada"}
Mensaje:
${message}
------------------------------------------
Enviado el: ${new Date().toLocaleString("es-CL")}
    `;
    
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1E3A8A; max-width: 600px; margin: 0 auto; border: 1px solid #E5E7EB; border-top: 4px solid #F59E0B; padding: 24px; border-radius: 4px;">
        <h2 style="font-size: 20px; font-weight: 800; color: #1E3A8A; text-transform: uppercase; margin-bottom: 20px; border-bottom: 1px solid #F3F4F6; padding-bottom: 12px;">Nueva Solicitud de Cotización</h2>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #9CA3AF; text-transform: uppercase; font-size: 11px; width: 30%;">Nombre:</td>
            <td style="padding: 8px 0; font-weight: bold; color: #1E3A8A; font-size: 14px;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #9CA3AF; text-transform: uppercase; font-size: 11px;">Correo:</td>
            <td style="padding: 8px 0; font-weight: bold; color: #1E3A8A; font-size: 14px;"><a href="mailto:${email}" style="color: #1E3A8A; text-decoration: underline;">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #9CA3AF; text-transform: uppercase; font-size: 11px;">Empresa:</td>
            <td style="padding: 8px 0; font-weight: bold; color: #1E3A8A; font-size: 14px;">${company || "No especificada"}</td>
          </tr>
        </table>
        <div style="background-color: #F9FAFB; border: 1px solid #E5E7EB; padding: 16px; border-radius: 4px; margin-bottom: 24px;">
          <h4 style="margin-top: 0; margin-bottom: 8px; color: #9CA3AF; text-transform: uppercase; font-size: 11px;">Mensaje / Requerimiento:</h4>
          <p style="margin: 0; color: #4B5563; font-size: 13px; white-space: pre-wrap;">${message}</p>
        </div>
        <p style="font-size: 10px; color: #9CA3AF; text-align: center; margin-top: 30px; border-top: 1px solid #F3F4F6; padding-top: 12px; font-weight: bold; text-transform: uppercase;">
          IASI CHILE - Equipo Crítico Sostenible &copy; ${new Date().getFullYear()}
        </p>
      </div>
    `;

    if (transporter) {
      try {
        await transporter.sendMail({
          from: `"IASI Chile Cotizaciones" <${smtpUser}>`,
          to: targetEmail,
          replyTo: email,
          subject: emailSubject,
          text: emailText,
          html: emailHtml,
        });
        emailSent = true;
        console.log(`Email successfully sent to ${targetEmail}`);
      } catch (mailErr) {
        console.error("Nodemailer failed to send email:", mailErr);
      }
    } else {
      console.warn(`Email not sent because SMTP is not configured. Target: ${targetEmail}`);
    }

    res.json({ 
      success: true, 
      message: "Mensaje recibido correctamente.",
      savedToDb,
      emailSent,
      recipient: targetEmail
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
