# A World of Goodness - Donation & Aid Platform

This project is a full-stack web application designed to facilitate donations and aid distribution. It features a React-based frontend for user interaction and a Node.js/Express backend that manages user authentication, product stocks, and transaction history using a JSON-based database.

##  Repository Link
**GitHub Repository:** [https://github.com/muratk0/A_World_of_Goodness]

---

##  Features

### Frontend (React + Vite)
- **Dynamic Routing:** Seamless navigation between pages using `react-router-dom`.
- **User Authentication:** Login and Registration forms.
- **Donation System:** Interactive donation cards where users can donate to specific causes.
- **Transaction History:** Users can view their past donations.
- **Responsive Design:** Includes a persistent Navbar and responsive layout.

### Backend (Node.js + Express)
- **RESTful API:** Endpoints for users, products, and transactions.
- **Data Persistence:** Uses `data.json` as a lightweight database (managed via File System `fs`).
- **Stock Management:** Automatically decrements campaign goals/stocks upon donation.
- **CORS Enabled:** Secure communication between the frontend (Vite) and backend (Express).

---

## 🛠 Tech Stack

* **Frontend:** React, Vite, React Router DOM, CSS
* **Backend:** Node.js, Express.js
* **Database:** JSON (Local File System)
* **Tools:** ESLint, npm

---

## Project Structure

The project is structured as a monorepo containing both client and server logic.

```text
aidproje/
├── public/                 # Static assets
├── src/
│   ├── assets/             # Images and SVGs
│   ├── components/         # Reusable UI components (Navbar, DonationCard, etc.)
│   ├── pages/              # Page views (HomePage, DonationPage, LoginPage, etc.)
│   ├── App.jsx             # Main application routing logic
│   ├── main.jsx            # React entry point
│   └── index.css           # Global styles
├── data.json               # Database file (Users & Products)
├── server.js               # Backend API server entry point
├── package.json            # Project dependencies and scripts
├── vite.config.js          # Vite configuration
└── README.md               # Project documentation
