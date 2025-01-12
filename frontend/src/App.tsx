import { Route, Routes } from 'react-router-dom'
import Home from './pages/home/page'
import SignUp from './pages/signup/page'
import SignIn from './pages/signin/page'
import Settings from './pages/settings/page'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/signup' element={<SignUp/>}></Route>
        <Route path='/signin' element={<SignIn/>}></Route>
        <Route path='/settings' element={<Settings/>}></Route>
      </Routes>
    </div>
  )
}

export default App