import { useEffect, useState } from "react";
import Delete from "@/components/buttons/Delete";
import { Task } from "@/types/task";
import CheckBox from "@/components/inputs/Checkbox";
import TextInput from "@/components/inputs/Text";

interface Props {
  task: Task;
  index: number;
  focussed: boolean;
  setFocussed: () => void;
  toggleTaskCompletion: () => void;
  updateTaskTitle: (title: string) => void;
  deleteTask: () => void;
  onEnter: () => void;
}

export default function ListItem({
  task,
  index,
  focussed,
  setFocussed,
  toggleTaskCompletion,
  updateTaskTitle,
  deleteTask,
  onEnter,
}: Props) {
  const [title, setTitle] = useState(task.title);

  useEffect(() => {
    setTitle(task.title);
  }, [task]);

  return (
    <li key={index} className="flex items-center mb-2">
      <CheckBox checked={task.completed} onChange={toggleTaskCompletion} />
      <span className="flex-1">
        <TextInput
          value={title}
          setValue={setTitle}
          onFocus={setFocussed}
          onBlur={() => updateTaskTitle(title)}
          autoFocus={focussed}
          onEnter={onEnter}
          strikeThrough={task.completed}
        />
      </span>
      {focussed && (
        <Delete
          onClick={deleteTask}
          color={task.completed ? "grey" : "white"}
        />
      )}
    </li>
  );
}
