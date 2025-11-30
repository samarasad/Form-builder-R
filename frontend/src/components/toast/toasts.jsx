const Toast = ({ type, title, message }) => {
  return (
    <div
      className={`p-4 rounded-md mb-3 text-white ${
        type === "success" ? "bg-green-900" : "bg-red-900"
      }`}
    >
      <p className="font-semibold">{title}</p>

      {/* 🔥 allows multi-line error messages */}
      <p className="text-sm opacity-90 whitespace-pre-line">
        {message}
      </p>
    </div>
  );
};

export default Toast;
