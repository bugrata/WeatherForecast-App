const { response } = require("express");

const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");

});

app.post("/", function(req, res){
    const query = req.body.cityName;
    const apiKey = "7764e1209db18c6114ec9f469f9f8b1d";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + unit + "&appid=" + apiKey + "";
    https.get(url, function(response){
        console.log(response);

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            //const icon = weatherData.weather.weather[0].icon;
            //const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<p>The weather is currently " + weatherDescription + "</p>");
            res.write("The temprature in " + temp + " degrees celcius.");
            //res.write("<img src=" + imageURL + ">");
            res.send();
        });
    });
});

app.listen(3000, function(){
    console.log("This server is running on port 3000.");
});