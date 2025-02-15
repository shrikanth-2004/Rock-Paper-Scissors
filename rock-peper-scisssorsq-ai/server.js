const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/play", (req, res) => {
  const playerChoice = req.body.playerChoice;
  const choices = ["rock", "paper", "scissors"];
  const aiChoice = choices[Math.floor(Math.random() * 3)];

  let result;
  if (playerChoice === aiChoice) {
    result = "Draw";
  } else if (
    (playerChoice === "rock" && aiChoice === "scissors") ||
    (playerChoice === "paper" && aiChoice === "rock") ||
    (playerChoice === "scissors" && aiChoice === "paper")
  ) {
    result = "You Win!";
  } else {
    result = "You Lose!";
  }

  res.json({ playerChoice, aiChoice, result });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
