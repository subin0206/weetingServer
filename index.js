const express = require("express");
const app = express();

app.get("/", function(req, res) {
    res.send("Hello World");
});

const port_no = 3305;
app.listen(port_no, function() {
    console.log(`Port No. ${port_no}`);
    // console.log(`Listening to http://localhost:${port_no}/`);
    console.log(`Listening to 54.180.107.241:${port_no}/`);
});