const dotenv = require("dotenv");
const express = require("express");
const app = express();
const cors=require('cors');
const dbConnect = require("./config/dbConnect.js");
dotenv.config();

const port = process.env.PORT;
app.use(express.json());
app.use(express.urlencoded({extended:true,limit:"10mb"}));
app.use(cors());

const routes = require("./routes/auth");
const blogRoutes = require("./routes/blogRoutes");
const commentRoutes = require("./routes/commentRoutes");
app.use("/api/v1", routes);
app.use("/api/v1",blogRoutes);
app.use("/api/v1/comments", commentRoutes);

app.get("/", (req, res) => {
  res.send(`<h1>Blogs</h1>`);
});

dbConnect();

app.listen(port, () => {
      console.log(`Server started at port http://localhost:${port}`);
})
