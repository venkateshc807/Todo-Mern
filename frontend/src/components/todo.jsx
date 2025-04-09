import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function Todo() {
    const [todoList, setTodoList] = useState([]);
    const [editableId, setEditableId] = useState(null);
    const [editedTask, setEditedTask] = useState("");
    const [editedStatus, setEditedStatus] = useState("");
    const [editedDeadline, setEditedDeadline] = useState("");
    const navigate = useNavigate(); // Initialize navigate

    // Fetch tasks from database
    useEffect(() => {
        axios.get('http://127.0.0.1:3002/getTodoList')
            .then(result => {
                setTodoList(result.data);
            })
            .catch(err => console.log(err));
    }, []);

    // Function to toggle the editable state for a specific row
    const toggleEditable = (id) => {
        const rowData = todoList.find((data) => data._id === id);
        if (rowData) {
            setEditableId(id);
            setEditedTask(rowData.task);
            setEditedStatus(rowData.status);
            setEditedDeadline(rowData.deadline || "");
        } else {
            setEditableId(null);
            setEditedTask("");
            setEditedStatus("");
            setEditedDeadline("");
        }
    };

    // Function to save edited data to the database
    const saveEditedTask = (id) => {
        const editedData = {
            task: editedTask,
            status: editedStatus,
            deadline: editedDeadline,
        };

        if (!editedTask || !editedStatus || !editedDeadline) {
            alert("All fields must be filled out.");
            return;
        }

        axios.post('http://127.0.0.1:3002/updateTodoList/' + id, editedData)
            .then(result => {
                console.log(result);
                setEditableId(null);
                setEditedTask("");
                setEditedStatus("");
                setEditedDeadline("");
                window.location.reload();
            })
            .catch(err => console.log(err));
    };

    // Function to delete a task from the database
    const deleteTask = (id) => {
        if (window.confirm("Are you sure you want to delete this task?")) {
            axios.delete(`http://127.0.0.1:3002/deleteTodoList/${id}`)
                .then(result => {
                    console.log(result);
                    setTodoList(todoList.filter((task) => task._id !== id)); // Remove the task from the list
                })
                .catch(err => console.log(err));
        }
    };

    return (
        <div className="container mx-auto mt-10">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Todo List</h2>
                <button
                    className="bg-green-600 text-white px-4 py-2 rounded"
                    onClick={() => navigate('/add')} // Navigate to Add Task page
                >
                    Add Task
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead className="bg-blue-500 text-white">
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">Task</th>
                            <th className="border border-gray-300 px-4 py-2">Status</th>
                            <th className="border border-gray-300 px-4 py-2">Deadline</th>
                            <th className="border border-gray-300 px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    {Array.isArray(todoList) ? (
                        <tbody>
                            {todoList.map((data) => (
                                <tr key={data._id} className="hover:bg-gray-100">
                                    <td className="border border-gray-300 px-4 py-2">
                                        {editableId === data._id ? (
                                            <input
                                                type="text"
                                                className="w-full border border-gray-300 rounded px-2 py-1"
                                                value={editedTask}
                                                onChange={(e) => setEditedTask(e.target.value)}
                                            />
                                        ) : (
                                            data.task
                                        )}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {editableId === data._id ? (
                                            <input
                                                type="text"
                                                className="w-full border border-gray-300 rounded px-2 py-1"
                                                value={editedStatus}
                                                onChange={(e) => setEditedStatus(e.target.value)}
                                            />
                                        ) : (
                                            data.status
                                        )}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {editableId === data._id ? (
                                            <input
                                                type="datetime-local"
                                                className="w-full border border-gray-300 rounded px-2 py-1"
                                                value={editedDeadline}
                                                onChange={(e) => setEditedDeadline(e.target.value)}
                                            />
                                        ) : (
                                            data.deadline ? new Date(data.deadline).toLocaleString() : ''
                                        )}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {editableId === data._id ? (
                                            <button
                                                className="bg-green-600 text-white px-3 py-1 rounded mr-2"
                                                onClick={() => saveEditedTask(data._id)}
                                            >
                                                Save
                                            </button>
                                        ) : (
                                            <button
                                                className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                                                onClick={() => toggleEditable(data._id)}
                                            >
                                                Edit
                                            </button>
                                        )}
                                        <button
                                            className="bg-red-500 text-white px-3 py-1 rounded"
                                            onClick={() => deleteTask(data._id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    ) : (
                        <tbody>
                            <tr>
                                <td colSpan="4" className="text-center py-4">Loading tasks...</td>
                            </tr>
                        </tbody>
                    )}
                </table>
            </div>
        </div>
    );
}

export default Todo;