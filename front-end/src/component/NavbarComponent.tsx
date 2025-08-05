import { Link } from "react-router-dom";
import { FontAwesomeIcon  } from "@fortawesome/react-fontawesome";
import { faGear, faUserCircle } from '@fortawesome/free-solid-svg-icons'

const NavbarComponent = () =>{
    return(

            <div className="navbarContainer">
                <div className="navbarLogo">
                    <div className="icon"><FontAwesomeIcon icon={faGear} /></div>
                    <h4 className="text">桃竹檢定管理系統</h4>
                </div>

                <Link to="/loginFrame">
                <button className="navbarButton">
                    <div className="icon"><FontAwesomeIcon icon={faUserCircle} /></div>
                    <h4 className="text">會員登出</h4>
                </button>
                </Link>
            </div>

    )
}

export default NavbarComponent;