const Player = (sign) => {
    this.sign = sign;

    const getSign = () => {
        return sign;
    };
    return { getSign };
};

const gameBoard = (() => {
    const board = ["", "", "", "", "", "", "", "", ""];

    const getIndex = (index) => {
        return board[index];
    };
    const mark = (index, sign) => {
        board[index] = sign;
    };
    const reset = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = "";
        }
    };

    return { getIndex, reset, mark };
})();

const displayControl = (() => {
    const cells = document.querySelectorAll(".cell");
    const restartButton = document.getElementById("restart-button");

    cells.forEach(() => {
        addEventListener("click", (e) => {
            if (e.target.textContent != "") return;
            gameBoard.mark(
                parseInt(e.target.dataset.index),
                gameplay.currentSign()
            );
            gameplay.changePlayer();
            showMessage.changeTurn();
            gameplay.checkWinner();
            render();
        });
    });

    restartButton.addEventListener("click", () => {
        gameplay.reset();
        showMessage.resetTurn();
        render();
    });

    const render = () => {
        for (let i = 0; i < cells.length; i++) {
            cells[i].textContent = gameBoard.getIndex(i);
        }
    };
    return { render };
})();

const gameplay = (() => {
    const playerX = Player("X");
    const playerO = Player("O");
    let activePlayer = playerX;
    let round = 0;
    const conditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    const currentSign = (sign) => {
        sign = activePlayer.getSign();
        return sign;
    };
    const reset = () => {
        activePlayer = playerX;
        round = 0;
        showMessage.resetTurn();
        gameBoard.reset();
    };
    const changePlayer = () => {
        activePlayer == playerX
            ? (activePlayer = playerO)
            : (activePlayer = playerX);
    };
    const checkWinner = () => {
        round++;
        if (round === 9) showMessage.draw();
        for (let i = 0; i < 8; i++) {
            const winCondition = conditions[i];
            const a = gameBoard.getIndex(winCondition[0]);
            const b = gameBoard.getIndex(winCondition[1]);
            const c = gameBoard.getIndex(winCondition[2]);
            if (a == "" || b == "" || c == "") continue;
            if (a == b && b == c) showMessage.winner();
        }
    };

    return { changePlayer, currentSign, reset, checkWinner, conditions };
})();

const showMessage = (() => {
    const overlay = document.getElementById("overlay");
    const message = document.getElementById("message");
    const turn = document.getElementById("turn");

    const winner = () => {
        overlay.style.display = "block";
        gameplay.changePlayer();
        message.textContent = `Player ${gameplay.currentSign()} has won!`;
        closeOverlay();
    };

    const draw = () => {
        overlay.style.display = "block";
        message.textContent = `ROUND DRAW`;
        closeOverlay();
    };
    const changeTurn = () => {
        turn.textContent = `Turn: ${gameplay.currentSign()}`;
    };
    const resetTurn = () => {
        turn.textContent = "Turn:";
    };
    const closeOverlay = () => {
        overlay.addEventListener("click", () => {
            overlay.style.display = "none";
            gameplay.reset();
            displayControl.render();
        });
    };
    return { winner, draw, changeTurn, resetTurn, closeOverlay };
})();
