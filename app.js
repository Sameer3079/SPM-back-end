const Express           = require("express");
const BodyParser        = require("body-parser");
const Cors              = require("cors");
const Routes            = require("./Routes");

const app = Express();

app.use(BodyParser.urlencoded({extended:false}));
app.use(BodyParser.json());
app.use(Cors());

app.use('/' , Routes);

// create server
let port = process.env.PORT || 3000;

let server = app.listen(port, (err) => {
    if(err){
        console.log(err);
        process.exit(-1);
    }
    console.log("server runing port " + port);
});

module.exports = server;