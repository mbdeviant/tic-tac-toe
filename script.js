


const gameBoard = (() => {
    const board = ['X', '', 'X', '', 'O', '', 'X', '', 'X'];
    const getIndex = index => {
        return board[index];
    }
    const setSign = (index, sign) => {
        board[index] = sign;
    }
    const reset = () => {
        for (let i = 0; i < cells.length; i++) {
            board[i] = '';
            console.log('reached');
        }
    }
    return { getIndex, reset, setSign }
})();



const displayControl = (() => {
    const cells = document.querySelectorAll('[data-cell]');
    cells.forEach(element => {
        addEventListener("click", () => {
            console.log('element');
        })
    });
    const updateGameboard = () => {
        for (let i = 0; i < cells.length; i++) {
            cells[i].textContent = gameBoard.getIndex(i);
            console.log(cells[i])
        }
    };
    return { updateGameboard }
})();

displayControl.updateGameboard();