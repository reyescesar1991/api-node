const writeToFile = require("../util/write-to-file");

module.exports = (req,res) => {
    let baseURL = req.url.substring(0, req.url.lastIndexOf("/") + 1);
    console.log(baseURL);
    let id = req.url.split("/")[3];
    const regexV4 = new RegExp(/^\d+$/)
    console.log(id);

    if(!regexV4.test(id)){
        res.writeHead(400, "Content-Type", "application/json");
        res.end(JSON.stringify({ title: "Validation Failed", message: "UUID is not valid" }));
    
    }
    else if(baseURL === "/api/movies/" && regexV4.test(id)){
        const index = req.movies.findIndex((movie) => {
            return movie.id === id;
        });
        if(index === -1){
            res.statusCode = 404;
            res.write(JSON.stringify({ title: "Not Found", message: "Movie not found" }));
            res.end();
        }else{
            req.movies.splice(index, 1);
            writeToFile(req.movies);
            res.writeHead(204, {"Content-Type" : "application/json"});
            res.end(JSON.stringify(req.movies));
        }
    }
};
