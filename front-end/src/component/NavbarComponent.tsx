import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faUserCircle } from '@fortawesome/free-solid-svg-icons'

const NavbarComponent = () => {
    const handleNavigator = () => {
        fetch("http://localhost:3000/logout", {
            credentials: "include",
            method: "POST"
        })
            .then((res) => res.status === 200 ? location.href = "http://localhost:5173/loginFrame" : null);
    }
    return (

        <div className="navbarContainer">
            <div className="navbarLogo">
                <div className="icon"><FontAwesomeIcon icon={faGear} /></div>
                <h4 className="text">桃竹檢定管理系統</h4>
            </div>

            <button className="navbarButton" onClick={() => handleNavigator()}>
                <div className="icon"><FontAwesomeIcon icon={faUserCircle} /></div>
                <h4 className="text">會員登出</h4>
            </button>
        </div>

    )
}

export default NavbarComponent;