"use client";

import { useState, useEffect } from "react";
import { Task } from "@/types/task";
import ListItem from "./components/ListItem";
import AddItem from "./components/AddItem";
import axios from "axios";

function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [focussedTaskId, setFocussedTaskId] = useState<string | null>(null);

  const addTask = async ({ title, completed }: Omit<Task, "id">) => {
    const uuid = crypto.randomUUID();
    const newTask = { id: uuid, title, completed: !!completed };

    // Optimistically update the UI
    setTasks([...tasks, newTask]);
    setFocussedTaskId(uuid);

    // Then update the server
    try {
      await axios.post("api/tasks", newTask);
    } catch (error) {
      console.log("IN error block!");
      // console.log(error);
      // TODO: Handle error
    }
  };

  const updateTaskTitle = ({ id, title }: Pick<Task, "id" | "title">) => {};

  const deleteTask = (id: string) => {};

  const toggleTaskCompletion = (id: string) => {};

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios("api/tasks");
      const result = response.data;
      setTasks(result);
    };
    fetchData();
  }, []);

  const incompleteTasks = tasks.filter((task) => !task.completed);

  const completedTasks = tasks.filter((task) => task.completed);

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-heatio-tile-blue rounded-lg shadow-lg border border-heatio-border-blue">
      <h1 className="text-2xl font-bold mb-4 text-white">
        Heat Pump Installation Tasks
      </h1>
      <div>
        <ul>
          {incompleteTasks.map((task, index) => (
            <ListItem
              key={task.id}
              task={task}
              index={index}
              toggleTaskCompletion={() => toggleTaskCompletion(task.id)}
              deleteTask={() => deleteTask(task.id)}
              focussed={focussedTaskId === task.id}
              setFocussed={() => setFocussedTaskId(task.id)}
              updateTaskTitle={(newTitle: string) =>
                updateTaskTitle({
                  id: task.id,
                  title: newTitle,
                })
              }
              onEnter={() => addTask({ title: "", completed: false })}
            />
          ))}
          <AddItem
            index={incompleteTasks.length}
            onClick={() => addTask({ title: "", completed: false })}
          />
        </ul>
      </div>
      <div className="mt-4">
        {completedTasks.length > 0 && (
          <h2 className="text-xl font-semibold mb-2 text-white">Completed</h2>
        )}

        <ul>
          {completedTasks.map((task, index) => (
            <ListItem
              key={task.id}
              task={task}
              index={index}
              toggleTaskCompletion={() => toggleTaskCompletion(task.id)}
              focussed={focussedTaskId === task.id}
              setFocussed={() => setFocussedTaskId(task.id)}
              updateTaskTitle={(newTitle: string) =>
                updateTaskTitle({
                  id: task.id,
                  title: newTitle,
                })
              }
              deleteTask={() => deleteTask(task.id)}
              onEnter={() => addTask({ title: "", completed: true })}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Tasks;
