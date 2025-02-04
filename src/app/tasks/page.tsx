/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from "react";
import { Task } from "@/types/task";
import ListItem from "./components/ListItem";
import AddItem from "./components/AddItem";
import axios from "axios";
import errorToast from "@/utils/errorToast";
import Loading from "@/components/activityIndicators/Loading";

function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [focussedTaskId, setFocussedTaskId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const addTask = async ({ title, completed }: Omit<Task, "id">) => {
    const id = crypto.randomUUID();
    const newTask = { id, title, completed: !!completed };

    // Optimistically update the UI
    setTasks([...tasks, newTask]);
    setFocussedTaskId(id);

    // Then attempt to update the server
    try {
      await axios.post("api/tasks", newTask);
    } catch (error) {
      errorToast("An error occurred while adding the task");

      // remove the errored task from the UI
      const updatedTasks = tasks.filter((task) => id !== task.id);
      setTasks(updatedTasks);
    }
  };

  const updateTaskTitle = async ({ id, title }: Pick<Task, "id" | "title">) => {
    const task = tasks.find((task) => task.id === id);
    if (!task) return;

    const oldTitle = task.title;
    if (title === oldTitle) return;

    // Optimistically update the UI
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, title } : task
    );
    setTasks(updatedTasks);

    // Then attempt to update the server
    try {
      await axios.put(`api/tasks/${id}`, { title });
    } catch (error) {
      errorToast("An error occurred while updating the task");

      // revert the title change
      const updatedTasks = tasks.map((task) =>
        task.id === id ? { ...task, title: oldTitle } : task
      );
      setTasks(updatedTasks);
    }
  };

  const deleteTask = async (id: string) => {
    const oldTasks = tasks;

    // Optimistically update the UI
    const updatedTasks = tasks.filter((task) => id !== task.id);
    setTasks(updatedTasks);

    // Then attempt to update the server
    try {
      await axios.delete(`api/tasks/${id}`);
    } catch (error) {
      errorToast("An error occurred while deleting the task");

      // add the task back to the UI
      setTasks(oldTasks);
    }
  };

  const toggleTaskCompletion = async (id: string) => {
    const oldTasks = tasks;

    const task = tasks.find((task) => task.id === id);
    const newCompletionStatus = !task?.completed;

    // Optimistically update the UI
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: newCompletionStatus } : task
    );
    setTasks(updatedTasks);

    // Then attempt to update the server
    try {
      await axios.put(`api/tasks/${id}`, { completed: newCompletionStatus });
    } catch (error) {
      errorToast("An error occurred while updating the task");

      // add the task back to the UI
      setTasks(oldTasks);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios("api/tasks");
        const tasks = response.data;
        setTasks(tasks);
      } catch (error) {
        errorToast("Failed to retrieve tasks");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const incompleteTasks = tasks.filter((task) => !task.completed);

  const completedTasks = tasks.filter((task) => task.completed);

  if (loading) {
    return <Loading />;
  }

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
