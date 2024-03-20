import { createRef, useState } from "react"
import { Link } from "react-router-dom"
import clienteAxios from "../config/axios"
import Alerta from "../components/Alerta"

export default function Registro() {

    const nameRef = createRef()
    const emailRef = createRef()
    const passwordRef = createRef()
    const PasswordConfirmationRef = createRef()

    const [errores, setErrores] = useState([])

    const handleSubmit = async e => {
        e.preventDefault()

        const datos = {

            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: PasswordConfirmationRef.current.value,

        }

        try {
            const respuesta = await clienteAxios.post('/api/registro', datos)
            console.log(respuesta)
        } catch (error) {
            setErrores(Object.values(error.response.data.errors))
        }
    }



    return (

        <>
            <h1 className="text-4xl font-black">Crea tu Cuenta</h1>
            <p>Crea tu cuenta llenando el formulario</p>

            <div className="bg-white shadow-md rounded-md mt-10 px-5 py-10">
                <form onSubmit={handleSubmit} noValidate>

                    {errores ? errores.map((error, i) => <Alerta key={i}>{error}</Alerta>) : null}

                    <div className="mb-4">
                        <label htmlFor="name" className="text-late-800">Nombre:</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            className="mt-2 w-full p-3 bg-gray-50"
                            placeholder="Tu Nombre"
                            ref={nameRef}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="text-late-800">Email:</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="mt-2 w-full p-3 bg-gray-50"
                            placeholder="Tu Email"
                            ref={emailRef}

                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="text-late-800">Password:</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            className="mt-2 w-full p-3 bg-gray-50"
                            placeholder="Tu Password"
                            ref={passwordRef}

                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password_confirmation" className="text-late-800">Repetir Password:</label>
                        <input
                            type="password"
                            name="password_confirmation"
                            id="password_confirmation"
                            className="mt-2 w-full p-3 bg-gray-50"
                            placeholder="Repetir Password"
                            ref={PasswordConfirmationRef}

                        />
                    </div>

                    <input type="submit" value="Crear Cuenta"
                        className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer" />

                </form>
            </div>

            <nav className="mt-5">
                <Link to="/auth/login">
                    Ya tienes cuenta? Inicia Sesión
                </Link>
            </nav>
        </>

    )
}
