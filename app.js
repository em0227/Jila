const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send('test')
});
const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Server is running on port ${port}`));