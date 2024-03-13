
import { createContext, useState, useEffect } from "react"
import { toast } from "react-toastify"
import clienteAxios from "../config/axios"


const QuioscoContext = createContext()

const QuioscoProvider = ({ children }) => {


    const [categorias, setCategorias] = useState([])
    const [categoriaActual, setCategoriaActual] = useState({})
    const [modal, setModal] = useState(false)
    const [producto, setProducto] = useState({})
    const [pedido, setPedido] = useState([])
    const [total, setTotal] = useState(0)


    //useEffect para ir calculando el total del pedido,utilizamos el array method reduce()
    useEffect(() => {
        const nuevoTotal = pedido.reduce((total, producto) => (producto.precio * producto.cantidad) + total, 0)
        setTotal(nuevoTotal)
    }, [pedido])

    //aqui utilizamos axios y async para traer las categorias que nos envia de respuesta el backend echo en laravel,y con el useEffect() que sigue cargo las categorias apenas se carge el componente.
    const obtenerCategorias = async () => {

        try {

            const { data } = await clienteAxios('/api/categorias')
            setCategorias(data.data)
            setCategoriaActual(data.data[0])
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        obtenerCategorias()
    }, [])



    const handleClickCategoria = (id) => {

        const categoria = categorias.filter(categoria => categoria.id === id)[0]
        setCategoriaActual(categoria)
    }

    const handleClickModal = () => {

        //si modal esta en false lo cambia a true y viceversa
        setModal(!modal)
    }

    const handleSetProducto = producto => {

        setProducto(producto)
    }

    const handleAgregarPedido = ({ categoria_id, ...producto }) => {

        //setPedido es un array, si queremos agregar productos a este array no podemos utilizar el metodo push porque este metodo nos genera un nuevo array y eso modificaria el state original,eso no se puede hacer en react, entonces lo que hacemos es tomar una copia del pedido(...pedido) y agregarle un producto.

        if (pedido.some(pedidoState => pedidoState.id === producto.id)) {

            const pedidoActualizado = pedido.map(pedidoState => pedidoState.id === producto.id ? producto : pedidoState)
            setPedido(pedidoActualizado)
            toast.success('Guardado Correctamente')

        } else {
            setPedido([...pedido, producto])
            toast.success('Agregado al Pedido')
        }
    }

    const handleEditarCantidad = (id) => {

        const productoActualizar = pedido.filter(producto => producto.id === id)[0]
        setProducto(productoActualizar)
        setModal(!modal)
    }


    const handleEliminarProductoPedido = (id) => {

        const pedidoActualizado = pedido.filter(producto => producto.id !== id)
        setPedido(pedidoActualizado)
        toast.success('Eliminado del Pedido')

    }



    return (

        <QuioscoContext.Provider
            value={{

                categorias,
                categoriaActual,
                handleClickCategoria,
                modal,
                handleClickModal,
                producto,
                handleSetProducto,
                pedido,
                handleAgregarPedido,
                handleEditarCantidad,
                handleEliminarProductoPedido,
                total
            }}

        >{children}</QuioscoContext.Provider>
    )
}

export { QuioscoProvider }

export default QuioscoContext 