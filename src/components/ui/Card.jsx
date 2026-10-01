function Card({ children, className = "" }) {
  return (
    <div
      className={`bg-surface border border-border rounded-xl shadow-sm p-6 ${className}`}
    >
      {children}
    </div>
  );
}

export default Card;
