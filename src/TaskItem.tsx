import { Trash } from "lucide-react";

type Priority = "Urgente" | "Moyenne" | "Basse";

type Task = {
  id: number,
  text: string,
  priority: Priority
};

type Props = {
    task: Task
}

const TaskItem = ({task}: Props) => {
    return (
        <li className="p-3">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <input type="checkbox" className="checkbox checkbox-primary checkbox-sm"/>
                    <span className="text-md font-bold">
                        <span>{task.text}</span>
                    </span>
                    <span className={`badge badge-sm badge-soft 
                        ${task.priority === "Urgente" ? "badge-error" 
                            : task.priority === "Moyenne" ? "badge-warning" 
                            : "badge-info"}`}>
                            {task.priority}
                    </span>
                </div>
                <button className="btn btn-error btn-soft">
                        <Trash className="w-4 h-4"/>
                </button>
            </div>
        </li>
    )
}

export default TaskItem