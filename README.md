# ✍️ WnCenter: Webnovel Management Backend

![Node.js](https://img.shields.io/badge/Backend-Node.js-339933?logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?logo=mongodb&logoColor=white)
![Auth](https://img.shields.io/badge/Auth-JWT-000000?logo=json-web-tokens&logoColor=white)

**WnCenter** is a specialized content management backend designed specifically for webnovel authors. It provides a robust API for managing story arcs, chapters, and world-building assets, with a focus on structured narrative frameworks like **Kishotenketsu**.

## 🚀 Key Features

* **📖 Chapter Management:** Full CRUD operations for drafting and publishing chapters.
* **📂 Narrative Structuring:** Support for tagging and organizing chapters into Ki-Sho-Ten-Ketsu phases.
* **🔐 Secure Authentication:** User and author roles managed via JSON Web Tokens (JWT).
* **⚡ Optimized Database:** MongoDB-backed architecture for fast retrieval of long-form text content.

## 🛠️ Tech Stack

* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB Atlas
* **Security:** JWT (JSON Web Tokens) & Bcrypt

## ⚙️ Configuration & Setup

### **Prerequisites**
* Node.js installed
* A MongoDB Atlas cluster

### **Environment Variables**
Create a `.env` file in the root directory and add the following (do not share this file publicly):
```text
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
Installation
Clone the repository:

Bash

git clone [https://github.com/junjhon12/WnCenter.git](https://github.com/junjhon12/WnCenter.git)
Install dependencies:

Bash

cd WnCenter/server
npm install
Run the server:

Bash

npm start
📂 Project Structure
Plaintext

/server
├── controllers/    # Route logic
├── models/         # MongoDB schemas (Chapters, Users, Arcs)
├── routes/         # API endpoints
├── middleware/     # Auth and validation
└── server.js       # Entry point
Developed by junjhon12 as a tool for modern webnovelists.
