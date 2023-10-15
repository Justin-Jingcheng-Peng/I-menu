import express from "express";
import { solveChatGpt } from "./textHandler.js";

const app = express();

app.post("/process-image", async (req, res) => {
  const userData = req.body; // Access the JSON data from the request body
  try {
    const result = await solveChatGpt(userData);

    res.json({ result });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
