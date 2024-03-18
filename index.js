import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import {dirname} from "path";
import {fileURLToPath} from "url";

// Define some key parameters
var __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;
const API_URL = "https://api.blockchain.com/v3/exchange/";
let tickersQuery, tickers, priceQuery

// Pointing to correct path for static files
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use(express.static(__dirname + "public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
    try {
    tickersQuery = await axios.get(API_URL + "symbols");
    tickers = Object.keys(tickersQuery.data);
    res.render("index.ejs", {tickers:tickers});
    } catch (error) {
        res.send(error.response.data);
    }
});

app.post("/", async (req, res) => {
    try {
    priceQuery = await axios.get(API_URL + `/tickers/${req.body.ticker}`);
    res.render("index.ejs", {tickers:tickers, price:JSON.stringify(priceQuery.data)});
    } catch (error) {
        res.send(error.response.data)
    }
});

app.listen(port, ()=> {
    console.log(`Listening on port ${port}`);
});
