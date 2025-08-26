import { useState } from "react"

type Priority = "Urgente" | "Moyenne" | "Basse"

type Task = {
  id: number,
  text: string,
  priority: Priority
}

function App() {
  const [inputTask, setInputTask] = useState<string>("");
  const [selectPriority, setSelectPriority] = useState<Priority>("Moyenne");

  function addTask() {
    
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
      </div>
    </div>
  )
}

export default App
