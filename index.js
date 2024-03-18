import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://api.blockchain.com/v3/exchange/";
let tickersQuery, tickers, priceQuery

app.use(express.static("public"));
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