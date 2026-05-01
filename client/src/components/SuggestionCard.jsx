const SuggestionCard = ({ suggestion }) => {
  return (
    <div className="card suggestion">
      <h3>AI Wellness Suggestion</h3>
      <p>{suggestion?.suggestion || "No suggestion yet."}</p>
    </div>
  );
};

export default SuggestionCard;
