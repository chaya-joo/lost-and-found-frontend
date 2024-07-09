import { useEffect } from "react"
import { AuthUserType } from "../types/user.types"
import { getSession, isValidToken, setSession } from "./utils"
import { useDispatch } from "react-redux"
import { setInitialized, setUser } from "../redux/auth/auth.slice"


export default function InitializedAuth() {

    const dispatch = useDispatch()

    useEffect(() => {
        const authUser: AuthUserType | null = getSession()
        if (authUser && isValidToken(authUser.token)) {
            dispatch(setUser(authUser))// שמירת הנתונים ברידקס
            setSession(authUser)
        }
        dispatch(setInitialized())
    }, [])

    return null
}