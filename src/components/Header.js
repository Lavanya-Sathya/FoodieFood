import logo from "../../images/logo.jpg"
const Header = ()=>{
    return(
        <div className="header">
            <div className="logo-container">
                <img src={logo} alt="logo" className="logo"/>
            </div>
            <div className="nav-items">
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Service</a></li>
                    <li><a href="#">Contact Us</a></li>
                    <li><a href="#">Cart</a></li>
                </ul>
            </div>
        </div>
    )
}

export default Header;