import { formatearDinero } from "../helpers"

export default function Producto({ producto }) {

    const { nombre, imagen, precio } = producto


    //el return en un componente es solo para mostrar informacion, si necesitamos crear logica lo hacemos antes del return, si necesitamos crear una funcion para poder usarla no solamente en este componente sino en otros,creamos en src una carpeta llamada helpers y dentro un archivo index.js donde estaran las funciones que necesitamos.
    return (
        <div className="border p-3 shadow bg-white">

            <img
                src={`/img/${imagen}.jpg`}
                alt={`imagen ${nombre}`}
                className="w-full"
            />

            <div className="p-5">
                <h3 className="text-2xl font-bold">{nombre}</h3>
                <p className="mt-5 font-black text-4xl text-amber-500">{formatearDinero(precio)}</p>

                <button className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold">
                    Agregar
                </button>
            </div>
        </div>
    )
}
