import { useEffect, useState } from "react"
import TaskItem from "./TaskItem";

type Priority = "Urgente" | "Moyenne" | "Basse";

type Task = {
  id: number,
  text: string,
  priority: Priority
};

function App() {
  const [inputTask, setInputTask] = useState<string>("");
  const [selectPriority, setSelectPriority] = useState<Priority>("Moyenne");

  const savedTasks = localStorage.getItem("taks");
  const initialTasks = savedTasks ? JSON.parse(savedTasks) : [];

  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [filter, setFilter] = useState<Priority | "Tous">("Tous");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

   function initAddTaskForm() {
    setInputTask("");
    setSelectPriority("Moyenne");
   }

   function deleteTask(id: number) {
    const newTasks = tasks.filter(task => task.id !== id);
    setTasks(newTasks);
   };

  function addTask() {
    if (inputTask.trim() == "") {
      return
    }
    const newTask: Task = {
      id: Date.now(),
      text: inputTask.trim(),
      priority: selectPriority
    };
    const newTasks = [newTask, ...tasks];
    setTasks(newTasks);
    initAddTaskForm();
  };

  let filteredTasks: Task[] = [];

  const urgentTaskCount = tasks.filter(task => task.priority === "Urgente").length;
  const mediumTaskCount = tasks.filter(task => task.priority === "Moyenne").length;
  const lowTaskCount = tasks.filter(task => task.priority === "Basse").length;
  const tasksCount = tasks.length;

  if(filter == "Tous") {
    filteredTasks = tasks;
  } else {
    filteredTasks = tasks.filter(task => task.priority === filter)
  }
  
  return (
    <div className="flex justify-center">
      <div className="w-2/3 flex flex-col gap-4 my-15 bg-base-300 p-5 rounded-2xl">
        <div className="flex gap-4">
          <input type="text" className="input w-full" placeholder="Ajouter une tâche" value={inputTask} onChange={(e) => setInputTask(e.target.value)} />
          <select className="select w-full" value={selectPriority} onChange={(e) => setSelectPriority(e.target.value as Priority)}>
            <option value="Urgente">Urgente</option>
            <option value="Moyenne">Moyenne</option>
            <option value="Basse">Basse</option>
          </select>
          <button className="btn btn-primary" onClick={addTask}>Ajouter</button>
        </div>
        <div className="space-y-2 flex-1 h-fit">
          <div className="flex flex-wrap gap-4">
            <button className={`btn btn-soft ${filter === "Tous" ? "btn-primary" : ""}`} onClick={() => setFilter("Tous")}>Tous({tasksCount})</button>
            <button className={`btn btn-soft ${filter === "Urgente" ? "btn-primary" : ""}`} onClick={() => setFilter("Urgente")}>Urgente({urgentTaskCount})</button>
            <button className={`btn btn-soft ${filter === "Moyenne" ? "btn-primary" : ""}`} onClick={() => setFilter("Moyenne")}>Moyenne({mediumTaskCount})</button>
            <button className={`btn btn-soft ${filter === "Basse" ? "btn-primary" : ""}`} onClick={() => setFilter("Basse")}>Basse({lowTaskCount})</button>
          </div>
        </div>
        {filteredTasks.length > 0 ? (
          <ul className="divide-y divide-primary/20">
            {filteredTasks.map(task => (
              <li key={task.id}>
                <TaskItem task={task} onDelete={() => deleteTask(task.id)}/>
              </li>
            ))}
          </ul>
        ) : (
          <div>test2</div>
        )}
      </div>
    </div>
  )
}

export default App
