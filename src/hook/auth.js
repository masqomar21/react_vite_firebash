import { useContext } from "react";
import { AuthContext } from "../provider/atuhProvider";

export function useAuth() {
    return useContext(AuthContext);
  }