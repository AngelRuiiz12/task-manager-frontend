function Badge({ children, variant = "default" }) {
  const variants = {
    default: "bg-gray-100 text-text-muted",
    success: "bg-success-bg text-success",
    warning: "bg-warning-bg text-warning",
    danger: "bg-danger-bg text-danger",
  };

  return (
    <span
      className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${variants[variant]}`}
    >
      {children}
    </span>
  );
}

export default Badge;
