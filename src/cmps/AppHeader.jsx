import { NavLink } from "react-router-dom"

export function AppHeader() {
    return (
        <header className="app-header full main-layout">
            <section className="header-container">
                <nav className="app-nav">
                    <NavLink to="/" >Home</NavLink>
                    <NavLink to="/toy" >Toys</NavLink>
                    <NavLink to="/about" >About</NavLink>
                </nav>
                <h1>Mister Toy App</h1>
            </section>
        </header>
    )
}
