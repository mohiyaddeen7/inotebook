const connectToMongo = require("./db.js");
const express = require("express");
const app = express();
const cors = require('cors')
const port = 5000;
require('dotenv').config()
connectToMongo();

app.use(cors())
app.use(express.json());
//Available routes //middleware function - appllication level
app.use("/api/auth", require("./routes/auth.js"));
app.use("/api/notes", require("./routes/notes.js"));

app.listen(port, () => {
  console.log(`inotebook app listening on  http://localhost:${port}`);
});
