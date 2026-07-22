const amounts = [101, 251, 501, 1001, 5001];

function AmountSelector({ amount, onSelect }) {
  return (
    <div className="amount-selector">

      {amounts.map((value) => (
        <button
          key={value}
          type="button"
          className={`amount-btn ${
            Number(amount) === value ? "active" : ""
          }`}
          onClick={() => onSelect(value)}
        >
          ₹{value}
        </button>
      ))}

    </div>
  );
}

export default AmountSelector;