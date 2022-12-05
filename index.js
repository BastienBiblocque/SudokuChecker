const grille = [
  [3,2,0,1,7,0,6,5,4],
  [6,1,5,2,9,4,7,0,0],
  [0,7,8,3,0,6,2,9,1],
  [0,5,7,4,0,2,8,1,6],
  [1,8,0,7,6,5,9,0,2],
  [2,3,6,0,1,0,5,4,0],
  [7,4,2,0,8,1,3,0,9],
  [8,0,3,6,0,7,1,2,5],
  [5,6,0,9,2,3,4,0,8],
];

function generateGame() {
  const main = document.querySelector("#main");

  grille.forEach((row,i) => {
    row.forEach((cell,j) => {
      const cellule = document.createElement("input");
      cellule.type = "number";
      if (cell === 0) {
        cellule.min = '1';
        cellule.max = '9';
        cellule.id = i.toString() + '%' + j.toString();
        cellule.onchange = function (){
          addNumber(this);
        }
      } else {
        cellule.disabled = true;
        cellule.value = cell.toString();
      }
      main.appendChild(cellule);
    });
    main.appendChild(document.createElement('br'));
  });
}

function addNumber(element) {
  const value = element.value;
  const coordonnes = getCoordonnes(element.id);
  if (checkRow(value, coordonnes.x) && checkColumn(value, coordonnes.y) && checkSquare(value, coordonnes.x, coordonnes.y)) {
    fillGrid(value, coordonnes.x, coordonnes.y);
    changeColor(value, coordonnes.x, coordonnes.y, 'green', true);
  } else {
    changeColor(value, coordonnes.x, coordonnes.y, 'red', false);
  }
}

function changeColor(value, row, column, color, disabled) {
    const cellule = document.getElementById(row.toString() + '%' + column.toString());
    cellule.style.color = color;
    cellule.disabled = disabled;
}

function fillGrid(value, row, column) {
  grille[row][column] = parseInt(value);
}

function checkRow(value, row) {
  let result = true;
  grille[row].forEach((cell) => {
    if (cell === parseInt(value))
      result = false;
  });
  return result;
}

function checkColumn(value, column) {
  let result = true;
  grille.forEach((row) => {
      if (row[column] === parseInt(value))
        result = false;
  });
  return result;
}

function checkSquare(value, row, column) {
  getSquares(row, column).forEach((cell) => {
    if (cell === parseInt(value))
      return false;
  });
  return true;
}

function getSquares(row, column) {
    const square = [];
    const rowSquare = Math.floor(row / 3) * 3;
    const columnSquare = Math.floor(column / 3) * 3;
    for (let i = rowSquare; i < rowSquare + 3; i++) {
        for (let j = columnSquare; j < columnSquare + 3; j++)
          square.push(grille[i][j]);
    }
    return square;
}


function getCoordonnes(element) {
  const coordonnes = element.split('%');
  return {x:coordonnes[0], y:coordonnes[1]}
}

window.onload = function() {
  generateGame();
};

