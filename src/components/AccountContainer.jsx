import { useEffect, useState } from "react";
import Search from "./Search";
import TransactionsList from "./TransactionsList.jsx";
import AddTransactionForm from "./AddTransactionForm";
import Sort from "./Sort";

function AccountContainer() {
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("description");

  useEffect(() => {
    fetch("http://localhost:8001/transactions")
      .then((r) => r.json())
      .then((data) => setTransactions(data));
  }, []);

  function handleAddTransaction(newTransaction) {
    setTransactions((prev) => [...prev, newTransaction]);
  }

  function handleSearchChange(value) {
    setSearchTerm(value);
  }

  function handleSortChange(value) {
    setSortBy(value);
  }

  const filteredTransactions = transactions
    .filter((transaction) =>
      transaction.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "category") {
        return a.category.localeCompare(b.category);
      }
      // default: description
      return a.description.localeCompare(b.description);
    });

  return (
    <div>
      <Search
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
      />
      <AddTransactionForm onAddTransaction={handleAddTransaction} />
      <Sort sortBy={sortBy} onSortChange={handleSortChange} />
      <TransactionsList transactions={filteredTransactions} />
    </div>
  );
}

export default AccountContainer;
 
 