import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Add() {
    const [newTask, setNewTask] = useState("");
    const [newStatus, setNewStatus] = useState("");
    const [newDeadline, setNewDeadline] = useState("");
    const navigate = useNavigate(); // Initialize the navigate function

    // Function to add task to the database
    const addTask = (e) => {
        e.preventDefault();
        if (!newTask || !newStatus || !newDeadline) {
            alert("All fields must be filled out.");
            return;
        }

        axios.post('http://127.0.0.1:3002/addTodoList', { task: newTask, status: newStatus, deadline: newDeadline })
            .then(res => {
                console.log(res);
                alert("Task added successfully!");
                setNewTask("");
                setNewStatus("");
                setNewDeadline("");
                navigate("/"); // Redirect to the home page
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="container mx-auto mt-10">
            <div>
                <h2 className="text-center text-2xl font-bold mb-4">Add Task</h2>
                <form className="bg-gray-100 p-6 rounded shadow">
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Task</label>
                        <input
                            className="w-full border border-gray-300 rounded px-3 py-2"
                            type="text"
                            placeholder="Enter Task"
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Status</label>
                        <input
                            className="w-full border border-gray-300 rounded px-3 py-2"
                            type="text"
                            placeholder="Enter Status"
                            value={newStatus}
                            onChange={(e) => setNewStatus(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Deadline</label>
                        <input
                            className="w-full border border-gray-300 rounded px-3 py-2"
                            type="datetime-local"
                            value={newDeadline}
                            onChange={(e) => setNewDeadline(e.target.value)}
                        />
                    </div>
                    <button
                        onClick={addTask}
                        className="bg-green-600 text-white px-4 py-2 rounded"
                    >
                        Add Task
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Add;