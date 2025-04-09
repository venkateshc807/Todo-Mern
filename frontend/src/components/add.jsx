import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Add() {
    const [newTask, setNewTask] = useState("");
    const [newStatus, setNewStatus] = useState("");
    const [newDeadline, setNewDeadline] = useState("");
    const [isDarkMode, setIsDarkMode] = useState(false);
    const navigate = useNavigate();

    const addTask = (e) => {
        e.preventDefault();
        if (!newTask || !newStatus || !newDeadline) {
            alert("All fields must be filled out.");
            return;
        }

        axios.post('https://todo-mern-e6kr.onrender.com/addTodoList', {
            task: newTask,
            status: newStatus,
            deadline: newDeadline
        })
        .then(() => {
            alert("Task added successfully!");
            setNewTask("");
            setNewStatus("");
            setNewDeadline("");
            navigate("/");
        })
        .catch(console.error);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className={`min-h-screen flex items-center justify-center transition-colors duration-500 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-[#e07a5f] text-gray-900'} p-4`}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className={`shadow-2xl rounded-3xl p-6 w-full max-w-xl ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white/90 backdrop-blur'}`}
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-3xl font-bold drop-shadow">Add New Task</h2>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-black text-white px-4 py-2 rounded-xl shadow"
                        onClick={() => setIsDarkMode(!isDarkMode)}
                    >
                        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                    </motion.button>
                </div>
                <form onSubmit={addTask} className="space-y-6">
                    <div>
                        <label className="block font-semibold mb-1">Task</label>
                        <input
                            className="w-full border border-gray-300 rounded-xl px-4 py-2 shadow-sm"
                            type="text"
                            placeholder="Enter Task"
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block font-semibold mb-1">Status</label>
                        <select
                            className={`w-full border border-gray-300 rounded-xl px-4 py-2 shadow-sm ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
                            value={newStatus}
                            onChange={(e) => setNewStatus(e.target.value)}
                        >
                            <option value="">Select Status</option>
                            <option value="Pending">Pending</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>
                    <div>
                        <label className="block font-semibold mb-1">Deadline</label>
                        <input
                            className="w-full border border-gray-300 rounded-xl px-4 py-2 shadow-sm"
                            type="datetime-local"
                            value={newDeadline}
                            onChange={(e) => setNewDeadline(e.target.value)}
                        />
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="bg-green-600 hover:bg-green-700 transition text-white px-6 py-2 rounded-xl shadow-md w-full"
                    >
                        Add Task
                    </motion.button>
                </form>
            </motion.div>
        </motion.div>
    );
}

export default Add;
