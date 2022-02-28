//IDENTIFICA UM HOOK SEMPRE QUE TEM UM "useComponent" DENTRO DO REACT
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export function useAuth() {
  const value = useContext(AuthContext)

  return value;
}