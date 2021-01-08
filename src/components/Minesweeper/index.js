import React from "react";
import "./style.scss";
import MinesweeperClass from "./assets/minesweeper";

class MinesweeperPage extends React.Component {
  constructor(props) {
    super(props);
    this.bombMatrix = [
      [0, 1, 0, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 1]
    ]
    this.game = new MinesweeperClass(this.bombMatrix);
    this.state = {
      board: this.game.state
    };
  }

  render() {
    let Rows = [];
    this.state.board.forEach((arr_of_cells, row_i) => {
      Rows.push(this.renderRow(arr_of_cells, row_i));
    });
    return <div className="table">{Rows}</div>;
  }

  renderRow = (arr_of_cells, row_i) => {
    let Cells = [];
    arr_of_cells.forEach((cell, cell_i) => {
      Cells.push(this.renderCell(cell, cell_i, row_i));
    });
    return <div className="row">{Cells}</div>;
  };

  renderCell = (cell_value, cell_i, row_i) => {
    return (
      <div
        className="cell"
        onClick={() => {
          this.game.checkCell(row_i, cell_i);
          this.setState({
            board: this.game.state
          });
        }}
      >
        {cell_value}
      </div>
    );
  };
}

export default MinesweeperPage;
