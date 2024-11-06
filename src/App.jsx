import './App.css'
import React, {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux'
import authService from "./appwrite/auth"
import { login, logout } from './store/authSlice'
import { Header, Footer } from './components'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  
  //userData login ke action mein jayega 
  //get current user mein kuch nahi mila to logout hi karwa do
  //kam se kam ek activity hi ho jayegi aur state hi update ho jayega
  //jab bhi app load hoga ya to apne paas current user ka access hoga
  //ya fir state mein logged out(false) likha hoga
  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if(userData){
        dispatch(login({userData}))
      } else{
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  },[])

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between
    bg-gray-400'>
      <div className='w-full block'>
        <Header/>
        <main>
        TODO: <Outlet/>
        </main>
        <Footer/>
      </div>
    </div>
  ) : null
 }

export default App
