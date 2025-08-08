import { useEffect, useRef, useState } from "react";
import NavbarComponent from "../component/NavbarComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faFile, faPen } from '@fortawesome/free-solid-svg-icons'
import Select from "react-select";
import TestFile from "../json/userUploadTestFile.json";
// type
import type { _EditType } from "../types/_EditType";
import type { _CommonType } from "../types/_CommonType";

type stateType = {

    submitEditData: Function,
    EditViewData: _EditType | any,
    editFrameState: number,
    editphotoRef: any,
    setEditFrameState: React.Dispatch<React.SetStateAction<number>>
    setEditViewData: React.Dispatch<React.SetStateAction<_EditType>>
    setImageURL: React.Dispatch<React.SetStateAction<string>>
    imageURL: string
}

type selectType = {
    value: string,
    label: string
}


const EditViewStudentContainer = ({ editphotoRef, setImageURL, imageURL, setEditViewData, submitEditData, EditViewData, editFrameState, setEditFrameState }: stateType) => {
    const [editing, setEditing] = useState(false);
    // console.log(EditViewData?.insertFile?.[0]?.["檢定區別"]);

    const changeImg = () => {
        editphotoRef.current ? editphotoRef.current.click() : null;
    }

    const checkEditCls = () => {

        setEditFrameState(0);
    }
    return (
        <div className={`viewStudentDetailContainer ${editFrameState == 0 ? "op0" : ""}`}>
            <div className="viewStudentDetail">
                <div className="viewStudentTitle">
                    <div className="Viewicon"><FontAwesomeIcon icon={faPen} /></div>
                    <h4>編輯學生檔案 - {EditViewData.insertFile[0]["中文姓名"]}</h4>
                </div>

                <div className="line" />

                <div className="viewStudentContent">
                    {editFrameState == 1 ?
                        <>
                            <div className="allCenter">
                                <div className="studentImageContainer">
                                    <div className="imageContainer">
                                        <img src={imageURL} alt="" onClick={() => changeImg()} />
                                    </div>
                                    <h5>( 點擊編輯照片 )</h5>
                                </div>
                                <div className="topside" >
                                    <div className="viewStudentColumn deco">
                                        <div className="viewStudentItem">
                                            <div className="viewStudentName">
                                                <h4>*中文姓名</h4>
                                                <input type="text" value={EditViewData["insertFile"][0]["中文姓名"]} onChange={(e) => {
                                                    setEditing(true);
                                                    const value = e.target.value;
                                                    setEditViewData((prev) => ({
                                                        ...prev,
                                                        "insertFile": [
                                                            {
                                                                ...prev.insertFile[0],
                                                                ["中文姓名"]: value,
                                                            },
                                                            {
                                                                ...prev.insertFile[1],
                                                            }
                                                        ]
                                                    }))
                                                }} />
                                            </div>

                                        </div>
                                        <div className="viewStudentItem">
                                            <div className="viewStudentName">
                                                <h4> *英文姓名</h4>
                                                <input type="text" value={EditViewData["insertFile"][0]["英文姓名"]} onChange={(e) => {
                                                    setEditing(true);
                                                    const value = e.target.value;
                                                    setEditViewData((prev) => ({
                                                        ...prev,
                                                        "insertFile": [
                                                            {
                                                                ...prev.insertFile[0],
                                                                ["英文姓名"]: value,
                                                            },
                                                            {
                                                                ...prev.insertFile[1],
                                                            }
                                                        ]
                                                    }))
                                                }} />
                                            </div>

                                        </div>
                                    </div>

                                    <div className="viewStudentColumn decoR">
                                        <div className="viewStudentItem">

                                            <div className="viewStudentName">
                                                <h4> *身分證字號</h4>
                                                <input type="text" value={EditViewData["insertFile"][0]["身分證號碼"]} onChange={(e) => {
                                                    setEditing(true);
                                                    const value = e.target.value;
                                                    setEditViewData((prev) => ({
                                                        ...prev,
                                                        "insertFile": [
                                                            {
                                                                ...prev.insertFile[0],
                                                                ["身分證號碼"]: value,
                                                            },
                                                            {
                                                                ...prev.insertFile[1],
                                                            }
                                                        ]
                                                    }))
                                                }} />
                                            </div>
                                        </div>
                                        <div className="viewStudentItem">
                                            <div className="viewStudentName">
                                                <h4> *出生日期</h4>
                                                <input type="date" value={EditViewData["insertFile"][0]["出生日期"]} style={{ color: "rgba(0,0,0,1)" }} onChange={(e) => {
                                                    setEditing(true);
                                                    const value = e.target.value;
                                                    setEditViewData((prev) => ({
                                                        ...prev,
                                                        "insertFile": [
                                                            {
                                                                ...prev.insertFile[0],
                                                                ["出生日期"]: value,
                                                            },
                                                            {
                                                                ...prev.insertFile[1],
                                                            }
                                                        ]
                                                    }))
                                                }} />
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
                                            <input type="text" value={EditViewData["insertFile"][0]["通訊地址"]} onChange={(e) => {
                                                setEditing(true);
                                                const value = e.target.value;
                                                setEditViewData((prev) => ({
                                                    ...prev,
                                                    "insertFile": [
                                                        {
                                                            ...prev.insertFile[0],
                                                            ["通訊地址"]: value,
                                                        },
                                                        {
                                                            ...prev.insertFile[1],
                                                        }
                                                    ]
                                                }))
                                            }} />
                                        </div>

                                    </div>
                                    <div className="viewStudentItem">
                                        <div className="viewStudentName">
                                            <h4> *戶籍地址</h4>
                                            <input type="text" value={EditViewData["insertFile"][0]["戶籍地址"]} onChange={(e) => {
                                                setEditing(true);
                                                const value = e.target.value;
                                                setEditViewData((prev) => ({
                                                    ...prev,
                                                    "insertFile": [
                                                        {
                                                            ...prev.insertFile[0],
                                                            ["戶籍地址"]: value,
                                                        },
                                                        {
                                                            ...prev.insertFile[1],
                                                        }
                                                    ]
                                                }))
                                            }} />
                                        </div>

                                    </div>
                                </div>
                                <div className="viewStudentColumn">
                                    <div className="viewStudentItem">
                                        <div className="viewStudentName">
                                            <h4> *聯絡電話</h4>
                                            <input type="text" value={EditViewData["insertFile"][0]["聯絡電話(住宅)"]} onChange={(e) => {
                                                setEditing(true);
                                                const value = e.target.value;
                                                setEditViewData((prev) => ({
                                                    ...prev,
                                                    "insertFile": [
                                                        {
                                                            ...prev.insertFile[0],
                                                            ["聯絡電話(住宅)"]: value,
                                                        },
                                                        {
                                                            ...prev.insertFile[1],
                                                        }
                                                    ]
                                                }))
                                            }} />
                                        </div>

                                    </div>
                                    <div className="viewStudentItem">
                                        <div className="viewStudentName">
                                            <h4> *行動電話</h4>
                                            <input type="text" value={EditViewData["insertFile"][0]["聯絡電話(手機)"]} onChange={(e) => {
                                                setEditing(true);
                                                const value = e.target.value;
                                                setEditViewData((prev) => ({
                                                    ...prev,
                                                    "insertFile": [
                                                        {
                                                            ...prev.insertFile[0],
                                                            ["聯絡電話(手機)"]: value,
                                                        },
                                                        {
                                                            ...prev.insertFile[1],
                                                        }
                                                    ]
                                                }))
                                            }} />
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
                                                    const key = element.registerName[index];
                                                    return (
                                                        !element.isSelect ? (
                                                            <div key={`viewStudentItem-${index}`} className={`viewStudentItem ${element.registerCount == 1 ? "single" : element.registerCount == 2 ? "split" : element.registerCount == 3 ? "triple" : ""} `}>
                                                                <div className="viewStudentName">
                                                                    <h4>*{label}</h4>
                                                                    <input type="text" value={EditViewData["insertFile"][0][label]}
                                                                        onChange={(e) => {
                                                                            const inputValue = e.target.value;
                                                                            setEditViewData((prev) => ({
                                                                                ...prev,
                                                                                "insertFile": [
                                                                                    {
                                                                                        ...prev.insertFile[0],

                                                                                        [label]: inputValue
                                                                                    },
                                                                                    {
                                                                                        ...prev.insertFile[1]
                                                                                    }
                                                                                ]
                                                                            }))
                                                                        }} />
                                                                </div>
                                                            </div>

                                                        ) :
                                                            <div key={`viewStudentItem-${index}-author`} className={`viewStudentItem ${element.registerCount == 1 ? "single" : element.registerCount == 2 ? "split" : element.registerCount == 3 ? "triple" : ""} `}>
                                                                <div className="viewStudentName">
                                                                    <h4>*{element.registerName[0]}</h4>
                                                                    <Select
                                                                        key={`select-different-${index}`}
                                                                        onChange={(e) => {
                                                                            setEditViewData((prev) => ({
                                                                                ...prev,
                                                                                insertFile: [
                                                                                    {
                                                                                        ...prev.insertFile[0],
                                                                                        [key]: e?.value ?? "",
                                                                                    },
                                                                                    {
                                                                                        ...prev.insertFile[1],
                                                                                    }
                                                                                ]
                                                                            }))
                                                                        }}
                                                                        value={
                                                                            element.selectType?.[index]?.map(item => ({
                                                                                label: item,
                                                                                value: item
                                                                            })).find((opt) => {
                                                                                const match = opt.value === EditViewData["insertFile"][0][key];
                                                                                return match;
                                                                            }) ?? null
                                                                        }

                                                                        options={element.selectType?.[index]?.map(item => ({
                                                                            label: item,
                                                                            value: item
                                                                        }))}


                                                                        placeholder={`選擇${key}`}
                                                                        className="selectClass"
                                                                    />

                                                                </div>
                                                            </div>

                                                    )


                                                })
                                                }
                                            </div>
                                        ))}
                                        {/* <div style={{ width: 200 }}>
                                            <Select
                                                options={options}
                                                placeholder="選擇水果"
                                                className="selectClass"
                                            />
                                        </div> */}
                                    </div>
                                </div>
                            </>
                        </>
                    }



                </div>

                <div className="functionBtnContainer">
                    {

                        editFrameState == 1 ?
                            <>
                                <div className="functionBtn" onClick={() => { checkEditCls() }}>
                                    關 閉
                                </div>
                                <div className="functionBtn" onClick={() => setEditFrameState(editFrameState + 1)}>
                                    下一頁
                                </div>
                            </>
                            :
                            <>
                                <div className="functionBtn" onClick={() => setEditFrameState(editFrameState - 1)}>
                                    上一頁
                                </div>
                                <div className="functionBtn" onClick={() => submitEditData()}>
                                    更 新
                                </div>
                            </>
                    }
                </div>

            </div>
        </div>
    )
}
export default EditViewStudentContainer;