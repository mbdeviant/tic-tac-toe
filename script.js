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
    const setSign = (index, sign) => {
        board[index] = sign;
    }
    const reset = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = '';
            displayControl.updateGameboard();
            console.log('reached');
        }
    }
    return { getIndex, reset, setSign, board }
})();



const displayControl = (() => {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(() => {
        addEventListener("click", (e) => {
            if (e.target.textContent != '') return
            gameBoard.setSign(parseInt(e.target.dataset.index), gameplay.currentSign());
            gameplay.changeSign();
            
            updateGameboard();
        })
    });

    const updateGameboard = () => {
        for (let i = 0; i < cells.length; i++) {
            cells[i].textContent = gameBoard.getIndex(i);
        }
    };
    return { updateGameboard }
})();

const gameplay = (() => {
    const playerX = Player('X');
    const playerO = Player('O')
    let activePlayer = playerX;

    const currentSign = (sign) => {
        sign = activePlayer.getSign();
        return sign
    }

    const changeSign = () => {
        (activePlayer == playerX) ? activePlayer = playerO : activePlayer = playerX;
    }

    return { changeSign, currentSign };
})();


gameBoard.reset();

