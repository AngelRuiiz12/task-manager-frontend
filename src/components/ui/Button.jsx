function Button({ children, variant = "primary", className = "", ...props }) {
  const base =
    "px-4 py-2 rounded-lg font-medium transition active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";

  const variants = {
    primary: "bg-accent text-white hover:bg-accent-hover",
    secondary: "bg-white border border-border text-text hover:bg-gray-50",
    danger: "bg-danger text-white hover:bg-red-700",
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}

export default Button;
