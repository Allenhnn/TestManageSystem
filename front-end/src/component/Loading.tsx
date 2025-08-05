import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
// export type LoadingType = {
//     triggerChange : () => void;
// }
type loadingType = {
    arg : boolean
};
const Loading = (({arg}:loadingType) => {
    // const [fadeoutAnimate, setFadeoutAnimate] = useState(0);
    // setFadeoutAnimate(arg);
    return (
        <div className={`loading ${arg ? "op0" : "none"}`}>
            <div className="loader" />
        </div>
    )
})
export default Loading;
// const Loading = forwardRef<LoadingType>((_,ref) => {
//     const [fadeoutAnimate, setFadeoutAnimate] = useState(false);
//     useEffect(() => {
//         setTimeout(() => {
//             setFadeoutAnimate(true);
//         }, 800);

//     }, [])
    
//     useImperativeHandle(ref,()=>({
//         triggerChange :()=>{
//             setFadeoutAnimate(false);
//             setTimeout(() => {
//                 setFadeoutAnimate(true);
//             }, 800);
//         } 

//     }),[])
    

//     return (
//         <div className={`loading ${fadeoutAnimate ? "op0" : "none"}`}>
//             <div className="loader" />
//         </div>
//     )
// })
// export default Loading;