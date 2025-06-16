# Instagram Clone

A full-stack Instagram clone application built with Spring Boot and React.js.

## Project Structure

The project consists of two main parts:
- Backend: Spring Boot application (`InstaSpringBoot/`)
- Frontend: React.js application (`ReactJs/`)

## Backend (Spring Boot)

### Technologies Used
- Java 17
- Spring Boot
- Spring Security
- Spring Data JPA
- MySQL Database
- Maven

### Prerequisites
- Java 17 or higher
- Maven
- MySQL Server

### Setup Instructions
1. Navigate to the backend directory:
   ```bash
   cd InstaSpringBoot
   ```

2. Configure the database connection in `application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/instagram_clone
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   ```

3. Build the project:
   ```bash
   ./mvnw clean install
   ```

4. Run the application:
   ```bash
   ./mvnw spring-boot:run
   ```

The backend server will start on `http://localhost:8080`

## Frontend (React.js)

### Technologies Used
- React.js
- Vite
- Tailwind CSS
- ESLint
- PostCSS

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Setup Instructions
1. Navigate to the frontend directory:
   ```bash
   cd ReactJs
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend application will start on `http://localhost:5173`

## Features

### Backend Features

#### User Management
- Secure user registration and login system
- JWT-based authentication
- Password encryption and security
- User profile management
- Email verification system
- Password reset functionality

#### Post Management
- Create, read, update, and delete posts
- Image upload and storage
- Post caption and location support
- Post privacy settings
- Post archiving functionality
- Post analytics (views, likes, comments)

#### Social Features
- Follow/Unfollow system
- User feed generation
- Activity feed
- User suggestions
- Block/Unblock users
- Report inappropriate content

#### Interaction Features
- Like and unlike posts
- Comment system with nested replies
- Save posts to collections
- Share posts
- Tag users in posts and comments
- Mention notifications

#### Messaging System
- Real-time direct messaging
- Group chat functionality
- Message read receipts
- Media sharing in messages
- Message search
- Message archiving

#### Notification System
- Real-time notifications
- Push notifications
- Email notifications
- Notification preferences
- Notification history

### Frontend Features

#### User Interface
- Modern, responsive design
- Dark/Light mode support
- Customizable user profiles
- Infinite scroll feed
- Smooth animations and transitions
- Mobile-first approach

#### Post Features
- Image upload with preview
- Multiple image support
- Image filters and editing
- Carousel for multiple images
- Post creation wizard
- Post scheduling

#### Social Features
- User profile customization
- Story creation and viewing
- Highlights management
- Follow/Unfollow functionality
- User search and discovery
- Activity tracking

#### Interaction Features
- Like and comment system
- Share posts to other platforms
- Save posts to collections
- Tag users in posts
- Location tagging
- Hashtag support

#### Messaging Interface
- Real-time chat interface
- Message status indicators
- Media sharing in chat
- Emoji support
- Message search
- Chat organization

#### Additional Features
- Advanced search functionality
- Content discovery
- Explore page
- Saved collections
- User analytics
- Account privacy settings

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 