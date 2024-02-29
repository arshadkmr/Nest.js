
import { useCallback, useEffect, useState } from "react"
import { deleteTask, getTask, insertTask, updateTask } from "../../action/userAction"
import Header from "../header/Header"
import toast, { Toaster } from 'react-hot-toast';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';


const Home = () => {

    const [visibleTask, setVisibleTask] = useState(false)
    const [task, setTask] = useState('');
    const [error, setError] = useState('');
    const [taskList, setTaskList] = useState(null)
    const [option, setOption] = useState('Pending')
    const [render, setRender] = useState(0)

    const fetchTask = async () => {
        try {
            const res = await getTask();
            if (res.status === 200) {
                setTaskList(res.data.tasks);
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    useEffect(() => {
        fetchTask()
    }, [visibleTask, render])

    const handleChange = (e) => {
        setTask(e.target.value)
        setError('');
    }

    const handleDelete = (id) => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className="m-5 p-10">
                        <div className='custom-ui '>
                            <h1 className='text-center'>Are you sure?</h1>
                            <p className='text-center mb-5'>You want to delete this task?</p>
                            <div className='flex justify-between'>
                                <button onClick={onClose} className='bg-green-600/80 tex-gray-500 rounded w-20'>No</button>
                                <button className='bg-red-600/80 tex-gray-500 rounded w-28'
                                    onClick={async () => {
                                        const res = await deleteTask(id);
                                        if (res.data.task) {
                                            toast.success('Task deleted successfully')
                                        } else {
                                            toast.error('Task deletion failed')
                                        }
                                        setRender(render + 1)
                                        onClose()
                                    }}>Yes, Delete !
                                </button>
                            </div>
                        </div>
                    </div>
                );
            }
        })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (task.trim() === '') {
            setError('Task cannot be empty');
            return;
        }

        const res = await insertTask(task);
        if (res.status !== 201) {
            toast.error(res.data.message)
        } else {
            toast.success('Task added successfully')
            setVisibleTask(false)
            setOption('Pending')
        }
        setTask('');
        setError('');
    };

    const handleComplete = useCallback(
        async (id) => {
            try {
                const res = await updateTask(id);
                if (res.status === 200) {
                    toast.success('Task completed successfully');
                    setOption('Completed')
                    setRender(render - 1)
                } else {
                    toast.error(res.data.message);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }, [render]);

    let list

    if (option === 'Completed') {
        list = taskList?.filter(item => item.completed === true)
    } else {
        list = taskList?.filter(item => item.completed === false)
    }

    return (
        <>
            <Header />
            <Toaster toastOptions={{ duration: 2000 }} />
            {visibleTask ? (
                <>
                    <div className="m-28 ">
                        <form className="bg-gray-200 p-4 rounded-md shadow-md">
                            <h2 className="text-2xl text-center font-semibold mb-4">Add a Task</h2>
                            <div className="my-8 mx-28 p-5">
                                {error && <p className="text-red-600 text-center">{error}</p>}
                                <input
                                    type="text"
                                    placeholder="Task"
                                    className="w-full p-2 mt-2 rounded-md outline-blue-600"
                                    value={task}
                                    onChange={(e) => handleChange(e)}
                                />
                            </div>
                            <div className="flex flex-col sm:flex-row justify-center gap-5 mb-3">
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white rounded-md px-4 py-2"
                                    onClick={handleSubmit}
                                >
                                    Add Task
                                </button>
                                <button
                                    type="submit"
                                    className="bg-red-500 text-white rounded-md px-4 py-2"
                                    onClick={() => setVisibleTask(false)}
                                >
                                    cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </>
            ) : (
                <>
                    <main className="bg-slate-100 p-4">
                        <div className="flex flex-col sm:flex-row sm:gap-24 justify-center items-center p-2">
                            <div className="mx-10 my-4 w-full sm:w-1/4 pt-3 align-middle">
                                <select
                                    id="category"
                                    name="category"
                                    value={option ?? ''}
                                    onChange={(e) => setOption(e.target.value)}
                                    autoComplete=""
                                    className="w-full px-2 h-8 rounded-md border-1 border-indigo-300 focus:ring-1 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                >
                                    <option>Pending</option>
                                    <option>Completed</option>
                                </select>
                            </div>
                            <div>
                                <button
                                    className="w-full rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50"
                                    onClick={() => setVisibleTask(true)}
                                >
                                    Add Task
                                </button>
                            </div>
                        </div>
                    </main>
                    <hr />
                    <div className="mt-5 px-5 ">
                        {list?.length > 0 ? (
                            <ul className="divide-y divide-gray-100 mx-auto my-8 sm:mx-28">
                                {list?.map((item, index) =>
                                    <li key={index} className="p-10 bg-white shadow-md rounded-md mb-5">
                                        <div className="flex flex-col sm:flex-row items-center justify-between">
                                            <div className="flex items-center gap-x-4 mb-2 sm:mb-0">
                                                <div className="min-w-0 flex-auto">
                                                    <p className="my-1 truncate text-lg font-semibold leading-5 text-gray-500"><span className="font-bold">Task : </span> {item?.task}</p>
                                                    <p className="text-lg font-semibold leading-6 text-gray-500"><span className='text-gray-900'></span>{item?.createdAt}</p>
                                                </div>
                                            </div>
                                            <div className="flex sm:flex-col flex-row justify-between gap-2">
                                                {item?.completed === false && <button onClick={() => handleComplete(item._id)} className="rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50">Done</button>}
                                                <button onClick={() => handleDelete(item._id)} className="rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50">Delete</button>
                                            </div>
                                        </div>
                                    </li>
                                )}
                            </ul>
                        ) : (
                            <h1 className="text-2xl font-bold text-center text-red-600"> NO TASK FIND..!!</h1>
                        )}
                    </div>
                </>
            )}
        </>
    )
}

export default Home