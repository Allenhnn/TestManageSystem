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
    setEditFrameState: React.Dispatch<React.SetStateAction<number>>
    setEditViewData: React.Dispatch<React.SetStateAction<_EditType>>
    imageURL: string
}

// const multipleType = [
//     "身分證號碼", "中文姓名", "出生日期",
//     "報簡職類", "英文姓名", "檢定區別",
//     "通訊地址", "戶籍地址", "聯絡電話(住宅)",
//     "聯絡電話(手機)", "就讀學校", "就讀科系",
//     "上課別", "年級", "班級", "座號", "身分別",
//     "學制"
// ]
// type ViewType = {
//     [k in typeof multipleType[number]]: string;
// }

type selectType = {
    value: string,
    label: string
}

const test_type: selectType[] = [
    { value: '視覺', label: '日間部' },
    { value: '會計', label: '會計' },
    { value: '會資', label: '會資' },
    { value: '門市', label: '門市' },
]
const study_type: selectType[] = [
    { value: '日間部', label: '日間部' },
    { value: '夜間部', label: '夜間部' },
    { value: '進修部', label: '進修部' },
]
const study_rule: selectType[] = [
    { value: '職業學校', label: '職業學校' },
    { value: '高級中學', label: '高級中學' },
    { value: '實用技能學程', label: '實用技能學程' },
    { value: '建教班', label: '建教班' },
    { value: '五專', label: '五專' },
    { value: '軍事院校', label: '軍事院校' },
    { value: '綜合高中', label: '綜合高中' },
    { value: '進修學校(部)', label: '進修學校(部)' },
    { value: '大專院校', label: '大專院校' },
]

const options_type: selectType[] = [
    { value: '全測', label: '全測' },
    { value: '免學', label: '免學' },
    { value: '免術', label: '免術' },
]

const options_identity: selectType[] = [
    { value: "無", label: "無" },
    { value: "原住民", label: "原住民" },
    { value: "身心障礙", label: "身心障礙" },
    { value: "低收入戶", label: "低收入戶" },
    { value: "大陸學位生", label: "大陸學位生" },
    { value: "大陸地區人民", label: "大陸地區人民" },
    { value: "外籍人士", label: "外籍人士" },
    { value: "探親就學", label: "探親就學" },
]

const EditViewStudentContainer = ({ imageURL, setEditViewData, submitEditData, EditViewData, editFrameState, setEditFrameState }: stateType) => {
    const [editing, setEditing] = useState(false);
    // console.log(EditViewData?.insertFile?.[0]?.["檢定區別"]);



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
                                <div className="studentImageContainer"><img src={imageURL} alt="" /></div>
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
                                                            <div key={`viewStudentItem-${index}`} className={`viewStudentItem ${element.registerCount == 1 ? "single" : element.registerCount == 2 ? "split" : element.registerCount == 3 ? "triple" : ""} `} key={`viewStudentItem-${index}`}>
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