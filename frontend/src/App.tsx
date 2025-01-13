import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/home/page'
import SignUp from './pages/signup/page'
import SignIn from './pages/signin/page'
import Settings from './pages/settings/page'
import Navbar from './components/Navbar'
import { useAuth } from './store/useAuth'
import { useEffect } from 'react'
import { TbLoader2 } from "react-icons/tb";
import { Toaster } from 'react-hot-toast'

const App = () => {
  const {authUser , checkAuth , isCheckingAuth} = useAuth()
  useEffect(()=>{
    checkAuth()
  } , [checkAuth])
  
  if(isCheckingAuth){
    return (
      <div className="h-screen flex items-center justify-center">
        <TbLoader2 className='size-10 animate-spin' />
      </div>
    )
  }

  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' element={authUser ? <Home/> : <Navigate to={'/signin'} />}></Route>
        <Route path='/signup' element={!authUser ? <SignUp/> : <Navigate to={'/'} />}></Route>
        <Route path='/signin' element={!authUser ? <SignIn/> : <Navigate to={'/'} />}></Route>
        <Route path='/settings' element={<Settings/>}></Route>
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App