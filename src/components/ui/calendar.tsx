export const Calendar = ({ className = "", ...props }) => {
  return (
    <input
      type="date"
      className={`w-full px-3 py-2 border rounded-md ${className}`}
      {...props}
    />
  );
};
