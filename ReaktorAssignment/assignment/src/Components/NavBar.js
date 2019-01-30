/**
 * NavBar only makes a list with the information passed down from APP.js 
 * the information passed is all the names of the package in the status.txt file 
 * Onclick of one of those Items, it triggers an OnClick event requesting more information
 * about the item you clicked with element.target.className.
 */

import React from 'react'

const NavBar = props => {
  var ul = props.items.sort()
  var ol = ul.map((e) => {
    e = <li><a className={e} name={e} onClick={props.setItemToShow}><b>{e}</b></a></li>
    return e
  })
  return(
    <nav style={{width: 50 + '%'}}><ul>{ol}</ul></nav>
  )
} 

export default NavBar
