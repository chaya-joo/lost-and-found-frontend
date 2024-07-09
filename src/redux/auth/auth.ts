import { UseSelector } from "react-redux";
import { selectAuth } from "./auth.selectors";
import { useAppSelector } from "../store";


export default function getAuth() { return useAppSelector(selectAuth); }

