import React from 'react'
import '../../css/loader.css'
import { Loading } from 'react-loading-dot'

const Loader = ({className}) => {
  return (
    <div className={`${className ? className : 'loader-main'}`}>
        <Loading background='#00BFB4'/>
    </div>
  )
}

export default Loader