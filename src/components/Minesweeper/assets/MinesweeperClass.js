export default class MinesweeperClass {
  constructor(options) {
    this.construct(options);
  }

  construct = (options) => {
    // parse parameters
    let { n_rows = 10, n_columns = 10, settings = {} } = options;
    let { difficulty = "medium" } = settings;
    let bombRatio = { 0: 0.8, 1: 0.2 };
    if (difficulty === "easy") {
      bombRatio = { 0: 0.9, 1: 0.1 };
    }
    if (difficulty === "hard") {
      bombRatio = { 0: 0.7, 1: 0.3 };
    }
    // place the bombs randomly
    let bombMatrix = [];
    for (let i = 0; i < n_rows; i++) {
      bombMatrix.push([]);
    }
    for (let row of bombMatrix) {
      for (let i = 0; i < n_columns; i++) {
        let bombOrNot = weightedRandom(bombRatio);
        // console.log("bombOrNot", bombOrNot);
        row.push(bombOrNot);
      }
    }
    // build the board
    let matrix = [];
    for (let ri = 0; ri < bombMatrix.length; ri++) {
      let row = bombMatrix[ri];
      matrix[ri] = [];
      for (let ci = 0; ci < row.length; ci++) {
        let bomb = row[ci];
        matrix[ri][ci] = this.cellCreate(bomb, ri, ci);
      }
    }
    this.matrix = matrix;
    // find and click on safe cell, to get the user started
    // so user does not have to guess
    let safeCell = this.findSafeCellToStartWith();
    if (safeCell) {
      // click to unveil it
      this.openCell(safeCell.ri, safeCell.ci);
    } else {
      // if no obvious cell to start with, construct new matrix
      this.construct(options);
    }
  };

  cellCreate = (bomb, ri, ci) => {
    return {
      bomb: bomb, // 0 or 1
      opened: false, // true if user clicked on it
      neighbor_bombs: 0, //
      ri: ri,
      ci: ci
    };
  };

  markCell = (row, col) => {
    // open cell for bomb
    let cell = this.matrix[row][col];
    if (!cell) return;
    // change status of cell
    if (!cell.opened || cell.marked) {
      cell.marked = !cell.marked;
    }
    // open neighbors
    // this.neighboringBombs(cell);
  };

  openCell = (row, col) => {
    // open cell for bomb
    let cell = this.matrix[row][col];
    if (!cell) return;
    // change status of cell
    cell.opened = true;
    // open neighbors
    this.neighboringBombs(cell, true);
  };

  findSafeCellToStartWith = () => {
    // Loop (through array.length / 2),
    // One pointer searching left,
    // 2nd pointer searching right,
    let row_l = Math.floor(this.matrix.length / 2 - 0.5);
    for (let row_r = Math.floor(this.matrix.length / 2 + 1); row_r < this.matrix.length; row_r++) {
      // search each column in the same way
      let col_l = Math.floor(this.matrix[0].length / 2 - 0.5);
      for (let col_r = Math.floor(this.matrix[0].length / 2 + 1); col_r < this.matrix[0].length; col_r++) {
        // open column (left)
        {
          let cell = this.matrix[row_l][col_l];
          if (!cell.bomb) {
            let neighbors = this.getUnopenedNeighbors(cell);
            if (this.countNeighborsWithBombs(neighbors) === 0) {
              return cell;
            }
          }
        }
        // open column (right)
        {
          let cell = this.matrix[row_l][col_l];
          if (!cell.bomb && cell.neighbor_bombs === 0) {
            let neighbors = this.getUnopenedNeighbors(cell);
            if (this.countNeighborsWithBombs(neighbors) === 0) {
              return cell;
            }
          }
        }
        // next column
        col_l--;
      }
      // next row
      row_l--;
    }
  };

  countNeighborsWithBombs(neighbors) {
    let bombs = 0;
    for (let ncell of neighbors) {
      if (ncell.bomb) bombs++;
    }
    return bombs;
  }

  neighboringBombs = (cell, doOpen) => {
    let neighbors = this.getUnopenedNeighbors(cell);

    // count bombs of neighbors >> of clicked cell <<
    let bombs = 0;
    for (let ncell of neighbors) {
      if (ncell.bomb) bombs++;
    }
    cell.neighbor_bombs = bombs;
    if (cell.neighbor_bombs === 0) {
      // count neighboring bombs of >> each neighbor of clicked cell <<
      for (let ncell of neighbors) {
        // Noramlly, mark it as opened, then open neighbors.
        // However, with a special case, simply return the coordinates of first
        // empty cell with mostly empty neighbors.
        if (doOpen) {
          ncell.opened = true;
        }
        this.neighboringBombs(ncell, doOpen);
      }
    }
  };
  getUnopenedNeighbors = (cell) => {
    let neighbors = [];
    {
      let prev_cell = this.matrix[cell.ri][cell.ci - 1];
      if (prev_cell && !prev_cell.opened) neighbors.push(prev_cell);
      let next_cell = this.matrix[cell.ri][cell.ci + 1];
      if (next_cell && !next_cell.opened) neighbors.push(next_cell);
    }
    let prev_row = this.matrix[cell.ri - 1];
    if (prev_row) {
      let prev_cell = prev_row[cell.ci - 1];
      if (prev_cell && !prev_cell.opened) neighbors.push(prev_cell);
      let curr_cell = prev_row[cell.ci];
      if (curr_cell && !curr_cell.opened) neighbors.push(curr_cell);
      let next_cell = prev_row[cell.ci + 1];
      if (next_cell && !next_cell.opened) neighbors.push(next_cell);
    }
    let next_row = this.matrix[cell.ri + 1];
    if (next_row) {
      let prev_cell = next_row[cell.ci - 1];
      if (prev_cell && !prev_cell.opened) neighbors.push(prev_cell);
      let curr_cell = next_row[cell.ci];
      if (curr_cell && !curr_cell.opened) neighbors.push(curr_cell);
      let next_cell = next_row[cell.ci + 1];
      if (next_cell && !next_cell.opened) neighbors.push(next_cell);
    }
    return neighbors;
  };

  isBomb(row_i, col_i) {
    return this.matrix[row_i][col_i].bomb;
  }

  get state() {
    // output the simplified visualization of `this.matrix`
    let matrix = [];
    for (let ri = 0; ri < this.matrix.length; ri++) {
      let row = this.matrix[ri];
      matrix[ri] = [];
      for (let ci = 0; ci < row.length; ci++) {
        let cell = row[ci];
        let value = "";
        if (cell.opened) {
          if (cell.bomb) {
            value = "X";
          } else {
            value = cell.neighbor_bombs.toString() || "";
          }
        }
        if (cell.marked) {
          value = "M";
        }
        matrix[ri][ci] = value;
      }
    }
    return matrix;
  }
}

// var bombMatrix = [
//   [0, 1, 0, 0],
//   [0, 1, 1, 0],
//   [0, 0, 0, 0],
//   [0, 0, 0, 1]
// ]
// var game = new Minesweeper(bombMatrix);
//
// // console.log(game.state)
// game.openCell(3,0)
// console.log(game.state)
// // game.openCell(0,1)

/*
 *
 * LIB
 *
 */
function weightedRandom(prob) {
  let i,
    sum = 0,
    r = Math.random();
  for (i in prob) {
    sum += prob[i];
    if (r <= sum) return Number(i);
  }
}
