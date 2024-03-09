
import { createContext, useState } from "react"
import { toast } from "react-toastify"
import { categorias as categoriasDB } from "../data/categorias"


const QuioscoContext = createContext()

const QuioscoProvider = ({ children }) => {


    const [categorias, setCategorias] = useState(categoriasDB)
    const [categoriaActual, setCategoriaActual] = useState(categorias[0])
    const [modal, setModal] = useState(false)
    const [producto, setProducto] = useState({})
    const [pedido, setPedido] = useState([])



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

    const handleAgregarPedido = ({ categoria_id, imagen, ...producto }) => {

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
                handleAgregarPedido
            }}

        >{children}</QuioscoContext.Provider>
    )
}

export { QuioscoProvider }

export default QuioscoContext 