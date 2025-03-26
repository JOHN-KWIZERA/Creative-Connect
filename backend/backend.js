/*
=============================================
         BACKEND - Node.js + Express (Improved)
=============================================
*/

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const multer = require("multer");
const nodemailer = require("nodemailer");
const path = require("path");

// Load environment variables
dotenv.config();

// Ensure required environment variables are set
if (!process.env.MONGO_URI || !process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.error("❌ Missing required environment variables. Check your .env file.");
  process.exit(1);
}

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" })); // Adjust CORS as needed
app.use(express.static("uploads"));

// Database Connection with Error Handling
mongoose
  .connect(process.env.MONGO_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// Define Mongoose Models
const Job = mongoose.model("Job", new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  employer: { type: String, required: true }, // Ensure this stores the employer's email
  postedDate: { type: Date, default: Date.now },
  salary: { type: Number, required: false },
}));

const Application = mongoose.model("Application", new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Job" },
  applicantName: { type: String, required: true },
  email: { type: String, required: true },
  coverLetter: { type: String, required: false },
  resume: { type: String, required: false },
  appliedDate: { type: Date, default: Date.now },
}));

// Multer Configuration for Secure File Uploads
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed!"), false);
    }
  },
});

// Nodemailer Email Notification Setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// API Routes

// Add a new job
app.post("/api/jobs", async (req, res) => {
  try {
    const { title, category, employer, salary } = req.body;
    const newJob = new Job({ title, category, employer, salary });
    await newJob.save();
    res.status(201).json(newJob);
  } catch (error) {
    console.error("Error adding job:", error);
    res.status(500).json({ message: "Server error. Try again later." });
  }
});


// Fetch all job listings
app.get("/api/jobs", async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ message: "Server error. Try again later." });
  }
});

// Apply for a job
app.post("/api/apply", upload.single("resume"), async (req, res) => {
  try {
    const { jobId, applicantName, email, coverLetter } = req.body;
    if (!jobId || !applicantName || !email) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found." });
    }

    const newApplication = new Application({
      jobId,
      applicantName,
      email,
      coverLetter: coverLetter || "",
      resume: req.file ? req.file.filename : "",
    });

    await newApplication.save();

    // Send email notification to the employer
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: job.employer, // Now dynamically using the employer's email
      subject: `New Application for ${job.title}`,
      text: `New application from ${applicantName}.
      Email: ${email}
      Cover Letter: ${coverLetter}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("📧 Email sent:", info.response);
      }
    });

    res.status(201).json({ message: "Application submitted successfully!" });
  } catch (error) {
    console.error("Error submitting application:", error);
    res.status(500).json({ message: "Server error. Try again later." });
  }
});

// Health check route
app.get("/health", (req, res) => {
  res.json({ status: "✅ Server is up and running" });
});

// Get system stats (job and application counts)
app.get("/api/stats", async (req, res) => {
  try {
    const jobCount = await Job.countDocuments();
    const applicationCount = await Application.countDocuments();
    res.json({ jobCount, applicationCount });
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).json({ message: "Server error. Try again later." });
  }
});

// Start the server
const PORT = 5001; // Changed to avoid conflict with 5000
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
