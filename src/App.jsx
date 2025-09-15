import Loginuser from './pages/loginuser'
import{BrowserRouter,Routes,Route} from 'react-router-dom'
import Signup from './pages/signup'
import Loginadmin from './pages/loginadmin'
import Admin from './pages/admindashboard'
import Home  from './pages/home';
export const App = () => {
 
  return (
    <BrowserRouter>
<Routes>
  <Route path="/" element={<Loginuser/>}/>
    <Route path="/signup" element={<Signup/>}/>
    <Route path="/loginadmin" element={<Loginadmin/>}/>
    <Route path="/admin" element={<Admin/>}/>
    <Route path="/home" element={<Home/>}/>
</Routes>
    </BrowserRouter>
  )
}
