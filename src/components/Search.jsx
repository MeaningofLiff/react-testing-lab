function Search({ searchTerm, onSearchChange }) {
  function handleChange(e) {
    onSearchChange(e.target.value);
  }
 
  return (
    <div className="ui large fluid icon input">
      <input
        type="text"
        placeholder="Search your Recent Transactions"
        value={searchTerm}
        onChange={handleChange}
      />
      <i className="circular search link icon" />
    </div>
  );
}

export default Search;
 