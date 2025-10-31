import { use, useContext, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleHalfStroke, faGear, faUpload } from '@fortawesome/free-solid-svg-icons'
import Cookies from 'js-cookie';

type TypeArgument = {
    setDarkMode: React.Dispatch<React.SetStateAction<boolean>>,
    setSettingFrame: React.Dispatch<React.SetStateAction<boolean>>,
    wordFileStatus: boolean,
    settingFrame: boolean,
    wordFileRef: any,
    setAlertText: React.Dispatch<React.SetStateAction<string>>,
    setNonFillout: React.Dispatch<React.SetStateAction<number>>,
}
const SettingComponent = ({ setDarkMode, settingFrame, setSettingFrame, wordFileRef, setAlertText, setNonFillout , wordFileStatus}: TypeArgument) => {
    const [isOn, setIsOn] = useState(false);
    const handleToggle = () => {
        setIsOn(isOn ? false : true);
        setDarkMode(!isOn);
    }

    const handleAdmin = () => {
        const userName = Cookies.get('userName');
        console.log(userName);

        if (userName == "allenhnn") {
            wordFileRef?.current.click();
        }
        else {
            setAlertText("非管理員請勿開啟！");
            setNonFillout(1);
        }
    }

    return (
        <div className={`settingFrameContainer ${!settingFrame ? "op0" : ""}`}>
            <div className="settingFrame">
                <div className="settingTitle">
                    <div className="settingIcon">
                        <FontAwesomeIcon icon={faGear} />
                    </div>
                    <h3>設定</h3>
                </div>
                <div className="line"></div>
                <div className="settingBody">
                    <div className="settingItem">
                        <div className="settingTitle">
                            <div className="icon"><FontAwesomeIcon icon={faCircleHalfStroke} /></div>
                            <h3>深色模式</h3>
                        </div>

                        <div className={`toggle-container ${isOn ? "on" : ""}`} onClick={handleToggle}>
                            <div className={`toggle-circle ${isOn ? "on" : ""}`}></div>
                        </div>
                    </div>

                    <div className="settingItem">
                        <div className="settingTitle">
                            <div className="icon"><FontAwesomeIcon icon={faUpload} /></div>
                            <h3>上傳Word檔案</h3>
                        </div>
                        {
                            !wordFileStatus?
                            <div className="uploadBtn" onClick={() => { handleAdmin() }}>上傳檔案</div>
                            :
                            <div className="uploadBtn success" >上傳成功</div>

                        }
                    </div>
                </div>
                <div className="functionBtns">
                    <div className="btn bRed">登出</div>
                    <div className="btn" onClick={() => { setSettingFrame(false) }}>關閉</div>
                </div>
            </div>
        </div>
    );

}
export default SettingComponent;