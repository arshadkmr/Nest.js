// import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../../action/userAction'
import toast, { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';


const icon = 'https://w7.pngwing.com/pngs/443/106/png-transparent-computer-icons-icon-design-hamburger-button-test-icon-others-angle-text-rectangle-thumbnail.png'


const Login = () => {
    const navigate = useNavigate()
    const userInfo = localStorage.getItem('todoUser')

    useEffect(() => {
        if (userInfo) {
            navigate('/home')
        }
    }, [userInfo, navigate])

    const initialValues = {
        email: "",
        password: ""
    }
    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid Email Address').required('Email is Required'),
        password: Yup.string().min(5).max(15).required('Password is Required')
    })
    const { values, errors, handleBlur, touched, handleChange, handleSubmit } =
        useFormik({
            initialValues,
            validationSchema: validationSchema,
            onSubmit: async (values) => {
                const res = await login(values.email, values.password)
                if (res.status !== 200) {
                    toast.error(res.data.message)
                } else {
                    toast.success('Login Successful')
                    setTimeout(() => {
                        navigate('/')
                    }, 1000);
                }
            }
        })
    return (
        <>
            <div style={{ backgroundColor: 'rgb(17 24 39)' }}>
                <Toaster toastOptions={{ duration: 1000 }} />
                <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8" >
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <img
                            className="mx-auto h-20 w-auto"
                            src={icon}
                            alt="Your Company"
                        />
                        <h2 className="mt-10 text-center text-2xl text-indigo-600 font-bold leading-9 tracking-tight" >
                            <span className='mr-3' style={{ color: 'white' }}>LOGIN  </span>
                        </h2>
                    </div>
                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                                    Email address
                                </label>
                                {errors.email && touched.email ? (
                                    <p style={{ color: "red" }}>
                                        {errors.email}
                                    </p>
                                ) : null}
                                <div className="mt-2">
                                    <input
                                        value={values.email} autoComplete='off' onChange={handleChange} onBlur={handleBlur}
                                        id="email"
                                        name="email"
                                        type="email"
                                        className="block w-full rounded-md border-0 p-2 text-white shadow-sm ring-1 ring-inset bg-gray-800 ring-gray-700 placeholder:text-gray-900 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 focus:bg-gray-800 focus:outline-none"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                                    Password
                                </label>
                                {errors.password && touched.password ? (
                                    <p style={{ color: "red" }} >
                                        {errors.password}
                                    </p>
                                ) : null}
                                <div className="mt-2">
                                    <input
                                        value={values.password} onChange={handleChange} onBlur={handleBlur}
                                        id="password"
                                        name="password"
                                        type="password"
                                        className="block w-full rounded-md border-0 p-2 text-white shadow-sm ring-1 ring-inset bg-gray-800 ring-gray-700 placeholder:text-gray-900 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 focus:bg-gray-800 focus:outline-none" />
                                </div>
                                <div className='mt-5'>
                                    <button
                                        type="submit"
                                        className="flex mb-5 w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                                    >
                                        Login
                                    </button>
                                    <Link to={'/register'} className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Create account?</Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div></>
    )
}

export default Login