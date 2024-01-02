import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

// Basic Endpoint
app.get("/message", function (request, response) {
  response.json({ message: "I am the message" });
});

app.listen(8080, () => {
  console.log("Server is Running");
});
