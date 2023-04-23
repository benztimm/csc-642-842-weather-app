const express = require("express");
const axios = require("axios");
const cors = require("cors");
const {apiKey, yelpBaseUrl} = require("./proxydata.js");

const app = express();
app.use(cors());

app.get("/api/yelp", async (req, res) => {
  try {
    const { data } = await axios.get(yelpBaseUrl, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      params: req.query,
    });
    res.json(data);
  } catch (error) {
    
    res.status(500).json({ error: error.message});
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Proxy server listening on port ${port}`);
});
