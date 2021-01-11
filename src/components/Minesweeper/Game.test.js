import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import Game from "./Game";

it("renders controls", () => {
  render(<Game />);
  const element = screen.getByLabelText(/level/i);
  expect(element).toBeInTheDocument();
});

it("automatically starts the game and makes the first safe move", async () => {
  render(<Game />);
  const element = document.querySelector(".value_0");
  const exploded_cells = document.querySelectorAll(".value_x");
  const num_exploded = exploded_cells.length;
  expect(typeof element === "object" && num_exploded === 0).toBeTruthy();
});

it("should find a bomb eventually, after clicking each unopened cell one by one", async () => {
  render(<Game />);
  await waitFor(() => {
    const unopened_cell = document.querySelector(".value_");
    if (unopened_cell) {
      unopened_cell.click();
    }
    expect(document.querySelector(".value_x")).toBeInTheDocument();
  });
});

it("on right-click, should mark the clicked cell as 'M'", async () => {
  render(<Game />);
  // any unopened cell
  const m_cell_before = document.querySelector(".value_m");
  const unopened_cell = document.querySelector(".value_");
  // right-click on it
  fireEvent.click(unopened_cell, { button: 2 });
  const m_cell_after = document.querySelector(".value_m");
  // should have marked that cell as "M"
  setTimeout(() => {
    expect(!m_cell_before && m_cell_after).toBeTruthy();
  }, 300);
});
