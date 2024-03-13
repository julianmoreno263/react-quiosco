import useSWR from 'swr'
import Producto from '../components/Producto'
import clienteAxios from '../config/axios'
import useQuiosco from '../hooks/useQuiosco'

export default function Inicio() {

    const { categoriaActual } = useQuiosco()

    //consulta swr
    const fetcher = () => clienteAxios('/api/productos').then(data => data.data)
    const { data, error, isLoading } = useSWR('api/productos', fetcher, {

        //este refreshInterval actualiza en el front los productos segun si estan en la bd o no,osea si un producto se acaba en la bd no debe aparecer,o aparece como cantidad 0,y entonces en el front no se deja mostrar
        refreshInterval: 1000
    })

    if (isLoading) return 'Cargando...'
    const producto = data.data.filter(producto => producto.categoria_id === categoriaActual.id)

    return (
        <>
            <h1 className='text-4xl font-black'>{categoriaActual.nombre}</h1>
            <p className='text-2xl my-10'>Elige y personaliza tu pedido a continuación</p>

            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                {producto.map(producto => (

                    <Producto
                        key={producto.imagen}
                        producto={producto}
                    />
                ))}
            </div>
        </>
    )
}
