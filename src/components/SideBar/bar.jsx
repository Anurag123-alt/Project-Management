import { Menu } from "lucide-react"
import { userContext } from "../../userContext"
import { useContext } from "react"
function BurgerBar() {

    const { SetsidebarOpen } = useContext(userContext)
    return (
        <>
            <Menu
                onClick={() => {
                    SetsidebarOpen(true)
                }}
                style={{ transform: `translateX(-10px)` }} />
        </>
    )
}

export default BurgerBar