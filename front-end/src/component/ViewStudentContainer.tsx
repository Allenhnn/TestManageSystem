import { use, useEffect, useRef, useState } from "react";
import NavbarComponent from "../component/NavbarComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faFile } from '@fortawesome/free-solid-svg-icons'

import TestFile from "../json/userUploadTestFile.json";

// type
import type { _EditType } from "../types/_EditType";
import type { _CommonType } from "../types/_CommonType";


type stateType = {
    viewData: _EditType,
    // EditViewData: _EditType,
    viewFrameState: number,
    setViewFrameState: React.Dispatch<React.SetStateAction<number>>,
    imageURL : string
}



const ViewStudentContainer = ({  imageURL,viewData, viewFrameState, setViewFrameState }: stateType) => {
    return (
        <div className={`viewStudentDetailContainer greyBG ${viewFrameState == 0 ? "op0" : ""}`}>
            <div className="viewStudentDetail">
                <div className="viewStudentTitle">
                    <div className="Viewicon"><FontAwesomeIcon icon={faEye} /></div>
                    <h4>編輯學生檔案 - {viewData.insertFile[0]["中文姓名"]}</h4>
                </div>

                <div className="line" />

                <div className="viewStudentContent">
                    {viewFrameState == 1 ?
                        <>
                            <div className="allCenter">
                                <div className="studentImageContainer"><img src={imageURL} alt="" /></div>
                                <div className="topside" >
                                    <div className="viewStudentColumn deco">
                                        <div className="viewStudentItem">
                                            <div className="viewStudentName">
                                                <h4>*中文姓名</h4>
                                                <input type="text" disabled value={viewData["insertFile"][0]["中文姓名"]} />
                                            </div>

                                        </div>
                                        <div className="viewStudentItem">
                                            <div className="viewStudentName">
                                                <h4> *英文姓名</h4>
                                                <input type="text" disabled value={viewData["insertFile"][0]["英文姓名"]} />
                                            </div>

                                        </div>
                                    </div>

                                    <div className="viewStudentColumn decoR">
                                        <div className="viewStudentItem">

                                            <div className="viewStudentName">
                                                <h4> *身分證字號</h4>
                                                <input type="text" disabled value={viewData["insertFile"][0]["身分證號碼"]} />
                                            </div>
                                        </div>
                                        <div className="viewStudentItem">
                                            <div className="viewStudentName">
                                                <h4> *出生日期</h4>
                                                <input type="date" disabled value={viewData["insertFile"][0]["出生日期"]} />
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bottomSide">
                                <div className="viewStudentColumn">
                                    <div className="viewStudentItem">
                                        <div className="viewStudentName">
                                            <h4> *通訊地址</h4>
                                            <input type="text" disabled value={viewData["insertFile"][0]["通訊地址"]} />
                                        </div>

                                    </div>
                                    <div className="viewStudentItem">
                                        <div className="viewStudentName">
                                            <h4> *戶籍地址</h4>
                                            <input type="text" disabled value={viewData["insertFile"][0]["戶籍地址"]} />
                                        </div>

                                    </div>
                                </div>
                                <div className="viewStudentColumn">
                                    <div className="viewStudentItem">
                                        <div className="viewStudentName">
                                            <h4> *聯絡電話</h4>
                                            <input type="text" disabled value={viewData["insertFile"][0]["聯絡電話(住宅)"]} />
                                        </div>

                                    </div>
                                    <div className="viewStudentItem">
                                        <div className="viewStudentName">
                                            <h4> *行動電話</h4>
                                            <input type="text" disabled value={viewData["insertFile"][0]["聯絡電話(手機)"]} />
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </>
                        :
                        <>
                            <>

                                <div className="fillInData">
                                    <div className="fillInTestData">
                                        {TestFile.map((element, index) => (
                                            <div className="viewStudentColumn" key={`viewStudentColumn-${index}`}>
                                                {element.registerName.map((label, index) => {
                                                    const key = label as keyof _CommonType;
                                                    return (
                                                        <div key={`element-${index}-label`} className={`viewStudentItem ${element.registerCount == 2 ? "split" : element.registerCount == 3 ? "triple" : ""} `}>
                                                            <div className="viewStudentName">
                                                                <h4>*{element.registerName[0]}</h4>
                                                                <input type="text"  disabled value={viewData["insertFile"][0][key]} />
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                                }
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </>
                        </>
                    }



                </div>

                <div className="functionBtnContainer">
                    {

                        viewFrameState == 1 ?
                            <>
                                <div className="functionBtn" onClick={() => setViewFrameState(0)}>
                                    關 閉
                                </div>
                                <div className="functionBtn" onClick={() => setViewFrameState(viewFrameState + 1)}>
                                    下一頁
                                </div>
                            </>
                            :
                            <div className="functionBtn" onClick={() => setViewFrameState(viewFrameState - 1)}>
                                上一頁
                            </div>
                    }
                </div>

            </div>
        </div>
    )
}
export default ViewStudentContainer;