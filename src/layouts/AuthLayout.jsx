import { Suspense, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import authInstance from "../logic/auth.logic";
import ThemeToggle from "../components/ThemeToggle";


export default function AuthLayout() {

    const navigate = useNavigate();

    useEffect(() => {
        if (authInstance.isLogin()) {
            navigate('/dashboard')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigate, authInstance.isLogin()])


    return (
        <>
            <ThemeToggle />
            <Suspense fallback={
                <p>Loading</p>
            }>
                <Outlet />
            </Suspense>
        </>
    )
}
