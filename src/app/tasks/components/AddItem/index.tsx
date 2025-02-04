import Add from "@/components/buttons/Add";

interface Props {
  index: number;
  onClick: () => void;
}

export default function AddItem({ index, onClick }: Props) {
  return (
    <li key={index} className="flex items-center mb-2" onClick={onClick}>
      <Add onClick={onClick} />
      <span className={`flex-1 text-white`}>Add a new task...</span>
    </li>
  );
}
