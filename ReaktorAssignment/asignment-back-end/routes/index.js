const express = require('express')
const router  = express.Router()
const fs = require('fs')

var arrNames = []

fs.readFile('public/status.txt', 'utf-8', (err, data) => { 
  //Now with this I am only passing the names in the list, this part 
  //of the code only runs one time, however, you can do multiple
  //gets without processing this code anymore 
 
  if(err) console.log(err)
  else{
    var info = data.toString()
    var arrayInfo = info.split("Original-Maintainer:") //I split in here since I dont need the following information
    var aux = arrayInfo.map((e) => e.split('\n')) //This matrice has all elements in an orgianized way
    aux.forEach((element)  => {
      element.forEach((string) => {
        if(string.indexOf('Package:') >= 0){
          arrNames.push(string)
        }
      })
    })
  }
})

/* GET home page */
router.get('/', (req, res, next) => {
    res.send(arrNames)
})



module.exports = router