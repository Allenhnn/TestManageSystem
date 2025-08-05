import { useState , type JSX } from "react";
import ConfirmDialog from "./ConfirmDialog";

export const useConfirm = (): [(msg: JSX.Element | string) => Promise<boolean>, JSX.Element | null] => {
  const [confirmState, setConfirmState] = useState<{
    message: JSX.Element | string;
    resolve: (value: boolean) => void;
  } | null>(null);

  const confirm = (message: JSX.Element | string) => {
    return new Promise<boolean>((resolve) => {
      setConfirmState({ message, resolve });
    });
  };

  const confirmElement = confirmState ? (
    <ConfirmDialog
      message={confirmState.message}
      onClose={(result : any) => {
        confirmState.resolve(result);
        setConfirmState(null);
      }}
    />
  ) : null;

  return [confirm, confirmElement];
};
