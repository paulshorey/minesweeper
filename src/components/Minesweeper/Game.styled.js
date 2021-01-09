import styled from "styled-components";

export const StyledGame = styled.div`
  color: white;
  background: url("/images/bg-water.jpg");
  background-size: cover;
  min-height: 100vh;
  box-sizing: border-box;
  user-select: none;
  .top {
    padding: ${(pr) => pr.cell_width / 4}px ${(pr) => pr.cell_width / 2}px ${(pr) => pr.cell_width / 10}px;
    .message {
      margin: 0 -${(pr) => pr.cell_width / 2}px;
      padding: ${(pr) => pr.cell_width / 3}px ${(pr) => pr.cell_width / 2}px;
      &.error {
        background: pink;
        color: red;
        box-shadow: 0 0 0px 1px red;
        text-align: center;
      }
    }
    .controls {
      padding: ${(pr) => pr.cell_width / 3}px 0 ${(pr) => pr.cell_width / 3}px;
      display: flex;
      justify-content: space-around;
      margin: 0 -0.33rem;
      button {
        border-color: white;
        background: #efefef;
        border-width: 1px;
        border-radius: 2px;
      }
      fieldset {
        margin-right: ${(pr) => pr.cell_width / 4}px;
      }
      input {
        width: ${(pr) => pr.cell_width}px;
      }
      button,
      input {
        opacity: 0.9;
        &:hover {
          opacity: 1;
        }
      }
    }
  }
  .board {
    padding: ${(pr) => pr.cell_width / 4}px ${(pr) => pr.cell_width / 2}px ${(pr) => pr.cell_width / 4}px;
    .grid {
      display: flex;
      flex-direction: column;
      .row {
        display: flex;
        flex-direction: row;
        .cell {
          width: ${(pr) => pr.cell_width}px;
          height: ${(pr) => pr.cell_width}px;
          margin: 1px;
          box-sizing: border-box;
          cursor: default;
          // center the content:
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          &.value_m {
            color: red;
            background: hsl(50, 95%, 80%);
          }
          &.value_x {
            overflow: hidden;
            color: red;
            font-size: 20px;
            background: pink;
          }
          &.value_0 {
            visibility: hidden;
          }
          &.value_ {
            background: #ccc;
          }
        }
      }
    }
  }
`;
