let playerScore = 0;
let aiScore = 0;
let roundsPlayed = 0;

document.getElementById("start-game-button").addEventListener("click", () => {
  document.getElementById("start-screen").style.display = "none";
  document.querySelector(".start-logo").style.display = "none";
  document.getElementById("game-screen").classList.remove("hidden");
});

document.querySelectorAll(".choice").forEach((button) => {
  button.addEventListener("click", async () => {
    if (roundsPlayed >= 3) return;

    const playerChoice = button.id;
    const playerHandImage = document.getElementById("player-hand-image");
    const aiHandImage = document.getElementById("ai-hand-image");
    const gestures = ["rock", "paper", "scissors"];
    let counter = 0;

    const animationInterval = setInterval(() => {
      playerHandImage.src = `assets/${gestures[counter % 3]}.png`;
      aiHandImage.src = `assets/${gestures[(counter + 1) % 3]}.png`;
      counter++;
    }, 200);

    setTimeout(async () => {
      clearInterval(animationInterval);

      try {
        const response = await fetch("/play", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ playerChoice }),
        });

        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();
        playerHandImage.src = `assets/${data.playerChoice}.png`;
        aiHandImage.src = `assets/${data.aiChoice}.png`;
        document.getElementById("player-choice").textContent = data.playerChoice;
        document.getElementById("ai-choice").textContent = data.aiChoice;
        document.getElementById("result").textContent = data.result;

        if (data.result === "You Win!") playerScore++;
        else if (data.result === "You Lose!") aiScore++;

        roundsPlayed++;
        document.getElementById("player-score").textContent = playerScore;
        document.getElementById("ai-score").textContent = aiScore;
        document.getElementById("rounds").textContent = roundsPlayed;

        if (roundsPlayed === 3) {
          let finalWinnerText = "";
          if (playerScore > aiScore) finalWinnerText = "You are the final winner! 🎉";
          else if (aiScore > playerScore) finalWinnerText = "AI is the final winner! 😢";
          else finalWinnerText = "It's a draw! 🤝";

          document.getElementById("final-winner-text").textContent = finalWinnerText;
          document.getElementById("game-finished-text").textContent = "Game Finished!";
          const modal = document.getElementById("final-result-modal");
          modal.style.display = "flex";
          document.querySelector("h1").style.display = "none";
          document.querySelector(".game").style.display = "none";
          document.querySelector(".animation-container").style.display = "none";
          document.querySelector(".results").style.display = "none";
          document.querySelector(".score").style.display = "none";
        }
      } catch (error) {
        console.error("Error:", error);
        document.getElementById("result").textContent = "An error occurred. Please try again.";
      }
    }, 2000);
  });
});

document.getElementById("play-again-button").addEventListener("click", () => {
  location.reload();
});