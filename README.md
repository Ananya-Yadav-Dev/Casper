
# 🔥 Phoenix - Your AI Chat Companion

Phoenix is a full-stack AI chatbot enabling users to engage in smart, multi-turn conversations powered by LLM APIs. Built using **Vite + React** on the frontend and **Node.js + Express** on the backend, it stores persistent chat history using **MongoDB Atlas**.

![Phoenix Screenshot](./public/assets/preview.png)

---

## 🛠 Tech Stack

* **Frontend:** [Vite](https://vitejs.dev/) + [React](https://reactjs.org/)
* **Backend:** [Node.js](https://nodejs.org/) + [Express](https://expressjs.com/)
* **Database:** [MongoDB Atlas](https://www.mongodb.com/atlas/database)
* **API Integration:** via `.env` (e.g., LLM APIs like Gemini or DeepSeek)

---

## 📁 Project Structure

```
phoenix/
├── frontend/        # React + Vite frontend
├── backend/         # Node.js + Express backend
├── .env             # Environment variables (DO NOT COMMIT)
└── README.md
```

---

## 🚀 Getting Started

Follow these steps to run Phoenix locally.

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Ananya-Yadav-Dev/phoenix.git
cd phoenix
```

---

### 2️⃣ Setup Backend

```bash
cd backend
npm install
```

#### 🔐 Create `.env` in `backend/`

```env
MONGO_URI=your_mongo_atlas_connection_string
API_KEY=your_llm_api_key
MODEL=deepseek/deepseek-r1:free   # Example model
```

#### ▶️ Run the Backend

```bash
nodemon server.js
# or use: npm run dev (if configured in package.json)
```

Backend will run at: **[http://localhost:8080](http://localhost:8080)**

---

### 3️⃣ Setup Frontend

```bash
cd ../frontend
npm install
```

#### ▶️ Run the Frontend

```bash
npm run dev
```

Frontend will run at: **[http://localhost:5173](http://localhost:5173)**

---

## ⚠️ Important Notes

* Ensure your MongoDB Atlas cluster allows access from your current IP address.
* Keep `.env` files secure and never commit them to version control.
* The app uses LLM APIs like Gemini (via API key) – ensure usage complies with your chosen provider’s rate limits and terms.

---

## 💡 Features

* 🔁 Multi-turn conversation support
* 💬 LLM integration (Gemini, DeepSeek, etc.)
* 📜 Persistent chat history via MongoDB
* ⚡ Fast frontend with Vite
* 🌐 RESTful API structure with Express

---

## 🤝 Contributing

Contributions are welcome! Please fork the repo and create a PR with a clear description of your changes.

---

