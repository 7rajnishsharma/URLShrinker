# URLShrinker

URLShrinker is a simple URL shortening service built with Node.js, Express, and MongoDB. It allows users to shorten URLs and track their usage.

## Features

- Shorten long URLs
- Redirect to the original URL when the short URL is accessed
- Track visit history for each shortened URL

## Getting Started

To get started with the URLShrinker project, follow these steps:

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (running locally or on a remote server)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/urlshrinker.git

   ```

2. **Navigate to the project directory:**

```bash
   cd urlshrinker

   ```
3. **Install the dependencies:**

```bash
   npm install

   ```

### Configuration

1. **Set up MongoDB:**

   Make sure MongoDB is running. You can start MongoDB locally by using:

   ```bash
   mongod

    ```

2. **Database Connection:**



The application is configured to connect to a MongoDB instance running at **`mongodb://localhost:27017/urlShort`**. If your MongoDB is hosted elsewhere, update the connection string in `index.js`:

```javascript
connectToMongoDB("your-mongodb-connection-string").then(() =>
  console.log("Database is connected")
);

```


Running the Application
Start the server:

   ```bash
   npm start
```

The server will start on http://localhost:8001.


### Folder Structure

- `index.js` - Main server file.
- `routes/url.js` - Route definitions for URL shortening.
- `models/url.js` - Mongoose model for storing URLs and visit history.
- `public/` - Directory for static files.


### Acknowledgments
- Express.js - Web framework for Node.js
- Mongoose - MongoDB object modeling tool
- shortid - Generate short non-sequential unique IDs
