const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const tickets = require("./routes/api/tickets");
const cors = require("cors");

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/test", (req, res) => {
  res.send("test");
});

app.use("/api/tickets", tickets);

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Server is running on port ${port}`));
