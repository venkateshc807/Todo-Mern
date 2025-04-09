// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";

// function Todo() {
//     const [todoList, setTodoList] = useState([]);
//     const [editableId, setEditableId] = useState(null);
//     const [editedData, setEditedData] = useState({ task: "", status: "", deadline: "" });
//     const [isDarkMode, setIsDarkMode] = useState(false);
//     const [filter, setFilter] = useState("All");
//     const [sortOrder, setSortOrder] = useState("asc");
//     const navigate = useNavigate();

//     useEffect(() => {
//         axios.get('https://todo-mern-e6kr.onrender.com/getTodoList')
//             .then(result => setTodoList(result.data))
//             .catch(console.error);
//     }, []);

//     const toggleEditable = (id) => {
//         const task = todoList.find(item => item._id === id);
//         if (task) {
//             setEditableId(id);
//             setEditedData({
//                 task: task.task,
//                 status: task.status,
//                 deadline: task.deadline || ""
//             });
//         }
//     };

//     const handleEditChange = (field, value) => {
//         setEditedData(prev => ({ ...prev, [field]: value }));
//     };

//     const saveEditedTask = (id) => {
//         if (!editedData.task || !editedData.status || !editedData.deadline) {
//             return alert("All fields must be filled out.");
//         }

//         axios.post(`https://todo-mern-e6kr.onrender.com/updateTodoList/${id}`, editedData)
//             .then(() => {
//                 setTodoList(prev => prev.map(task => task._id === id ? { ...task, ...editedData } : task));
//                 setEditableId(null);
//                 setEditedData({ task: "", status: "", deadline: "" });
//             })
//             .catch(console.error);
//     };

//     const deleteTask = (id) => {
//         if (window.confirm("Are you sure you want to delete this task?")) {
//             axios.delete(`https://todo-mern-e6kr.onrender.com/deleteTodoList/${id}`)
//                 .then(() => setTodoList(prev => prev.filter(task => task._id !== id)))
//                 .catch(console.error);
//         }
//     };

//     const filteredList = todoList
//         .filter(task => filter === "All" || task.status === filter)
//         .sort((a, b) => {
//             const aTime = new Date(a.deadline).getTime();
//             const bTime = new Date(b.deadline).getTime();
//             return sortOrder === "asc" ? aTime - bTime : bTime - aTime;
//         });

//     return (
//         <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.6 }}
//             className={`min-h-screen flex items-center justify-center transition-colors duration-500 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-[#e07a5f] text-gray-800'} p-6`}
//         >
//             <motion.div
//                 initial={{ scale: 0.9, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 transition={{ duration: 0.6 }}
//                 className={`shadow-2xl rounded-3xl p-8 w-full max-w-6xl ${isDarkMode ? 'bg-gray-800' : 'bg-white/90 backdrop-blur'}`}
//             >
//                 <div className="flex justify-between items-center mb-6">
//                     <h2 className="text-4xl font-extrabold drop-shadow">Todo List</h2>
//                     <div className="flex gap-3">
//                         <motion.button
//                             whileHover={{ scale: 1.05 }}
//                             whileTap={{ scale: 0.95 }}
//                             className="bg-green-600 hover:bg-green-700 transition text-white px-5 py-2 rounded-full shadow-md"
//                             onClick={() => navigate('/add')}
//                         >
//                             Add Task
//                         </motion.button>
//                         <motion.button
//                             whileHover={{ scale: 1.05 }}
//                             whileTap={{ scale: 0.95 }}
//                             className="bg-black text-white px-4 py-2 rounded-full shadow"
//                             onClick={() => setIsDarkMode(!isDarkMode)}
//                         >
//                             {isDarkMode ? 'Light Mode' : 'Dark Mode'}
//                         </motion.button>
//                     </div>
//                 </div>

//                 <div className="flex flex-wrap justify-between mb-4 gap-4">
//                     <select
//                         className="px-4 py-2 rounded shadow border border-gray-300"
//                         value={filter}
//                         onChange={(e) => setFilter(e.target.value)}
//                     >
//                         <option value="All">All</option>
//                         <option value="Pending">Pending</option>
//                         <option value="Completed">Completed</option>
//                     </select>
//                     <select
//                         className="px-4 py-2 rounded shadow border border-gray-300"
//                         value={sortOrder}
//                         onChange={(e) => setSortOrder(e.target.value)}
//                     >
//                         <option value="asc">Sort by Deadline: Asc</option>
//                         <option value="desc">Sort by Deadline: Desc</option>
//                     </select>
//                 </div>

//                 <div className="overflow-x-auto rounded-xl shadow-md">
//                     <table className="min-w-full table-auto border border-gray-300">
//                         <thead className="bg-[#3d405b] text-white">
//                             <tr>
//                                 <th className="px-4 py-3 text-left text-sm font-semibold">Task</th>
//                                 <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
//                                 <th className="px-4 py-3 text-left text-sm font-semibold">Deadline</th>
//                                 <th className="px-4 py-3 text-left text-sm font-semibold">Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             <AnimatePresence>
//                                 {filteredList.map((task) => (
//                                     <motion.tr
//                                         key={task._id}
//                                         initial={{ opacity: 0, y: 20 }}
//                                         animate={{ opacity: 1, y: 0 }}
//                                         exit={{ opacity: 0, x: -20 }}
//                                         transition={{ duration: 0.3 }}
//                                         className="hover:bg-orange-100 border-t"
//                                     >
//                                         <td className="px-4 py-2">
//                                             {editableId === task._id ? (
//                                                 <input
//                                                     type="text"
//                                                     className="w-full border border-gray-300 rounded px-2 py-1"
//                                                     value={editedData.task}
//                                                     onChange={(e) => handleEditChange("task", e.target.value)}
//                                                 />
//                                             ) : (
//                                                 <span className="font-medium">{task.task}</span>
//                                             )}
//                                         </td>
//                                         <td className="px-4 py-2">
//                                             {editableId === task._id ? (
//                                                 <input
//                                                     type="text"
//                                                     className="w-full border border-gray-300 rounded px-2 py-1"
//                                                     value={editedData.status}
//                                                     onChange={(e) => handleEditChange("status", e.target.value)}
//                                                 />
//                                             ) : (
//                                                 <span className={`font-semibold ${task.status === 'Completed' ? 'text-green-600' : 'text-yellow-700'}`}>{task.status}</span>
//                                             )}
//                                         </td>
//                                         <td className="px-4 py-2">
//                                             {editableId === task._id ? (
//                                                 <input
//                                                     type="datetime-local"
//                                                     className="w-full border border-gray-300 rounded px-2 py-1"
//                                                     value={editedData.deadline}
//                                                     onChange={(e) => handleEditChange("deadline", e.target.value)}
//                                                 />
//                                             ) : (
//                                                 <span>{task.deadline ? new Date(task.deadline).toLocaleString() : '—'}</span>
//                                             )}
//                                         </td>
//                                         <td className="px-4 py-2 flex gap-2">
//                                             {editableId === task._id ? (
//                                                 <motion.button
//                                                     whileHover={{ scale: 1.05 }}
//                                                     className="bg-green-600 hover:bg-green-700 transition text-white px-3 py-1 rounded shadow"
//                                                     onClick={() => saveEditedTask(task._id)}
//                                                 >
//                                                     Save
//                                                 </motion.button>
//                                             ) : (
//                                                 <motion.button
//                                                     whileHover={{ scale: 1.05 }}
//                                                     className="bg-blue-600 hover:bg-blue-700 transition text-white px-3 py-1 rounded shadow"
//                                                     onClick={() => toggleEditable(task._id)}
//                                                 >
//                                                     Edit
//                                                 </motion.button>
//                                             )}
//                                             <motion.button
//                                                 whileHover={{ scale: 1.05 }}
//                                                 className="bg-red-600 hover:bg-red-700 transition text-white px-3 py-1 rounded shadow"
//                                                 onClick={() => deleteTask(task._id)}
//                                             >
//                                                 Delete
//                                             </motion.button>
//                                         </td>
//                                     </motion.tr>
//                                 ))}
//                             </AnimatePresence>
//                         </tbody>
//                     </table>
//                 </div>
//             </motion.div>
//         </motion.div>
//     );
// }

// export default Todo;




import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function Todo() {
    const [todoList, setTodoList] = useState([]);
    const [editableId, setEditableId] = useState(null);
    const [editedData, setEditedData] = useState({ task: "", status: "", deadline: "" });
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [filter, setFilter] = useState("All");
    const [sortOrder, setSortOrder] = useState("asc");
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('https://todo-mern-e6kr.onrender.com/getTodoList')
            .then(result => setTodoList(result.data))
            .catch(console.error);
    }, []);

    const toggleEditable = (id) => {
        const task = todoList.find(item => item._id === id);
        if (task) {
            setEditableId(id);
            setEditedData({
                task: task.task,
                status: task.status,
                deadline: task.deadline || ""
            });
        }
    };

    const handleEditChange = (field, value) => {
        setEditedData(prev => ({ ...prev, [field]: value }));
    };

    const saveEditedTask = (id) => {
        if (!editedData.task || !editedData.status || !editedData.deadline) {
            return alert("All fields must be filled out.");
        }

        axios.post(`https://todo-mern-e6kr.onrender.com/updateTodoList/${id}`, editedData)
            .then(() => {
                setTodoList(prev => prev.map(task => task._id === id ? { ...task, ...editedData } : task));
                setEditableId(null);
                setEditedData({ task: "", status: "", deadline: "" });
            })
            .catch(console.error);
    };

    const deleteTask = (id) => {
        if (window.confirm("Are you sure you want to delete this task?")) {
            axios.delete(`https://todo-mern-e6kr.onrender.com/deleteTodoList/${id}`)
                .then(() => setTodoList(prev => prev.filter(task => task._id !== id)))
                .catch(console.error);
        }
    };

    const filteredList = todoList
        .filter(task => filter === "All" || task.status === filter)
        .sort((a, b) => {
            const aTime = new Date(a.deadline).getTime();
            const bTime = new Date(b.deadline).getTime();
            return sortOrder === "asc" ? aTime - bTime : bTime - aTime;
        });

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className={`min-h-screen flex items-center justify-center transition-colors duration-500 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-[#e07a5f] text-gray-800'} p-4`}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className={`shadow-2xl rounded-3xl p-6 w-full max-w-6xl ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white/90 backdrop-blur'} overflow-x-auto`}
            >
                <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                    <h2 className="text-3xl font-extrabold drop-shadow">Todo List</h2>
                    <div className="flex gap-3 flex-wrap justify-center">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-green-600 hover:bg-green-700 transition text-white px-5 py-2 rounded-full shadow-md"
                            onClick={() => navigate('/add')}
                        >
                            Add Task
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-black text-white px-4 py-2 rounded-full shadow"
                            onClick={() => setIsDarkMode(!isDarkMode)}
                        >
                            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                        </motion.button>
                    </div>
                </div>

                <div className="flex flex-wrap justify-between mb-4 gap-4">
                    <select
                        className={`px-4 py-2 rounded shadow border border-gray-300 ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        <option value="All">All</option>
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                    </select>
                    <select
                        className={`px-4 py-2 rounded shadow border border-gray-300 ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                    >
                        <option value="asc">Sort by Deadline: Asc</option>
                        <option value="desc">Sort by Deadline: Desc</option>
                    </select>
                </div>

                <div className="overflow-x-auto rounded-xl shadow-md">
                    <table className="min-w-full table-auto border border-gray-300">
                        <thead className="bg-[#3d405b] text-white">
                            <tr>
                                <th className="px-4 py-3 text-left text-sm font-semibold">Task</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold">Deadline</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <AnimatePresence>
                                {filteredList.map((task) => (
                                    <motion.tr
                                        key={task._id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.3 }}
                                        className="hover:bg-orange-100 border-t"
                                    >
                                        <td className="px-4 py-2">
                                            {editableId === task._id ? (
                                                <input
                                                    type="text"
                                                    className="w-full border border-gray-300 rounded px-2 py-1"
                                                    value={editedData.task}
                                                    onChange={(e) => handleEditChange("task", e.target.value)}
                                                />
                                            ) : (
                                                <span className="font-medium">{task.task}</span>
                                            )}
                                        </td>
                                        <td className="px-4 py-2">
                                            {editableId === task._id ? (
                                                <input
                                                    type="text"
                                                    className="w-full border border-gray-300 rounded px-2 py-1"
                                                    value={editedData.status}
                                                    onChange={(e) => handleEditChange("status", e.target.value)}
                                                />
                                            ) : (
                                                <span className={`font-semibold ${task.status === 'Completed' ? 'text-green-600' : 'text-yellow-700'}`}>{task.status}</span>
                                            )}
                                        </td>
                                        <td className="px-4 py-2">
                                            {editableId === task._id ? (
                                                <input
                                                    type="datetime-local"
                                                    className="w-full border border-gray-300 rounded px-2 py-1"
                                                    value={editedData.deadline}
                                                    onChange={(e) => handleEditChange("deadline", e.target.value)}
                                                />
                                            ) : (
                                                <span>{task.deadline ? new Date(task.deadline).toLocaleString() : '—'}</span>
                                            )}
                                        </td>
                                        <td className="px-4 py-2 flex flex-wrap gap-2">
                                            {editableId === task._id ? (
                                                <motion.button
                                                    whileHover={{ scale: 1.05 }}
                                                    className="bg-green-600 hover:bg-green-700 transition text-white px-3 py-1 rounded shadow"
                                                    onClick={() => saveEditedTask(task._id)}
                                                >
                                                    Save
                                                </motion.button>
                                            ) : (
                                                <motion.button
                                                    whileHover={{ scale: 1.05 }}
                                                    className="bg-blue-600 hover:bg-blue-700 transition text-white px-3 py-1 rounded shadow"
                                                    onClick={() => toggleEditable(task._id)}
                                                >
                                                    Edit
                                                </motion.button>
                                            )}
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                className="bg-red-600 hover:bg-red-700 transition text-white px-3 py-1 rounded shadow"
                                                onClick={() => deleteTask(task._id)}
                                            >
                                                Delete
                                            </motion.button>
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default Todo;
