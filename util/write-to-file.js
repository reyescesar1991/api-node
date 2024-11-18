const fs = require("fs");
const path = require("path");

module.exports = (data) => {

    try{
        console.log(data);
        const filePath = path.join(__dirname, "..", "data", "movies.json");
        const jsonData = JSON.stringify(data);
        
        fs.writeFileSync(filePath, jsonData, 'utf-8');
    }catch(err){

        console.log(err);
        
    }

}