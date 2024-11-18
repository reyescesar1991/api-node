// const http = require("http");
// const getReq = require("./methods/get-request");
// const postReq = require("./methods/post-request");
// const putReq = require("./methods/put-request");
// const deleteReq = require("./methods/delete-request");
// let movies = require("./data/movies.json");
// require("dotenv").config();

// const PORT = process.env.PORT || 5001;

// const server = http.createServer((req, res) => {
//     req.movies = movies;
//     switch (req.method) {
//         case "GET":
//             getReq(req, res);
//             break
//         case "POST":
//             postReq(req, res);
//             break;
//         case "PUT":
//             putReq(req, res);
//             break;
//         case "DELETE":
//             deleteReq(req, res);
//             break;
//         default:
//             res.statusCode = 404;
//             res.setHeader("Content-Type", "application/json");
//             res.write(JSON.stringify({ title: "Not Found", message: "Route not found" }));
//             res.end();
//     }
// });

// server.listen(PORT, () => {
//     console.log(`Server started on port : ${PORT}`);
// });  

// Import necessary modules
const http = require("http"); // Import the HTTP module for creating servers
const getReq = require("./methods/get-request"); // Import the GET request handler
const postReq = require("./methods/post-request"); // Import the POST request handler
const putReq = require("./methods/put-request"); // Import the PUT request handler
const deleteReq = require("./methods/delete-request"); // Import the DELETE request handler
let movies = require("./data/movies.json"); // Load the initial movie data from a JSON file
require("dotenv").config(); // Load environment variables from a .env file

// Set the port number, using an environment variable if available
const PORT = process.env.PORT || 5001;

// Create an HTTP server
const server = http.createServer((req, res) => {
  // Attach the movie data to the request object for use in handlers
  req.movies = movies;

  // Switch based on the HTTP method of the request
  switch (req.method) {
    case "GET":
      // Handle GET requests by calling the getReq function
      getReq(req, res);
      break;
    case "POST":
      // Handle POST requests by calling the postReq function
      postReq(req, res);
      break;
    case "PUT":
      // Handle PUT requests by calling the putReq function
      putReq(req, res);
      break;
    case "DELETE":
      // Handle DELETE requests by calling the deleteReq function
      deleteReq(req, res);
      break;
    default:
      // Handle unsupported HTTP methods
      res.statusCode = 404; // Set the status code to 404 (Not Found)
      res.setHeader("Content-Type", "application/json"); // Set the content type to JSON
      res.write(JSON.stringify({ title: "Not Found", message: "Route not found" })); // Write a JSON error message
      res.end(); // End the response
  }
});

// Start the server on the specified port
server.listen(PORT, () => {
  console.log(`Server started on port : ${PORT}`);
});