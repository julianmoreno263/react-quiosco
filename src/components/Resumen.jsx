import useQuiosco from '../hooks/useQuiosco'
import ResumenProducto from './ResumenProducto'

export default function Resumen() {

    const { pedido } = useQuiosco()

    return (
        <aside className="w-72 h-screen overflow-y-scroll p-5">
            <h1 className="text-4xl font-black">Mi Pedido</h1>
            <p className="text-lg my-5">Aquí podrás ver el resumen y totales de tu pedido</p>
            <div className="py-10">
                {pedido.length === 0 ? (
                    <p className="text-center text-2xl">No hay elementos en tu pedido aún</p>

                ) : (

                    pedido.map(producto => (
                        <ResumenProducto
                            key={producto.id}
                            producto={producto}
                        />
                    ))

                )}
            </div>

            <p className='text-xl mt-10'>Total: {''}</p>

            <form action="" className="w-full">
                <div className="mt-5">
                    <input
                        className='bg-indigo-600 hover:bg-indigo-800 px-5 py-2 rounded uppercase 
                    font-bold text-white textcenter w-full cursor-pointer'
                        type="submit"
                        value="Confirmar Pedido"
                    />
                </div>
            </form>
        </aside>
    )
}
