import { createContext, ReactNode, useEffect, useState } from "react";
import { Task } from "../entities/Task";
import { tasksServices } from "../services/api";

export interface TaskContextData {
  tasks: Task[];
  createTask: (attributes: Omit<Task, "id">) => Promise<void>;
  updateTasks: (
    id: string,
    attributes: Partial<Omit<Task, "id">>
  ) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
}

export const TasksContext = createContext({} as TaskContextData);

interface TasksContextsProviderProps {
  children: ReactNode;
}

export const TasksContextsProvider: React.FC<TasksContextsProviderProps> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    tasksServices.fetchTasks().then((storedTasks) => setTasks(storedTasks));
  }, []);

  const createTask = async (attributes: Omit<Task, "id">) => {
    const newTask = await tasksServices.createTask(attributes);
    setTasks((state) => {
      const updatedTasks = [...state, newTask];
      return updatedTasks;
    });
  };

  const updateTasks = async (
    id: string,
    attributes: Partial<Omit<Task, "id">>
  ) => {
    await tasksServices.updateTask(id, attributes);
    setTasks((state) => {
      const updatedTasks = [...state];
      const taskIndex = updatedTasks.findIndex((e) => e.id === id);
      Object.assign(updatedTasks[taskIndex], attributes);
      return updatedTasks;
    });
  };

  const deleteTask = async (id: string) => {
    await tasksServices.deleteTask(id);
    setTasks((state) => {
      const removedTasks = state.filter((e) => e.id !== id);
      return removedTasks;
    });
  };


  return (
    <TasksContext.Provider
      value={{ tasks, createTask, updateTasks, deleteTask }}
    >
      {children}
    </TasksContext.Provider>
  );
};
