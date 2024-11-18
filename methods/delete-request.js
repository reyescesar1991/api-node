// const writeToFile = require("../util/write-to-file");

// module.exports = (req,res) => {
//     let baseURL = req.url.substring(0, req.url.lastIndexOf("/") + 1);
//     console.log(baseURL);
//     let id = req.url.split("/")[3];
//     const regexV4 = new RegExp(/^\d+$/)
//     console.log(id);

//     if(!regexV4.test(id)){
//         res.writeHead(400, "Content-Type", "application/json");
//         res.end(JSON.stringify({ title: "Validation Failed", message: "UUID is not valid" }));
    
//     }
//     else if(baseURL === "/api/movies/" && regexV4.test(id)){
//         const index = req.movies.findIndex((movie) => {
//             return movie.id === id;
//         });
//         if(index === -1){
//             res.statusCode = 404;
//             res.write(JSON.stringify({ title: "Not Found", message: "Movie not found" }));
//             res.end();
//         }else{
//             req.movies.splice(index, 1);
//             writeToFile(req.movies);
//             res.writeHead(204, {"Content-Type" : "application/json"});
//             res.end(JSON.stringify(req.movies));
//         }
//     }
// };

const writeToFile = require("../util/write-to-file"); // Import a function to write data to a file

module.exports = (req, res) => {
  // Extract the base URL from the request URL (excluding the last part)
  let baseURL = req.url.substring(0, req.url.lastIndexOf("/") + 1);
  console.log(baseURL); // Log the extracted base URL for debugging

  // Extract the potential ID from the URL (assuming it's the 4th segment)
  let id = req.url.split("/")[3];
  console.log(id); // Log the extracted ID for debugging

  // Create a regular expression to validate a version 4 UUID format (Needs improvement)
  const regexV4 = new RegExp(/^\d+$/);  // This regex only checks for digits, not a valid UUID format

  // Check if the ID is not a valid number (basic validation, improve for UUID)
  if (!regexV4.test(id)) {
    res.writeHead(400, "Content-Type", "application/json");
    res.end(JSON.stringify({ title: "Validation Failed", message: "UUID is not valid" }));
  } else {
    // Handle DELETE request for a specific movie (`/api/movies/:id`)
    if (baseURL === "/api/movies/" && regexV4.test(id)) {
      // Find the index of the movie with the matching ID in the movies array
      const index = req.movies.findIndex((movie) => {
        return movie.id === id;
      });

      if (index === -1) {
        // Movie not found
        res.statusCode = 404;
        res.write(JSON.stringify({ title: "Not Found", message: "Movie not found" }));
        res.end();
      } else {
        // Movie found, proceed with deletion
        req.movies.splice(index, 1); // Remove the movie at the found index
        writeToFile(req.movies); // Write the updated movies data to a file

        // Send a 204 No Content response (success)
        res.writeHead(204, {"Content-Type" : "application/json"});
        res.end(JSON.stringify(req.movies)); // Can be removed for efficiency
      }
    }
  }
};
