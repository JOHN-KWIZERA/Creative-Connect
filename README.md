# CreativeConnect

CreativeConnect is a job platform designed to help creative professionals find opportunities, connect with mentors, and collaborate with other creatives. It features job listings, mentorship programs, and training resources, with an emphasis on accessibility through offline and SMS-based capabilities.

## 🚀 Getting Started

Follow these steps to set up and run CreativeConnect on your local machine.

---

## 📌 Prerequisites
Before running the project, make sure you have:
- **Node.js** (>= 16.x)
- **MongoDB** (Local or Cloud - e.g., MongoDB Atlas)
- **Git** installed
- **Vercel (Optional, for deployment)**

---

## 🔥 Installation and Setup

### **1️⃣ Clone the Repository**
```sh
 git clone https://github.com/yourusername/CreativeConnect.git
 cd CreativeConnect
```

### **2️⃣ Setup Backend**
Navigate to the `backend` directory and install dependencies:
```sh
 cd backend
 npm install
```

### **3️⃣ Configure Environment Variables**
Create a `.env` file in the `backend` directory and add:
```env
MONGO_URI=your_mongo_connection_string
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
JWT_SECRET=your_jwt_secret
PORT=5001
```

### **4️⃣ Start the Backend Server**
```sh
 npm start
```
Your backend should now be running on `http://localhost:5001`.

---

### **5️⃣ Setup Frontend**
Navigate to the `frontend` directory:
```sh
 cd ../frontend
 npm install
```

### **6️⃣ Configure Frontend Environment Variables**
Create a `.env` file inside `frontend` and add:
```env
REACT_APP_BACKEND_URL=http://localhost:5001
```

### **7️⃣ Start the Frontend**
```sh
 npm start
```
Your frontend should now be running on `http://localhost:3000`.

---

## 🎯 Deployment

### **🚀 Deploying Backend to Render**
1. Push your backend code to **GitHub**.
2. Connect the GitHub repository to Render.
3. Add your environment variables under `Settings > Environment Variables`.
4. Deploy!

### **🚀 Deploying Frontend to Render**
1. Push your frontend code to **GitHub**.
2. Connect the repository to Render.
3. Add `REACT_APP_BACKEND_URL` pointing to your deployed backend.
4. Deploy!

---

## ✅ Tech Stack
- **Frontend:** React, TailwindCSS
- **Backend:** Node.js, Express, MongoDB
- **Authentication:** JWT
- **Deployment:** Render

---

## 🤝 Contributing
Want to contribute? Feel free to fork this repository and submit a pull request.

---

## 📞 Contact 0787677915
For support, contact j.kwizera@alustudent.com.
