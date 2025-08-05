import { StrictMode } from 'react'
import { BrowserRouter, Routes , Route} from "react-router-dom";
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import "./sass/main.scss";
import RegisterFrame from './Frames/RegisterFrame.tsx'
import SignupFrame from './Frames/SignupFrame.tsx'
import LoginFrame from './Frames/LoginFrame.tsx';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <App /> */}
    {/* <LoginFrame /> */}
    <BrowserRouter>
      <Routes>
        <Route path='/loginframe' element={<LoginFrame />} />
        <Route path='register' element={<RegisterFrame />} />
        <Route path='/signupframe' element={<SignupFrame />} />

      </Routes>
    </BrowserRouter>
    
  </StrictMode>,
)
