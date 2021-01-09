import React from "react";
import ReactDOM from "react-dom";
import "src/styles/reset.scss";
import "src/styles/ui_components.scss";
import reportWebVitals from "./reportWebVitals";
import Minesweeper from "./components/Minesweeper/Game";

ReactDOM.render(
  <React.StrictMode>
    <Minesweeper />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
