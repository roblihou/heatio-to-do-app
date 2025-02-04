interface Props {
  checked: boolean;
  onChange: () => void;
}

export default function CheckBox({ checked, onChange }: Props) {
  return (
    <div className="relative flex items-center justify-center h-full">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="mr-2 appearance-none h-5 w-5 border border-heatio-accent-blue rounded-sm bg-transparent focus:outline-none"
      />
      <svg
        className={`absolute w-4 h-4 top-0.5 left-0.5 pointer-events-none peer-checked:block ${
          checked ? "block" : "hidden"
        }`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    </div>
  );
}
