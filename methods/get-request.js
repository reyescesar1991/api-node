module.exports = (req,res) => {
    let baseURL = req.url.substring(0, req.url.lastIndexOf("/") + 1);
    console.log(baseURL);
    let id = req.url.split("/")[3];
    const regexV4 = new RegExp(/^\d+$/)
    console.log(id);
    
    
    if(req.url === '/api/movies'){
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.write(JSON.stringify(req.movies));
        res.end();
    }
    else if(!regexV4.test(id)){
        res.writeHead(400, "Content-Type", "application/json");
        res.end(JSON.stringify({ title: "Validation Failed", message: "UUID is not valid" }));
    }
    else if(baseURL === "/api/movies/" && regexV4.test(id)){
        res.setHeader("Content-Type", "application/json");
        let filteredMovie = req.movies.filter((movie) => {
            return movie.id === id;
        });
        if(filteredMovie.length > 0){
            res.statusCode = 200;
            res.write(JSON.stringify(filteredMovie));
            res.end();
        }
        else{
            res.statusCode = 404;
            res.write(JSON.stringify({ title: "Not Found", message: "Movie not found" }));
            res.end();
        }
    }
    else{
        res.writeHead(404, "Content-Type", "application/json");
        res.end(JSON.stringify({ title: "Not Found", message: "Route not found" }));
    }
};
