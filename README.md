# 📸 SnapSphere

**SnapSphere** is a modern, full-stack social media application built with **Spring Boot** and **React.js**. It supports real-time messaging, user-generated posts, notifications, and all essential features of a next-gen image-first social platform.

---

## 🗂️ Project Structure

```
snapsphere/
├── SnapSphereBackend/   → Backend (Spring Boot)
└── SnapSphereFrontend/  → Frontend (React + Vite + Tailwind)
```

---

## 🚀 Backend – Spring Boot

### 🛠 Technologies
- Java 17
- Spring Boot
- Spring Security (JWT)
- Spring Data JPA
- PostgreSQL
- Maven

### 📋 Prerequisites
- Java 17+
- Maven
- PostgreSQL Database

### ⚙️ Setup Instructions

1. **Navigate to the backend directory:**
   ```bash
   cd SnapSphereBackend
   ```

2. **Configure database in `application.properties`:**
   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/snapsphere_db
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   spring.jpa.hibernate.ddl-auto=update
   spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
   ```

3. **Build the backend:**
   ```bash
   ./mvnw clean install
   ```

4. **Run the application:**
   ```bash
   ./mvnw spring-boot:run
   ```

➡ Backend available at: [http://localhost:8080](http://localhost:8080)

---

## 💻 Frontend – React.js

### 🛠 Technologies
- React.js
- Vite
- Tailwind CSS
- PostCSS
- ESLint

### 📋 Prerequisites
- Node.js (v14+)
- npm or yarn

### ⚙️ Setup Instructions

1. **Navigate to the frontend directory:**
   ```bash
   cd SnapSphereFrontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the dev server:**
   ```bash
   npm run dev
   ```

➡ Frontend available at: [http://localhost:5173](http://localhost:5173)

---

## 🎯 Key Features

### 🔐 Authentication & Users
- JWT-based login and registration
- Email verification and password reset
- Profile customization and secure data handling

### 📸 Media Sharing
- Image uploads with captions, locations, and tags
- Multi-image carousels
- Post scheduling, archiving, and visibility settings

### 🤝 Social Connectivity
- Follow/unfollow users
- User suggestions and discovery
- Block/report features for safety

### 💬 Interactions
- Likes, comments, and threaded replies
- Save to personal collections
- Tag users and use hashtags

### 💬 Messaging System
- Real-time 1:1 and group chat
- Media sharing and emoji support
- Read receipts and message search

### 🔔 Notifications
- In-app and email notifications
- Push notification support
- Notification history and preferences

### 🌐 UX & Design
- Responsive design (mobile-first)
- Dark and light mode
- Smooth animations and infinite scroll

---

## 📊 Additional Capabilities
- Stories and highlights
- Explore trending users and posts
- Analytics dashboard for user engagement
- Advanced search (users, tags, content)

---

## 🧑‍💻 Contributing

We welcome community contributions!

1. **Fork the repo**
2. **Create your feature branch:**
   ```bash
   git checkout -b feature/YourFeatureName
   ```
3. **Commit your changes:**
   ```bash
   git commit -m "Add: Your feature description"
   ```
4. **Push to GitHub:**
   ```bash
   git push origin feature/YourFeatureName
   ```
5. **Open a Pull Request**

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

