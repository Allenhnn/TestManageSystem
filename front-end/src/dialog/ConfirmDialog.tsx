// ConfirmDialog.tsx
import ReactDOM from "react-dom";
import { useEffect , type JSX } from "react";

type Props = {
  message: JSX.Element | string;
  onClose: (result: boolean) => void;
};

const ConfirmDialog = ({ message, onClose }: Props) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return ReactDOM.createPortal(
    <div className="popup-overlay">
      <div className="popup">
        <div className="popup-content">
          {message}
        </div>
        <div className="popup-buttons">
          <button onClick={() => onClose(true)}>Yes</button>
          <button onClick={() => onClose(false)}>No</button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ConfirmDialog;