import { Outlet } from "react-router-dom"
import Resumen from "../components/Resumen"
import Sidebar from "../components/Sidebar"

export default function Layout() {
    return (
        <div className="md:flex">
            <Sidebar />

            <main className="flex-1">
                <Outlet />
            </main>

            <Resumen />
        </div>
    )
}
