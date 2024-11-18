// module.exports = async (request) => {
//     return new Promise((resolve, reject) => {

//         try{
//             let body = "";
//             request.on("data", (chunck) => {
//                 body += chunck;
//             });
//             request.on("end", () => {
//                 resolve(JSON.parse(body));
//             })
//         }catch{
//             console.log(err);
//             reject(err);
//         }
//     })
// }

module.exports = async (request) => {
    // Returns a new Promise to handle asynchronous operations
    return new Promise((resolve, reject) => {
      try {
        // Initialize an empty string to store the request body
        let body = "";
  
        // Event listener for incoming data chunks
        request.on("data", (chunk) => {
          // Append each chunk to the body string
          body += chunk;
        });
  
        // Event listener for the end of the request
        request.on("end", () => {
          // Parse the JSON body and resolve the Promise with the parsed data
          resolve(JSON.parse(body));
        });
      } catch (err) {
        // Handle any errors during the process
        console.log(err);
        reject(err);
      }
    });
  };