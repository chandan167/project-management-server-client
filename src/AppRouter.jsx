import { lazy } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AuthLayout from './layouts/AuthLayout'
import AppLayout from './layouts/AppLayout';

const SignIn = lazy(() => import('./pages/auth/SignIn'));
const SignUp = lazy(() => import('./pages/auth/SignUp'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

export default function AppRouter() {
  return (
    <BrowserRouter>
    <Routes>
        <Route element={<AuthLayout/>}>
            <Route path='sign-in' element={<SignIn />}/>
            <Route path='sign-up' element={<SignUp />}/>
        </Route>
        <Route element={<AppLayout/>}>
          <Route path='dashboard' element={<Dashboard />} />
        </Route>
        <Route path='/' element={<Navigate to='/sign-in' />} />
    </Routes>
    </BrowserRouter>
  )
}
