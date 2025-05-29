import React, { useContext } from 'react'
import { Header } from '../ui/header'
import { Footer } from '../ui/footer'
import { Login } from '../ui/login'
import { Context as AuthContext } from '../../context/AuthContext'

export const Default = ({children}) => {

  const {state} = useContext(AuthContext)

  return (<>
            <Header/>
            <div className='main'>
            {children}
            </div>
            {!state.userData ? <Login/> : null }
            <Footer/>
          </>)
}