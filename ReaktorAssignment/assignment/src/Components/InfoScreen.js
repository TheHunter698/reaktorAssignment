import React from 'react'

const InfoScreen = props => {
   if(props.itemToShow == null){
    return(
        <div className="infoScreen">
            <b>Select an Item from the list to see its details</b>
        </div>
    )
   }    
   else{
        //else render data
        var name = props.itemToShow.name //Name to change because it has package on it
        var nameEdited = name.substring(name.indexOf(' '), name.length) //Substring of the name
        var depends = props.itemToShow.depends
        var dependsEdited = depends.substring(depends.indexOf(' '), depends.length)
        var dependsSplit = dependsEdited.split(',')
        var dependsMapped = dependsSplit.map((e) => {
            if(e.indexOf('(') >= 0){
                e = e.substring(e.indexOf(' '), e.indexOf('('))
                e = <li><a className={e} onClick={props.setItemToShow} >{e}</a></li>
                return e
            }
            else{
                e = <li><a className={e} onClick={props.setItemToShow}>{e}</a></li>
                return e
            }
        })
        console.log(dependsSplit)
        debugger
        return(
            <div style={{width: 50 + '%'}}><b><ul>  
                <li className="item">Name: {nameEdited}</li>
                <li className="item">{props.itemToShow.description}</li>
                <li className="item"><b>This package depends on: </b><ul>{dependsMapped}</ul></li>
            </ul></b></div>
        )

   }
   
}

export default InfoScreen