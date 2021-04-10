const express = require("express");
const path = require("path");
const cors = require("cors");
const StreamChat = require("stream-chat").StreamChat;
require("dotenv").config({ path: path.resolve(__dirname, ".env") });

const key = process.env["REACT_APP_KEY"];
const secret = process.env["REACT_APP_SECRET"];

const serverClient = StreamChat.getInstance(key, secret);

const app = express();
const PORT = 9000;

app.use(cors());
app.use(express.json());

app.post("/token", async (req, res) => {
  const { user_id } = req.body;
  const token = serverClient.createToken(user_id);
  try {
    res.status(200).send(token);
  } catch (err) {
    res.status(500).send("Server Error: ", err);
  }
});

app.listen(PORT, () =>
  console.log(`Express server listening on port ${PORT}!!`)
);

