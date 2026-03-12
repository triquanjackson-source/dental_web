import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("dentals.db");

// Initialize Database Schema
db.exec(`
  CREATE TABLE IF NOT EXISTS patients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    dob TEXT
  );

  CREATE TABLE IF NOT EXISTS appointments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    patient_id INTEGER NOT NULL,
    appointment_date TEXT NOT NULL,
    appointment_time TEXT NOT NULL,
    notes TEXT,
    status TEXT DEFAULT 'upcoming',
    FOREIGN KEY (patient_id) REFERENCES patients(id)
  );
`);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/patients", (req, res) => {
    try {
      const patients = db.prepare("SELECT * FROM patients").all();
      res.json(patients);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch patients" });
    }
  });

  app.post("/api/patients", (req, res) => {
    const { name, email, phone, dob } = req.body;
    try {
      const info = db.prepare("INSERT INTO patients (name, email, phone, dob) VALUES (?, ?, ?, ?)").run(name, email, phone, dob);
      res.json({ id: info.lastInsertRowid });
    } catch (error) {
      if (error.code === 'SQLITE_CONSTRAINT') {
        // Patient might already exist, try to find them
        const patient = db.prepare("SELECT id FROM patients WHERE email = ?").get(email);
        if (patient) return res.json({ id: patient.id });
      }
      res.status(500).json({ error: "Failed to create patient" });
    }
  });

  app.get("/api/appointments", (req, res) => {
    const { type } = req.query; // 'upcoming' or 'past'
    const now = new Date().toISOString().split('T')[0];
    
    let query = `
      SELECT a.*, p.name as patient_name, p.email as patient_email 
      FROM appointments a 
      JOIN patients p ON a.patient_id = p.id
    `;
    
    if (type === 'upcoming') {
      query += ` WHERE a.appointment_date >= ? ORDER BY a.appointment_date ASC, a.appointment_time ASC`;
    } else if (type === 'past') {
      query += ` WHERE a.appointment_date < ? ORDER BY a.appointment_date DESC, a.appointment_time DESC`;
    } else {
      query += ` ORDER BY a.appointment_date DESC`;
    }

    try {
      const appointments = db.prepare(query).all(type ? [now] : []);
      res.json(appointments);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch appointments" });
    }
  });

  app.post("/api/appointments", (req, res) => {
    const { patient_id, date, time, notes } = req.body;
    try {
      const info = db.prepare("INSERT INTO appointments (patient_id, appointment_date, appointment_time, notes) VALUES (?, ?, ?, ?)").run(patient_id, date, time, notes);
      res.json({ id: info.lastInsertRowid });
    } catch (error) {
      res.status(500).json({ error: "Failed to book appointment" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
