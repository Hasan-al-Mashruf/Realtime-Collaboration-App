"use client";
import React, { useState } from "react";
import { Loader2, PlusCircle } from "lucide-react";

const KanbanBoard = () => {
  const [newTask, setNewTask] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [columns, setColumns] = useState([
    { id: "todo", title: "To Do", color: "bg-gray-200" },
    { id: "inProgress", title: "In Progress", color: "bg-yellow-200" },
    { id: "done", title: "Done", color: "bg-green-200" },
  ]);

  const addTask = () => {
    if (newTask.trim()) {
      setIsAdding(true);
      setTasks([...tasks, { id: Date.now(), title: newTask, status: "todo" }]);
      setNewTask("");
      setIsAdding(false);
    }
  };

  const moveTask = (taskId, newStatus) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Kanban Board
          </h1>
          <div className="flex gap-4">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Add a new task..."
              className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyPress={(e) => e.key === "Enter" && addTask()}
            />
            <button
              onClick={addTask}
              disabled={isAdding || !newTask.trim()}
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {isAdding ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <PlusCircle className="w-5 h-5" />
              )}
              Add Task
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {columns.map((column) => (
            <div
              key={column.id}
              className={`rounded-lg border p-4 ${column.color}`}
            >
              <h2 className="text-xl font-semibold mb-4">{column.title}</h2>
              <div className="space-y-3">
                {tasks
                  .filter((task) => task.status === column.id)
                  .map((task) => (
                    <div
                      key={task.id}
                      className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
                    >
                      <p className="text-gray-800">{task.title}</p>
                      <div className="mt-3 flex gap-2">
                        {columns.map(
                          (col) =>
                            col.id !== task.status && (
                              <button
                                key={col.id}
                                onClick={() => moveTask(task.id, col.id)}
                                className="text-xs px-2 py-1 rounded bg-gray-100 hover:bg-gray-200 transition-colors"
                              >
                                Move to {col.title}
                              </button>
                            )
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KanbanBoard;
