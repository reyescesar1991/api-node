// module.exports = (req,res) => {
//     let baseURL = req.url.substring(0, req.url.lastIndexOf("/") + 1);
//     console.log(baseURL);
//     let id = req.url.split("/")[3];
//     const regexV4 = new RegExp(/^\d+$/)
//     console.log(id);
    
    
//     if(req.url === '/api/movies'){
//         res.statusCode = 200;
//         res.setHeader("Content-Type", "application/json");
//         res.write(JSON.stringify(req.movies));
//         res.end();
//     }
//     else if(!regexV4.test(id)){
//         res.writeHead(400, "Content-Type", "application/json");
//         res.end(JSON.stringify({ title: "Validation Failed", message: "UUID is not valid" }));
//     }
//     else if(baseURL === "/api/movies/" && regexV4.test(id)){
//         res.setHeader("Content-Type", "application/json");
//         let filteredMovie = req.movies.filter((movie) => {
//             return movie.id === id;
//         });
//         if(filteredMovie.length > 0){
//             res.statusCode = 200;
//             res.write(JSON.stringify(filteredMovie));
//             res.end();
//         }
//         else{
//             res.statusCode = 404;
//             res.write(JSON.stringify({ title: "Not Found", message: "Movie not found" }));
//             res.end();
//         }
//     }
//     else{
//         res.writeHead(404, "Content-Type", "application/json");
//         res.end(JSON.stringify({ title: "Not Found", message: "Route not found" }));
//     }
// };

module.exports = (req, res) => {
    // Extract the base URL from the request URL (excluding the last part)
    let baseURL = req.url.substring(0, req.url.lastIndexOf("/") + 1);
    console.log(baseURL); // Log the extracted base URL for debugging
  
    // Extract the potential ID from the URL (assuming it's the 4th segment)
    let id = req.url.split("/")[3];
    console.log(id); // Log the extracted ID for debugging
  
    // Create a regular expression to validate a version 4 UUID format
    const regexV4 = new RegExp(/^\d+$/);  // This regex only checks for digits, not a valid UUID format
  
    // Handle request for all movies (`/api/movies`)
    if (req.url === '/api/movies') {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.write(JSON.stringify(req.movies)); // Send all movies data in JSON format
      res.end();
    } else {
      // Check if the ID is not a valid number (basic validation, improve for UUID)
      if (!regexV4.test(id)) {
        res.writeHead(400, "Content-Type", "application/json");
        res.end(JSON.stringify({ title: "Validation Failed", message: "UUID is not valid" }));
      } else {
        // Handle GET request for a specific movie (`/api/movies/:id`)
        if (baseURL === "/api/movies/" && regexV4.test(id)) {
          res.setHeader("Content-Type", "application/json");
          let filteredMovie = req.movies.filter((movie) => {
            return movie.id === id; // Filter movies based on the extracted ID
          });
  
          if (filteredMovie.length > 0) {
            res.statusCode = 200;
            res.write(JSON.stringify(filteredMovie)); // Send the matching movie data
            res.end();
          } else {
            res.statusCode = 404;
            res.write(JSON.stringify({ title: "Not Found", message: "Movie not found" }));
            res.end();
          }
        } else {
          // Handle any other unmatched route
          res.writeHead(404, "Content-Type", "application/json");
          res.end(JSON.stringify({ title: "Not Found", message: "Route not found" }));
        }
      }
    }
  };
