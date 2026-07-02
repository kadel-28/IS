# Information Security Demo App

This workspace contains a complete MERN-based crypto demonstration app with:
- Secure sign-up/login using SHA-256 password hashing
- Rail Fence cipher encryption/decryption
- RSA key generation and encryption/decryption
- Live hashing visualizer for MD5 vs SHA-256
- Theory notes for the crypto concepts

## Project structure

```text
IS/
├── client/                  # Vite + React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── HashLab.jsx
│   │   │   ├── NotesWindow.jsx
│   │   │   ├── RailFenceTool.jsx
│   │   │   └── RsaTool.jsx
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js
├── server/
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── crypto.js
│   ├── utils/
│   │   └── cryptoUtils.js
│   ├── index.js
│   ├── package.json
│   └── .env
└── README.md
```

## Installation and setup

### 1) Backend

```bash
cd server
npm install express mongoose cors dotenv nodemon
```

### 2) Frontend

```bash
cd ../client
npm install
npm install axios lucide-react
npm install -D tailwindcss@3.4.17 postcss autoprefixer
npx tailwindcss init -p
```

### 3) Start development servers

In one terminal:

```bash
cd server
npx nodemon index.js
```

In another terminal:

```bash
cd client
npm run dev
```

### 4) Environment variables

The backend uses the values in server/.env. Adjust them as needed:

```env
PORT=5000
CLIENT_URL=http://localhost:5173
MONGODB_URI=mongodb://127.0.0.1:27017/crypto-demo
```

## Notes

- The app will work without a live MongoDB instance because the server logs a warning and continues to run, but authentication requires a database connection for persistence.
- For a full experience, start a local MongoDB instance on port 27017.
