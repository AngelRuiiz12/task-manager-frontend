function Input({ label, id, className = "", ...props }) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-text-muted">
          {label}
        </label>
      )}
      <input
        id={id}
        className={`border border-border rounded-lg p-2 text-text focus:outline-none focus:ring-2 focus:ring-accent ${className}`}
        {...props}
      />
    </div>
  );
}

export default Input;
