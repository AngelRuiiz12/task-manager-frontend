function EmptyState({ title, description, icon: Icon }) {
  return (
    <div className="text-center py-12">
      {Icon && <Icon className="w-10 h-10 text-text-muted mx-auto mb-3" />}
      <p className="text-text font-medium">{title}</p>
      {description && (
        <p className="text-text-muted text-sm mt-1">{description}</p>
      )}
    </div>
  );
}

export default EmptyState;
