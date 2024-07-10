document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    const statusDisplay = document.getElementById("status");
    const popup = document.getElementById("popup");
    const winnerMessage = document.getElementById("winner-message");
    const celebrateBtn = document.getElementById("celebrate-btn");
    const playAgainBtn = document.getElementById("play-again-btn");
    const resetButton = document.getElementById("reset");
    let isXNext = true;
    let gameActive = true;
    let board = ["", "", "", "", "", "", "", "", ""];

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    const handleCellClick = (event) => {
        const cell = event.target;
        const index = cell.getAttribute("data-index");

        if (board[index] !== "" || !gameActive) {
            return;
        }

        board[index] = isXNext ? "X" : "O";
        cell.textContent = board[index];
        isXNext = !isXNext;

        checkWinner();
    };

    const checkWinner = () => {
        let roundWon = false;
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            const winner = isXNext ? "O" : "X";
            statusDisplay.textContent = `Player ${winner} wins!`;
            showPopup(`Player ${winner} wins!`);
            gameActive = false;
            return;
        }

        if (!board.includes("")) {
            statusDisplay.textContent = "It's a draw!";
            showPopup("It's a draw!");
            gameActive = false;
            return;
        }

        statusDisplay.textContent = `Player ${isXNext ? "X" : "O"}'s turn`;
    };

    const showPopup = (message) => {
        winnerMessage.textContent = message;
        popup.style.display = "flex";
    };

    const resetGame = () => {
        isXNext = true;
        gameActive = true;
        board = ["", "", "", "", "", "", "", "", ""];
        statusDisplay.textContent = "Player X's turn";
        cells.forEach(cell => {
            cell.textContent = "";
        });
        popup.style.display = "none";
    };

    cells.forEach(cell => cell.addEventListener("click", handleCellClick));
    celebrateBtn.addEventListener("click", () => alert("🎉 Celebrating!"));
    playAgainBtn.addEventListener("click", resetGame);
    resetButton.addEventListener("click", resetGame);
});
