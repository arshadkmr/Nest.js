import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Header = () => {
    const navigate = useNavigate()

    const userInfo = localStorage.getItem('todoUser')


    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
        }
    }, [userInfo, navigate])


    const handleClick = () => {
        localStorage.removeItem('todoUser')
        navigate('/login')
    }
    return (
        <>
            <header className="w-full h-24 flex justify-between rounded bg-blue-500 text-gray-300 align-bottom p-8">
                <div className="">
                    <h1 className="text-xl font-normal sm:text-4xl md:font-semibold">My ToDo</h1>
                </div>
                <button onClick={() => handleClick()} className="bg-orange-500 rounded px-3">Logout</button>
            </header>
        </>
    )
}

export default Header