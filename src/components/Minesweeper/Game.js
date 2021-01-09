import React from "react";
import "./Game.styled";
import MinesweeperClass from "./assets/MinesweeperClass";
import { StyledGame } from "./Game.styled";

class GameComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameOptions: {
        difficulty: "medium"
      },
      grid: []
    };
  }

  componentDidMount() {
    this.newGame();
  }

  render() {
    return (
      <StyledGame {...this.state.gameOptions}>
        <section className="top">
          {/*
           * MESSAGE
           */}
          {this.state.message_text && (
            <div className={"message " + this.state.message_status}>{this.state.message_text}</div>
          )}
          {/*
           * USER CONTROLS:
           */}
          <div className="controls">
            <fieldset className="ui_fieldset">
              <label>Cells:&nbsp;</label>
              <input type="number" value={this.state.gameOptions.n_columns} />
            </fieldset>
            <fieldset className="ui_fieldset">
              <label>Rows:&nbsp;</label>
              <input type="number" value={this.state.gameOptions.n_rows} />
            </fieldset>
            <fieldset className="ui_fieldset">
              <label>Level:&nbsp;</label>
              <select>
                <option value="easy">Easy</option>
                <option value="medium" selected="selected">
                  Medium
                </option>
                <option value="hard">Hard</option>
              </select>
            </fieldset>
            <fieldset className="ui_fieldset">
              <label>Terrain:&nbsp;</label>
              <select>
                <option value="easy">Desert</option>
                <option value="medium" selected="selected">
                  Ocean
                </option>
                <option value="hard">Jungle</option>
              </select>
            </fieldset>
            <button className="">New game</button>
          </div>
        </section>
        {/*
         * THE GAME BOARD:
         */}
        <div className="board">{this.renderGrid()}</div>
      </StyledGame>
    );
  }

  /*
   *
   * HELPER METHODS - have access to {this}
   *
   */

  renderGrid = () => {
    let Rows = [];
    this.state.grid.forEach((arr_of_cells, row_i) => {
      Rows.push(this.renderRow(arr_of_cells, row_i));
    });
    return <div className="grid">{Rows}</div>;
  };

  renderRow = (arr_of_cells, row_i) => {
    let Cells = [];
    arr_of_cells.forEach((cell, cell_i) => {
      Cells.push(this.renderCell(cell, row_i, cell_i));
    });
    return <div className="row">{Cells}</div>;
  };

  renderCell = (cell_value = "", row_i, cell_i) => {
    return (
      <div
        className={"cell value_" + cell_value.toLowerCase()}
        onClick={() => {
          // get data
          this.game.openCell(row_i, cell_i);
          // render board
          this.setState({
            grid: this.game.state
          });
          // show message to user
          if (this.game.isBomb(row_i, cell_i)) {
            this.setState({
              message_status: "error",
              message_text: "BOOM!!! YOU EXPLODED!"
            });
          }
        }}
        onContextMenu={(e) => {
          e.preventDefault();
          this.game.markCell(row_i, cell_i);
          this.setState({
            grid: this.game.state
          });
        }}
      >
        {cell_value}
      </div>
    );
  };

  newGame = () => {
    // decide basic game parameters based on viewport width/height
    let viewOptions = { cell_width: 40 };
    viewOptions.n_columns = Math.round((window.innerWidth - viewOptions.cell_width * 2) / viewOptions.cell_width);
    viewOptions.n_rows = Math.round((window.innerHeight - viewOptions.cell_width * 4) / viewOptions.cell_width);
    // combine user + viewport parameters
    this.setState(
      {
        message_text: "This is a classic Minesweeper game. The first move is made for you. Good luck!",
        message_status: "info",
        gameOptions: {
          ...this.state.gameOptions,
          ...viewOptions
        }
      },
      () => {
        // after state is saved
        // new game data
        this.game = new MinesweeperClass(this.state.gameOptions);
        /*
         * TODO: This is an interesting problem ...
         *   `new MinesweeperClass()` seems to be asynchronous ?!?
         *   Needs this setTimeout. Otherwise, this.game.state is not reaady.
         */
        setTimeout(() => {
          // render board by setting this.state.grid
          this.setState({
            grid: this.game.state
          });
        }, 600);
      }
    );
  };
}

export default GameComponent;
