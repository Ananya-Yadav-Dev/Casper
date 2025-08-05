Thanks! Based on your update, here’s the **clean and accurate `README.md`** for your project **Phoenix**, matching exactly your tech stack:

* **Frontend:** React (with Vite)
* **Backend:** Node.js (Express)
* **Database:** MongoDB Atlas
* **API integration:** via `.env`
* You've also mentioned adding an **image**, so I’ll include the placeholder for it too.

---

```markdown
# 🔥 Phoenix - Your AI Chat Companion

Phoenix is a full-stack AI chatbot that enables users to have smart, multi-turn conversations powered by LLM APIs. Built using Vite + React on the frontend and Node.js + Express on the backend, it supports persistent chat history via MongoDB Atlas.

![Phoenix Screenshot](/assets/preview.png) <!-- Replace this path with your actual image path -->

---

## 🛠 Tech Stack

- **Frontend:** Vite + React
- **Backend:** Node.js + Express
- **Database:** MongoDB Atlas
- **APIs:** LLM APIs (Gemini)

---

## 📁 Folder Structure

```

phoenix/
├── frontend/          # (Vite + React)
├── backend/          # (Node.js + Express)
├── .env             # Environment file (DO NOT COMMIT)
└── README.md

````

---

## ⚙️ How to Run the Project

### 1. Clone the Repository

```bash
git clone https://github.com/Ananya-Yadav-Dev/phoenix.git
cd phoenix
````

---

### 2. Setup Backend

```bash
cd backend
npm install
```

#### Create a `.env` file in the `backend/` directory:

```env
MONGO_URI=your_mongo_atlas_connection_string
API_KEY=your_llm_api_key
MODEL=deepseek/deepseek-r1:free  # Example model
```

#### Run the backend server:

```bash
nodemon server.js
```

---

### 3. Setup Frontend

```bash
cd ../frontend
npm install
```


#### Run the frontend:

```bash
npm run dev
```

---

Your app should now be running at:
Frontend → `http://localhost:5173`
Backend → `http://localhost:8080`

---

## 📝 Notes

* Ensure MongoDB Atlas access is whitelisted for your IP.
* Add `.env` files both in backend for local development.

---

