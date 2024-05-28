import React from 'react'
import MainNav from './MainNav'

export default function Layout(props) {
  return (
    <>
    <MainNav/>
    <div style={{display:'flex'}}>
        {props.children}
    </div>
    </>
  )
}
