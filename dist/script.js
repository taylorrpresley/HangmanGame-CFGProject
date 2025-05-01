class Hangman {
  constructor(phrases) {
    this.phrases = phrases;
    this.choosePhrase();
    this.guessedLetters = [];
    this.wrongGuesses = [];
    this.maxAttempts = 10;
    this.canvas = document.getElementById("hangmanCanvas");
    this.ctx = this.canvas.getContext("2d");
    this.starttime = Date.now();
    this.updateDisplay();
  }

  choosePhrase() {
    const randomIndex = Math.floor(Math.random() * this.phrases.length);
    this.currentPhrase = this.phrases[randomIndex].toUpperCase();
    this.displayedPhrase = this.currentPhrase.replace(/[\w]/g, "_");
  }

  guessLetter(letter) {
    letter = letter.toUpperCase();
    if (letter.length !== 1 || !/[A-Z]/i.test(letter)) {
      alert("Please enter a valid letter.");
      return;
    }

    if (
      !this.guessedLetters.includes(letter) &&
      !this.wrongGuesses.includes(letter)
    ) {
      if (this.currentPhrase.includes(letter)) {
        this.updateDisplayedPhrase(letter);
        this.guessedLetters.push(letter);
      } else {
        this.wrongGuesses.push(letter);
        this.drawHangman(this.wrongGuesses.length);
      }
      this.updateDisplay();
    } else {
      alert("You have already guessed that letter.");
    }

    this.checkGameOver();
  }

  updateDisplayedPhrase(letter) {
    let updatedPhrase = "";
    for (let i = 0; i < this.currentPhrase.length; i++) {
      updatedPhrase +=
        this.currentPhrase[i] === letter ||
        this.guessedLetters.includes(this.currentPhrase[i])
          ? this.currentPhrase[i]
          : "_";
    }
    this.displayedPhrase = updatedPhrase;
  }

  checkGameOver() {
    if (!this.displayedPhrase.includes("_")) {
      var gametime = Math.floor((Date.now() - this.starttime) / 1000); // divided by 1000 bc time is measured in ms
      var minutes = Math.floor(gametime / 60);
      var seconds = gametime % 60;
      alert(
        "Congratulations! You have won! The phrase was: " +
          this.currentPhrase +
          ". Your time: " +
          minutes +
          ":" +
          seconds
      );
    } else if (this.wrongGuesses.length >= this.maxAttempts) {
      alert(
        "Game Over! You have no more guesses left. The phrase was: " +
          this.currentPhrase
      );
    }
  }

  updateDisplay() {
    document.getElementById("phrase").textContent =
      "Phrase: " + this.displayedPhrase;
    document.getElementById(
      "guessedLetters"
    ).textContent = this.guessedLetters.join(", ");
    document.getElementById(
      "wrongGuesses"
    ).textContent = this.wrongGuesses.join(", ");
    document.getElementById("attemptsLeft").textContent =
      this.maxAttempts - this.wrongGuesses.length;
    document.getElementById("guessInput").value = "";
  }

  drawHangman(wrongCount) {
    switch (wrongCount) {
      case 1:
        this.drawFrame1();
        break;
      case 2:
        this.drawFrame2();
        break;
      case 3:
        this.drawFrame3();
        break;
      case 4:
        this.drawFrame4();
        break;
      case 5:
        this.drawHead();
        break;
      case 6:
        this.drawBody();
        break;
      case 7:
        this.drawRightArm();
        break;
      case 8:
        this.drawLeftArm();
        break;
      case 9:
        this.drawRightLeg();
        break;
      case 10:
        this.drawLeftLeg();
        break;
    }
  }

  //Draw frame and hangman
  drawFrame1() {
    this.ctx.beginPath();
    this.ctx.moveTo(0, 130);
    this.ctx.lineTo(130, 130);
    this.ctx.stroke();
  }

  drawFrame2() {
    this.ctx.beginPath();
    this.ctx.moveTo(10, 20);
    this.ctx.lineTo(10, 130);
    this.ctx.stroke();
  }

  drawFrame3() {
    this.ctx.beginPath();
    this.ctx.moveTo(10, 20);
    this.ctx.lineTo(100, 20);
    this.ctx.stroke();
  }

  drawFrame4() {
    this.ctx.beginPath();
    this.ctx.moveTo(100, 20);
    this.ctx.lineTo(100, 40);
    this.ctx.stroke();
  }

  drawHead() {
    this.ctx.beginPath();
    this.ctx.arc(100, 50, 10, 0, Math.PI * 2, true);
    this.ctx.stroke();
  }

  drawBody() {
    this.ctx.beginPath();
    this.ctx.moveTo(100, 60);
    this.ctx.lineTo(100, 100);
    this.ctx.stroke();
  }

  drawRightArm() {
    this.ctx.beginPath();
    this.ctx.moveTo(100, 70);
    this.ctx.lineTo(120, 80);
    this.ctx.stroke();
  }

  drawLeftArm() {
    this.ctx.beginPath();
    this.ctx.moveTo(100, 70);
    this.ctx.lineTo(80, 80);
    this.ctx.stroke();
  }

  drawRightLeg() {
    this.ctx.beginPath();
    this.ctx.moveTo(100, 100);
    this.ctx.lineTo(120, 120);
    this.ctx.stroke();
  }

  drawLeftLeg() {
    this.ctx.beginPath();
    this.ctx.moveTo(100, 100);
    this.ctx.lineTo(80, 120);
    this.ctx.stroke();
  }
}

const game = new Hangman(["javascript", "hangman", "programming", "challenge"]);

let resetGame = document.getElementById("resetGame");

resetGame.addEventListener("click", function () {
  const ctx = hangmanCanvas.getContext("2d");
  ctx.clearRect(0, 0, hangmanCanvas.width, hangmanCanvas.height);
  game.choosePhrase();
  game.guessedLetters = [];
  game.wrongGuesses = [];
  game.starttime = Date.now();
  game.updateDisplay();
});