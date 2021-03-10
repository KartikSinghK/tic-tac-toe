const board = document.querySelector(".board");
const squares = document.querySelectorAll(".box");
const reset = document.querySelector('.reset');
let turn = "circle";

squares.forEach(function (box) {
    isGameOver(box);
});
reset.addEventListener('click',()=>{
    squares.forEach(function(square){
        square.classList.remove("fade");
        square.classList.remove("used");
        square.classList.remove("circle");
        square.classList.remove("cross");
        document.querySelector('h1').innerText = "tic-tac-toe";
        board.style.pointerEvents = "auto";
        const icon = square.querySelector('.icon');
        if (icon) {
            icon.remove()
        }
    })
})
function isGameOver(box){
    box.addEventListener("click", function () {
        assignShape(box);
        let winner = "tic-tac-toe";
        if (checkWin()) {
            board.style.pointerEvents = "none";
            const check = turn === "circle" ? "cross" : "circle";
            if (check === "circle") {
                winner = `Winner : <i class="icon far fa-circle"></i>`;
            } else if (check === "cross") {
                winner = `Winner : <i class="icon fas fa-times"></i>`;
            }
            gameOver();
        } else if (checkUsed()){
            board.style.pointerEvents = "none";
            winner = "Draw";
            gameOver();
        }
        document.querySelector("h1").innerHTML = winner;
    });
}
function gameOver(){
    squares.forEach(function(square){
        square.classList.add("fade");
    })
}
function checkUsed(){
    let count = 0;
    squares.forEach(function(square){
        if (square.classList.contains('used')) {
            count++;
        }
    })
    return count === 9 ? true:false;
}
function checkWin() {
    const squaresArr = getArray();
    const check = turn === "circle" ? "cross" : "circle";

    for (let i = 0; i < 3; i++) {
        let corner = squaresArr[i][0].classList.contains(check);
        let vertical = squaresArr[0][i].classList.contains(check);
        if (corner) {
            if (
                squaresArr[i][1].classList.contains(check) &&
                squaresArr[i][2].classList.contains(check)
            ) {
                return true;
            } else if (
                squaresArr[0][i].classList.contains(check) &&
                squaresArr[1][i].classList.contains(check) &&
                squaresArr[2][i].classList.contains(check)
            ) {

                return true;
            } else if (i === 0 || i === 2) {
                if (
                    squaresArr[1][1].classList.contains(check) &&
                    squaresArr[2][2].classList.contains(check)
                ) {
                    return true;
                } else if (
                    squaresArr[1][1].classList.contains(check) &&
                    squaresArr[0][2].classList.contains(check) &&
                    i === 2
                ) {
                    return true;
                }
            }
        }
        if (vertical) {
            if (
                squaresArr[0][i].classList.contains(check) &&
                squaresArr[1][i].classList.contains(check) &&
                squaresArr[2][i].classList.contains(check)
            ) {
                return true;
            }
        }
    }
    return false;
}
function assignShape(box) {
    if (!box.classList.contains("used")) {
        if (turn === "circle") {
            box.children[0].innerHTML = `<i class="icon far fa-circle"></i>`;
            box.classList.add("used");
            box.classList.add("circle");
            turn = "cross";
        } else {
            box.children[0].innerHTML = `<i class="icon fas fa-times"></i>`;
            box.classList.add("used");
            box.classList.add("cross");
            turn = "circle";
        }
    }
}
function getArray() {
    const arr = [];
    for (let i = 0; i < 3; i++) {
        const tempAr = [];
        for (let j = 0; j < 3; j++) {
            tempAr.push(squares[j + 3 * i]);
        }
        arr.push(tempAr);
    }
    return arr;
}
