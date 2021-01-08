export default class Minesweeper {

  constructor(inputMatrix) {
    // build out the state
    let matrix = []
    for (let ri = 0; ri< inputMatrix.length; ri++) {
      let row = inputMatrix[ri]
      matrix[ri] = []
      for (let ci = 0; ci< row.length; ci++) {
        let bomb = row[ci]
        matrix[ri][ci] = this.cellCreate(bomb, ri, ci)
      }
    }
    this.matrix = matrix;
  }

  cellCreate = function(bomb, ri, ci){
    return {
      bomb: bomb, // 0 or 1
      checked: false, // true if user clicked on it
      neighbor_bombs: 0, //
      ri: ri,
      ci: ci,
    }
  }
  checkCell = function(row, col){
    // check cell for bomb
    let cell = this.matrix[row][col]
    if (!cell) return;
    if (cell.bomb) {
      this.gameOver()
      return;
    }
    // change status of cell
    cell.checked = true
    // check neighbors
    this.neighboringBombs(cell)
  }
  neighboringBombs = function(cell) {
    let neighbors = this.getUncheckedNeighbors(cell)

    // count bombs of neighbors >> of clicked cell <<
    let bombs = 0
    for (let ncell of neighbors) {
      if (ncell.bomb) bombs++
    }
    cell.neighbor_bombs = bombs

    if (cell.neighbor_bombs == 0) {
      // count neighboring bombs of >> each neighbor of clicked cell <<
      for (let ncell of neighbors) {
        ncell.checked = true
        this.neighboringBombs(ncell);
      }
    }
  }
  getUncheckedNeighbors = function(cell) {
    let neighbors = []
    {
      let prev_cell = this.matrix[cell.ri][cell.ci-1];
      if (prev_cell && !prev_cell.checked) neighbors.push(prev_cell)
      let next_cell = this.matrix[cell.ri][cell.ci+1];
      if (next_cell && !next_cell.checked) neighbors.push(next_cell)
    }
    let prev_row = this.matrix[cell.ri-1];
    if (prev_row){
      let prev_cell = prev_row[cell.ci-1];
      if (prev_cell && !prev_cell.checked) neighbors.push(prev_cell)
      let curr_cell = prev_row[cell.ci];
      if (curr_cell && !curr_cell.checked) neighbors.push(curr_cell)
      let next_cell = prev_row[cell.ci+1];
      if (next_cell && !next_cell.checked) neighbors.push(next_cell)
    }
    let next_row = this.matrix[cell.ri+1];
    if (next_row){
      let prev_cell = next_row[cell.ci-1];
      if (prev_cell && !prev_cell.checked) neighbors.push(prev_cell)
      let curr_cell = next_row[cell.ci];
      if (curr_cell && !curr_cell.checked) neighbors.push(curr_cell)
      let next_cell = next_row[cell.ci+1];
      if (next_cell && !next_cell.checked) neighbors.push(next_cell)
    }
    return neighbors
  }
  gameOver = function(){
    console.log('GAME OVER')
  }

  get state() {
    // output the simplified visualization of `this.matrix`
    let matrix = []
    for (let ri = 0; ri < this.matrix.length; ri++) {
      let row = this.matrix[ri]
      matrix[ri] = []
      for (let ci = 0; ci< row.length; ci++) {
        let cell = row[ci]
        let value = cell.checked ? cell.neighbor_bombs : '-'
        matrix[ri][ci] = value
      }
    }
    return matrix
  }

}

//
// var bombMatrix = [
//   [0, 1, 0, 0],
//   [0, 1, 1, 0],
//   [0, 0, 0, 0],
//   [0, 0, 0, 1]
// ]
// var game = new Minesweeper(bombMatrix);
//
//
// // console.log(game.state)
// game.checkCell(3,0)
// console.log(game.state)
// // game.checkCell(0,1)
//
//
//
//
//
//
//
//
//
//
//
//
//
