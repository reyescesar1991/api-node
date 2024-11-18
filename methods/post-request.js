// const crypto = require("crypto");
// const requestBodyParser = require("../util/body-parser");
// const writeToFile = require("../util/write-to-file");
// module.exports = async (req,res) => {
//     if(req.url === "/api/movies"){

//         try{
//             let body = await requestBodyParser(req);
//             body.id = crypto.randomUUID();
//             req.movies.push(body);
//             writeToFile(req.movies);
//             res.writeHead(201, {"Content-Type" : "application/json"});
//             res.end();
//             console.log("Request Body: ", body);

//         }catch(err){
//             console.log(err);
//             res.writeHead(400, "Content-Type", "application/json");
//             res.end(JSON.stringify({ title: "Validation Failed", message: "Request body is not valid" }));
//         }
//     }
//     else{
//         res.writeHead(404, "Content-Type", "application/json");
//         res.end(JSON.stringify({ title: "Not Found", message: "Route not found" }));
//     }
// };


const crypto = require("crypto"); // Import the crypto module for generating random IDs
const requestBodyParser = require("../util/body-parser"); // Import a function to parse the request body
const writeToFile = require("../util/write-to-file"); // Import a function to write data to a file

module.exports = async (req, res) => {
  // Check if the request URL is for creating a new movie (`/api/movies`)
  if (req.url === "/api/movies") {

    try {
      // Parse the request body asynchronously
      let body = await requestBodyParser(req);

      // Generate a random ID using crypto.randomUUID()
      body.id = crypto.randomUUID();

      // Add the new movie to the movies array in the request object
      req.movies.push(body);

      // Write the updated movies data to a file (assuming movies.json)
      writeToFile(req.movies);

      // Set response status to 201 Created and content type to JSON
      res.writeHead(201, {"Content-Type" : "application/json"});

      // End the response with an empty body (success)
      res.end();

      // Log the request body for debugging purposes
      console.log("Request Body: ", body);

    } catch (err) {
      // Handle errors during request body parsing or file writing
      console.log(err);

      // Set response status to 400 Bad Request and content type to JSON
      res.writeHead(400, "Content-Type", "application/json");

      // Send an error message in JSON format
      res.end(JSON.stringify({ title: "Validation Failed", message: "Request body is not valid" }));
    }
  } else {
    // Handle any other unmatched route
    res.writeHead(404, "Content-Type", "application/json");
    res.end(JSON.stringify({ title: "Not Found", message: "Route not found" }));
  }
};
