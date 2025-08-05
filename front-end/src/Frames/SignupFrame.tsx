import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../component/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, fas, faUser } from "@fortawesome/free-solid-svg-icons";
const SignupFrame = () => {
    
    // const verifyCodeArr = [0, 1, 2, 3];
    
    
    
    
    const [loading, setLoading] = useState(true);

    useEffect(() => { 
        setLoading(false);
        setTimeout(()=>{
            setLoading(true);
        },800)
    }, [])

    // useRef
    const userInput = useRef<(HTMLInputElement | null)[]>([]);
    
    const [verifyAlertFrame, setVerifyAlertFrame] = useState(false);
    const [formValue, setFormValue] = useState({ signEmail: "", signAccount: "", signPassword: "" });
    const [verificationCode, setVerificationCode] = useState("");
    const [inputvalue, setinputValue] = useState<string[]>(["", "", "", ""]);
    // const [forbidOverflow , setForbidOverflow] = useState

    // const account = useRef(null);
    const forbidOverflow = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        // console.log("inputvalue[index].length", inputvalue[index].length);
        // console.log("e.target", e.target.value);


        const value = e.target.value;
        const isValid = /^[0-9]?$/.test(value);
        console.log(isValid, "value");



        if (isValid) {
            console.log("inputvalue[index].length", inputvalue[index].length);
            console.log("!isNaN(Number(e.target.value)", !isNaN(Number(e.target.value)));
            console.log(userInput)
            setinputValue((prev) => {
                const temp = [...prev];

                temp[index] = value;

                // if (userInput.current[index + 1]) {
                userInput.current[index + 1]?.focus();
                // }

                return temp;


            })
        }
        else {
            console.log(2131231232131232);

        }
    }

    const handleFormValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        // name => get element裡面的name
        // value => get element裡面的value
        const { name, value } = e.target;
        setFormValue((prev) => ({ ...prev, [name]: value }));
    }





    const handleFormSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("signEmail", formValue.signEmail);
        formData.append("signAccount", formValue.signAccount);
        formData.append("signPassword", formValue.signPassword);
        const URL: string = "http://localhost:3000/signup";
        
        try {
            // test code VVVV
            const res = await fetch(URL, {
                headers:new Headers({"Content-Type":"application/json"}),
                credentials:"include" , 
                method: "POST",
                body: JSON.stringify(formValue)
            })
            if (!res.ok) throw new Error("500 server error");
            const data = await res.json();
            setVerificationCode(data);

            setVerifyAlertFrame(true);
            console.log("成功", 1)

        }
        catch (err) {
            console.error("123", err);
        }
    }

    const handleSubmitVerify = () => {
        const verify_code: string = inputvalue[0] + inputvalue[1] + inputvalue[2] + inputvalue[3];
        if (String(verificationCode) === verify_code) {
            fetch("http://localhost:3000/createOneAcc",{
                headers:new Headers({"Content-Type":"application/json"}),
                credentials:"include" , 
                method:"POST",
                body:JSON.stringify(formValue)
            })
            location.href = "http://localhost:5173/register";
        }

    }


    // const verifyCodesTsx = [];

    // for (let index = 0; index < 4; index++) {
    //     verifyCodesTsx.push(<input type="number" min={0} max={10} onChange={forbidOverflow} ref={"userInput"+index} />)

    // }

    return (
        <div className="LoginFrameContainer">
            <div className={`verifyFrameContainer ${verifyAlertFrame ? "" : "op0"}`}>
                <div className="verifyFrame">
                    <h3>請輸入驗證碼</h3>
                    <div className="verifyCodes">
                        {/* {verifyCodesTsx} */}
                        {
                            inputvalue.map((item, index) => (

                                <input name={`input-${index}`} pattern="[0-9]*" type="text" min={0} max={10} value={item} onChange={(e) => forbidOverflow(e, index)} ref={(el) => { if (el && userInput.current) { userInput.current[index] = el } }} />
                            ))
                        }
                        {/* <input type="number" min={0} max={10} onChange={} />
                        <input type="number" min={0} max={10} onChange={} />
                        <input type="number" min={0} max={10} onChange={} />
                        <input type="number" min={0} max={10} onChange={} /> */}
                    </div>
                    <h4 className="notifySubmit">沒收到驗證碼嗎？<span>重新驗證？</span></h4>
                    <div className="clsContainer">
                        <div className="verifycls" onClick={() => { setVerifyAlertFrame(false) }}>取 消</div>
                        <div className="verifycls" onClick={handleSubmitVerify}>送 出</div>
                    </div>
                </div>
            </div>
            <Loading arg={loading} />
            {/* 要判斷login/regist */}
            <form className="loginbox" onSubmit={handleFormSubmit} >
                <div className="boxContainer">
                    <div className="logoName">
                        <div className="logo"><FontAwesomeIcon icon={faUser} /></div>
                        <h3>註冊帳號</h3>
                    </div>
                    <div className="loginDataContainer">
                        <div className="loginData">
                            <label>Email</label>
                            <input type="email" name="signEmail" onChange={handleFormValue} value={formValue.signEmail} required />
                        </div>
                        <div className="loginData">
                            <label>帳號</label>
                            <input type="text" name="signAccount" onChange={handleFormValue} value={formValue.signAccount} required />
                        </div>
                        <div className="loginData">

                            <label>密碼</label>
                            <input type="password" name="signPassword" onChange={handleFormValue} value={formValue.signPassword} required />
                        </div>
                    </div>
                    <div className="otherFunction">
                        {/* 
                                記住帳密
                                忘記密碼
                                用localstorage
                                 */}
                        {/* <input type="checkbox" name="" id="" />
                                <label>記住我</label> */}

                    </div>
                    <div className="loginButton">
                        <button type="submit">註冊</button>
                        <div className="line"></div>
                        <Link to="/loginframe"><span><u>返回登入頁面</u></span></Link>
                    </div>
                </div>
            </form>
        </div>
    )
}
export default SignupFrame; 