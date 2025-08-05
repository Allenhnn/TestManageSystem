import NavbarComponent from "../component/NavbarComponent";
import { FontAwesomeIcon  } from "@fortawesome/react-fontawesome";
import { faCircleHalfStroke , faDatabase, faDownload, faGear, faMagnifyingGlass, faPrint, faUser } from '@fortawesome/free-solid-svg-icons'
import SwiperCarousel from '../component/SwiperCarousel.tsx';
import { useState } from "react";
const DataFrame = () => {
    const [currentPage , setCurrentPage] = useState("");
    return (
        <div className="DataFrameContainer">
            <div className="innerContainer">
                <NavbarComponent />
                <div className="bottomContainer">
                    <div className="leftSideContainer">
                        <div className="selectionComponent">
                            <div className="itemContainer ">
                                
                                <div className="allCenter item"><div className="decoration"><FontAwesomeIcon icon={faUser} /></div><h4>報名登錄</h4></div>
                                <div className="allCenter item"><div className="decoration"><FontAwesomeIcon icon={faDatabase} /></div><h4>報名資料</h4></div>
                                <div className="allCenter item"><div className="decoration"><FontAwesomeIcon icon={faPrint} /></div><h4>資料列印</h4></div>
                                <div className="allCenter item"><div className="decoration"><FontAwesomeIcon icon={faMagnifyingGlass} /></div><h4>代碼查詢</h4></div>
                                {/* <a href=""><div className="allCenter"><div className="decoration"><FontAwesomeIcon icon={faDownload} /></div><h4>下載範本</h4></div></a> */}
                            </div>
                            <div className="line" />
                            <div className="settingContainer">
                                <a href=""><div className="allCenter"><div className="decoration"><FontAwesomeIcon icon={faGear} /></div><h4>設 定</h4></div></a>
                            </div>
                            
                        </div>
                        {/* <div className="functionComponent">
                            <div className="icon"><FontAwesomeIcon icon={faCircleHalfStroke} /></div>
                            <div className="icon"><FontAwesomeIcon icon={faUser} /></div>

                        </div> */}
                    </div>
                    <div className="rightSideContainer">
                        <div>
                            <h2>報名登錄</h2>

                            <div className="progressionContainer">
                                <div className="progression">
                                    <div className="progression_percent"></div>
                                </div>
                                <div className="percent_value"><h5>25%</h5></div>
                            </div>

                            <SwiperCarousel />
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default DataFrame;