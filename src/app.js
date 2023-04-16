const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup Handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

// render views
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Yi huang",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Genevieve He",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is some helpful text.",
    title: "Help",
    name: "Yi",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address!",
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  //query string is the URL endpoint like search=games&rating=5
  console.log(req.query.search);
  res.send({
    products: [],
  });
});
// * asterisk
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Yi HUANG",
    errorMessage: "Help article not found.",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Yi Huang",
    errorMessage: "Page not found",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});

// app.get("/help", (req, res) => {
//   res.send([
//     {
//       name: "Yi",
//     },
//     { age: 18 },
//   ]);
// });

// app.get("/about", (req, res) => {
//   res.send("<h1>learn more</h1>");
// });

//app.com
//app.com/help
//app.com/about
