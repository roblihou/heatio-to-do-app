interface DeleteProps {
  onClick: () => void;
}

export default function Add({ onClick }: DeleteProps) {
  return (
    <button
      onClick={onClick}
      style={{ background: "none", border: "none", padding: 0 }}
    >
      <svg
        className="mr-2 h-5 w-5 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 4v16m8-8H4"
        />
      </svg>
    </button>
  );
}
