
# Image Generator App

## Overview
The **Image Generator App** is a web application that allows users to generate images using the **ClipDrop API**. Users can log in, generate images, and manage their results efficiently.

## Features
- **User Authentication** (Login/Signup with authentication check)
- **Image Generation** using **ClipDrop API**
- **Buy Credits** to generate more images
- **Real-time UI Updates** with React
- **Secure Backend API** with Express.js and MongoDB
- **Payment Integration** (Razorpay)

## Tech Stack
### Frontend:
- React.js
- React Router
- React Hot Toast
- Tailwind CSS

### Backend:
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- ClipDrop API (for image generation)

### Deployment:
- Hosted on **Render**
- MongoDB hosted on **MongoDB Atlas**

## Installation
### 1. Clone the repository
```sh
 git clone https://github.com/Kashish2402/Image-Generator-App.git
 cd Image-Generator-App
```

### 2. Install dependencies
#### Install backend dependencies
```sh
 cd backend
 npm install
```
#### Install frontend dependencies
```sh
 cd ../frontend
 npm install
```

### 3. Set up environment variables
Create a `.env` file in the `backend` directory and add the following:
```sh
MONGODB_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
CLIPDROP_API_KEY=your_clipdrop_api_key
```

### 4. Run the app
#### Run backend server
```sh
 cd backend
 npm start
```
#### Run frontend server
```sh
 cd ../frontend
 npm run dev
```

## Deployment on Render
- **Backend:**
  - Ensure you’ve set environment variables in Render’s settings.
  - Check logs for missing dependencies (`npm install` in the backend folder if needed).
- **Frontend:**
  - Update API calls in React to use the deployed backend URL instead of `localhost:5000`.

## Usage
1. Sign up or log in.
2. Navigate to the image generator.
3. Enter input details and generate an image using the **ClipDrop API**.
4. View results and manage generated images.

## API Reference
### **Generate Image**
`POST /api/v1/images/generate`
#### Request Body:
```json
{
  "prompt": "A futuristic city skyline at night"
}
```
#### Response:
```json
{
  "success": true,
  "imageUrl": "https://clipdrop-api-generated-image-url.com"
}
```

## Contributing
Feel free to open issues and submit pull requests to improve the project!

## License
This project is licensed under the MIT License.

