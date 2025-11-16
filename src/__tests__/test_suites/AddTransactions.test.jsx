import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
  vi,
} from "vitest";
import App from "../../components/App";

describe("Add Transactions", () => {
  const initialTransactions = [
    {
      id: 1,
      date: "2025-01-01",
      description: "Paycheck",
      category: "Income",
      amount: 1000,
    },
  ];

  const newTransactionFromServer = {
    id: 2,
    date: "2025-01-03",
    description: "Coffee",
    category: "Food",
    amount: -5,
  };

  beforeEach(() => {
    vi.spyOn(global, "fetch")
      // GET /transactions
      .mockResolvedValueOnce({
        ok: true,
        json: async () => initialTransactions,
      })
      // POST /transactions
      .mockResolvedValueOnce({
        ok: true,
        json: async () => newTransactionFromServer,
      });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("adds a new transaction and calls POST", async () => {
    const user = userEvent.setup();
    render(<App />);

    // wait for initial data to render
    await screen.findByText(/Paycheck/i);

    // use placeholders to find inputs
    const dateInput = screen.getByPlaceholderText(/date/i);
    const descriptionInput =
      screen.getByPlaceholderText(/description/i);
    const categoryInput =
      screen.getByPlaceholderText(/category/i);
    const amountInput = screen.getByPlaceholderText(/amount/i);

    await user.type(dateInput, "2025-01-03");
    await user.type(descriptionInput, "Coffee");
    await user.type(categoryInput, "Food");
    await user.type(amountInput, "-5");

    await user.click(
      screen.getByRole("button", { name: /add transaction/i })
    );

    // POST was called
    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringMatching(/transactions/i),
      expect.objectContaining({
        method: "POST",
      })
    );

    // new transaction shows up on the page
    const coffeeRow = await screen.findByText(/Coffee/i);
    expect(coffeeRow).toBeInTheDocument();
  });
});
 
 