import { useState } from "react";

function AddTransactionForm({ onAddTransaction }) {
  const [formData, setFormData] = useState({
    date: "",
    description: "",
    category: "",
    amount: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newTransaction = {
      date: formData.date,
      description: formData.description,
      category: formData.category,
      amount: parseFloat(formData.amount),
    };

    fetch("http://localhost:8001/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTransaction),
    })
      .then((r) => r.json())
      .then((savedTransaction) => {
        onAddTransaction(savedTransaction);
        setFormData({
          date: "",
          description: "",
          category: "",
          amount: "",
        });
      });
  }

  return (
    <div className="ui segment">
      <form className="ui form" onSubmit={handleSubmit}>
        <div className="inline fields">
          <input
            name="date"
            type="date"
            placeholder="Date"
            value={formData.date}
            onChange={handleChange}
          />
          <input
            name="description"
            type="text"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
          />
          <input
            name="category"
            type="text"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
          />
          <input
            name="amount"
            type="number"
            step="0.01"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleChange}
          />
        </div>
        <button className="ui button" type="submit">
          Add Transaction
        </button>
      </form>
    </div>
  );
}

export default AddTransactionForm;
 