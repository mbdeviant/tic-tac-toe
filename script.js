const Player = (sign) => {
    this.sign = sign;

    const getSign = () => {
        return sign;
    };
    return { getSign };
}


const gameBoard = (() => {
    const board = ['', '', '', '', '', '', '', '', ''];

    const getIndex = index => {
        return board[index];
    }
    const mark = (index, sign) => {
        board[index] = sign;
    }
    const reset = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = '';
        }
    }

    return { getIndex, reset, mark }
})();


const displayControl = (() => {
    const cells = document.querySelectorAll('.cell');
    const restartButton = document.getElementById('restart-button');

    cells.forEach(() => {
        addEventListener("click", (e) => {
            if (e.target.textContent != '') return
            gameBoard.mark(parseInt(e.target.dataset.index), gameplay.currentSign());
            gameplay.changePlayer();
            render();
        });
    });
    restartButton.addEventListener('click', () => {
        gameplay.restartGame();
        render();
    })
    const render = () => {
        for (let i = 0; i < cells.length; i++) {
            cells[i].textContent = gameBoard.getIndex(i);
        }
        
    };
    return { render }
})();


const gameplay = (() => {
    const playerX = Player('X');
    const playerO = Player('O')
    let activePlayer = playerX;


    const currentSign = (sign) => {
        sign = activePlayer.getSign();
        return sign
    }
    const restartGame = () => {
        activePlayer = playerX;
        gameBoard.reset();
    }
    const changePlayer = () => {
        (activePlayer == playerX) ? activePlayer = playerO : activePlayer = playerX;
    }

    return { changePlayer, currentSign, restartGame };
})();



// overlay.style.display = 'block'; => to show gameover overlay
// overlay.style.display = 'none';  => to hide gameover overlay


