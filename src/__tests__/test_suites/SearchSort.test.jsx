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

describe("Search and Sort Transactions", () => {
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

  // EXISTING TEST
  it("filters transactions when the search input changes", async () => {
    const user = userEvent.setup();
    render(<App />);

    await screen.findByText(/Paycheck/i);
    await screen.findByText(/Groceries/i);

    const searchInput = screen.getByPlaceholderText(/search your recent transactions/i);

    await user.type(searchInput, "Groc");

    expect(screen.queryByText(/Paycheck/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Groceries/i)).toBeInTheDocument();
  });

  // ⭐ NEW TEST #1 – Restore after clearing
  it("restores all transactions after clearing the search box", async () => {
    const user = userEvent.setup();
    render(<App />);

    await screen.findByText(/Paycheck/i);
    await screen.findByText(/Groceries/i);

    const searchInput = screen.getByPlaceholderText(/search your recent transactions/i);

    await user.type(searchInput, "groc");
    expect(screen.queryByText(/Paycheck/i)).not.toBeInTheDocument();

    await user.clear(searchInput);

    expect(screen.getByText(/Paycheck/i)).toBeInTheDocument();
    expect(screen.getByText(/Groceries/i)).toBeInTheDocument();
  });

  // ⭐ NEW TEST #2 – Case-insensitive search
  it("searches transactions in a case-insensitive manner", async () => {
    const user = userEvent.setup();
    render(<App />);

    await screen.findByText(/Paycheck/i);
    await screen.findByText(/Groceries/i);

    const searchInput = screen.getByPlaceholderText(/search your recent transactions/i);

    await user.type(searchInput, "GROCERIES");

    expect(screen.queryByText(/Paycheck/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Groceries/i)).toBeInTheDocument();
  });
});
 
 