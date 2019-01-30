const express = require('express')
const router  = express.Router()
const fs = require('fs')

router.get('/', (req, res, next) => {
    fs.readFile('public/status.txt', 'utf-8', (err, data) => { //Now with this I am only passing the names in the list, if you click on the item it will do an actual POST req
        if(err) console.log(err)
        else{
            var info = data.toString()
            var allPackages = info.split("Original-Maintainer:")

            //This object contains the information about the package of the query
            var matchedElement = {
                name: req.query.name //The name is in a query
            } 
            debugger
            var matched;
            //Finding the package in the parsed array with the query 
            allPackages.forEach((e) => {
                if(e.includes(matchedElement.name)){ //Here the query
                    matched = e;
                }
            })
            //Function that will execute to find the description of the package
            const getDescription = () => {
                return matched.substring(matched.indexOf('Description'), matched.length)
            }

            //Function that will execute to find the depends of the package
            const getDepends = () => {
                var cut;
                //Getting the position where to cut with substring
                for(let i = matched.indexOf('Depends'); i < matched.length; i++){
                    if(matched[i] == '\n'){
                        cut = i
                        break
                    }
                }
                return matched.substring(matched.indexOf('Depends'),cut)
            }
        
            //Seeing if matched has a depends
            var hasDep;
            (matched.includes('Depends:')) ? hasDep = true : matchedElement.depends = 'Item does not depend on any other package'
            
            //Checks if it has depends because not all packages have
            if(hasDep){matchedElement.depends = getDepends()}
            matchedElement.description = getDescription()
            
            //Since the substring from before has some other info in the description
            //We have to get rid of it, first finding out which of the 2 possible fields
            //It is, then eliminating with substring
            var originalPos = matchedElement.description.indexOf('Original')
            var homePagePos = matchedElement.description.indexOf('Homepage')

            if(originalPos > homePagePos){
                matchedElement.description = matchedElement.description.substring('Description', originalPos)
            }
            else if(originalPos < homePagePos){
                matchedElement.description = matchedElement.description.substring('Description', homePagePos)
            }

            //return the object to front end
            res.send(matchedElement)
        }
        
    })

})


module.exports = router