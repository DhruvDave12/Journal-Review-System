require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookies = require("cookie-parser");

const { configDB } = require("./config/db");

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const articleRoutes = require("./routes/article.routes");
const editorRoutes = require("./routes/editor.routes");
const associateEditorRoutes = require("./routes/associate_editor.routes");
const reviewerRoutes = require("./routes/review.routes");

configDB();
const app = express();
const corsOptions = {
  // origin: "https://journal-review-system.vercel.app",
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(cookies());
// parsing the incoming data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", authRoutes);
app.use("/", userRoutes);
app.use("/article", articleRoutes);
app.use("/editor", editorRoutes);
app.use("/associate_editor", associateEditorRoutes);
app.use("/review", reviewerRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to Decentralized Journal Review System");
});
const PORT = process.env.PORT || 1337;
app.listen(PORT, () => {
  console.log("Server is running on port " + PORT + "🎉");
});
