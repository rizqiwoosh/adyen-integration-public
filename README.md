    # Adyen Customer Dashboard

Adyen Customer Dashboard is a Node.js-based application used to manage customer transactions using Adyen payment services.

## 🚀 Features

- Manage payment transactions with Adyen
- Integration with Adyen API
- Dockerized for easy deployment
- Uses Vite for frontend optimization

## 🛠️ Installation and Running the Application

### 1. Clone Repository

```sh
git clone https://github.com/muhrizky/adyen-customer-dashboard.git
cd adyen-customer-dashboard
```

### 2. Install Dependencies

```sh
npm install
```

### 3. Configure Environment

Create a `.env` file based on `config.js` and adjust it with Adyen credentials.

### 4. Run the Application

```sh
npm start
```

The application will run on `http://localhost:3000`

## 🐳 Docker

### 1. Build and Run with Docker

```sh
docker-compose up --build
```

The application will run on `http://localhost:3000`

### 2. Stop Container

```sh
docker-compose down
```

## 📁 Project Structure

```
/adyen-customer-dashboard
│── src/                  # Main source code folder
│── config.js             # Application configuration
│── server.js             # Application entry point
│── package.json          # Dependency manager
│── Dockerfile            # Dockerfile for containerization
│── docker-compose.yml    # Docker Compose for multi-container setup
│── index.html            # Main application interface
│── style.css             # Frontend styling
│── vite.config.js        # Vite configuration for frontend
│── .gitignore            # File to ignore unnecessary files
```

## 📜 License

This application is under the MIT license. Feel free to use and develop it as needed.

---

Developed by **Muhamamd Rizqu**

