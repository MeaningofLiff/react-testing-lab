import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import App from "../components/App";   // or "../App" depending on your project

// ⬇⬇⬇ PUT YOUR DESCRIBE BLOCKS BELOW THE IMPORTS ⬇⬇⬇

// ------------------------------
// Display Transactions Test Suite
// ------------------------------
describe("Display Transactions", () => {
  const mockTransactions = [
    {
      id: 1,
      date: "2025-01-01",
      description: "Paycheck",
      category: "Income",
      amount: 1000,
    },
    {
      id: 2,
      date: "2025-01-02",
      description: "Groceries",
      category: "Food",
      amount: -50,
    },
  ];

  beforeEach(() => {
    vi.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      json: async () => mockTransactions,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("displays transactions on startup", async () => {
    render(<App />);

    const paycheckRow = await screen.findByText(/Paycheck/i);
    expect(paycheckRow).toBeInTheDocument();

    const groceriesRow = await screen.findByText(/Groceries/i);
    expect(groceriesRow).toBeInTheDocument();
  });
});
 