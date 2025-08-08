const express = require("express");
const hostRouter = require("./routes/hostRouter");
const storeRouter = require("./routes/storeRouter");
const authRouter = require("./routes/authRouter");
const errorr = require("./controllers/errorrController");
const rootDir = require("./utils/pathUtils");
const path = require("path");
const session = require("express-session");
require("dotenv").config();
const MongoDBStore = require("connect-mongodb-session")(session);
const { default: mongoose } = require("mongoose");
const DB_path = process.env.MONGO_URL;
const PORT = process.env.PORT;

const cors = require("cors");

const app = express();

const store = new MongoDBStore({
  uri: DB_path,
  collection: "sessions",
});

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.static(path.join(rootDir, "public")));
app.use(express.urlencoded());
app.use(express.json());

app.use(
  session({
    secret: "NodeJs",
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      httpOnly: true,
      secure: true, // true in prod (HTTPS only)
      sameSite: 'none',
    }
  })
);

app.use((req, res, next) => {
  req.isLoggedIn = req.session.isLoggedIn;
  req.user = req.session.user;
  next();
});

app.use("/", authRouter);
app.use("/host", hostRouter);
app.use("/store", storeRouter);

app.use(express.static(path.join(rootDir, "../frontend/")));

app.get("*", (req, res) => {
  res.sendFile(path.join(rootDir, "../frontend/index.html"));
});


mongoose
  .connect(DB_path)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server Running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("error connecting to server", err);
  });
