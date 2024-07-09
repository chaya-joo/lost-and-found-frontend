import React from "react"
import { ReactNode } from "react"
import { Navigate } from "react-router-dom"
import { PATHS } from "../routes/paths"
import { useSelector } from "react-redux"
import { selectAuth } from "../redux/auth/auth.selectors"

type Props = {
    children: ReactNode
}

export default function AuthGuard({ children }: Props) {
    const { isAuthenticated, isInitialized } = useSelector(selectAuth);

    if (!isInitialized) {
        return <h1>Loading...</h1>
    }
    if (!isAuthenticated) {
        return <Navigate to={`/${PATHS.login}`} />
    }
    return <>{children}</>
}