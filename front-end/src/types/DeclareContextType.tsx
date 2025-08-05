import { createContext } from "react";

type ContextType = {
    deleteEditData : (index : number , arg : string ) => void;
}
export const DeclareContextType = createContext<ContextType | null>(null);