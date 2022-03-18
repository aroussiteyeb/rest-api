const express = require('express');
var router = express.Router();
const persons= require("./model/persons")
const city= require("./model/city")




/* get all persons */
router.get('/persons', (req,res) => {
  const name = req.query.name  
  const fields = req.query.fields
  const sort = req.query.sort  
  

  if(name!=null)
  {
    const find = persons.find(find => find.name === name)
    res.status(200).json(find)
  }
  else if(sort!=null)
  {
    if(sort=="name")
    {
      function compare( a, b ) {
        if ( a.name < b.name ){
          return -1;
        }
        if ( a.name > b.name ){
          return 1;
        }
        return 0;
      }
      sortpersons=persons.sort( compare );
    res.status(200).json(sortpersons)
    }
    else{
      function compare( a, b ) {
        if ( a.id < b.id ){
          return -1;
        }
        if ( a.id > b.id ){
          return 1;
        }
        return 0;
      }
      sortpersons=persons.sort( compare );
    res.status(200).json(sortpersons)
    }
    
    
    
  }
  else if(fields=="name"){

    res.status(200).json(persons.map(function(item){return item.name}))

  }
  else if(fields=="id"){

    res.status(200).json(persons.map(function(item){return item.id}))

  }
  else if(fields=="cities"){

    res.status(200).json(persons.map(function(item){return item.cities}))

  }
  else if(fields=="cities"){

    res.status(200).json(persons.map(function(item){return item.cities}))

  }
  
  else
  {
    res.status(200).json(persons)
    res.send("Liste des personne")
  }
  
  
})





/* get person by id */

router.get('/person/:id', (req,res) => {
  const id = parseInt(req.params.id)
  const find = persons.find(find => find.id === id)
  res.status(200).json(find)
})



/* update personne */

router.put('/person/:id', (req,res) => {
  const id = parseInt(req.params.id)
  let personsToUpdate = persons.find(person => person.id === id)
  personsToUpdate.name =req.body.name,
  personsToUpdate.cities=req.body.cities
  
  res.status(200).json(personsToUpdate)
})

/* ajout personne */

router.post('/person', (req,res) => {
  persons.push(req.body)
  res.status(200).json(persons)
})

/* delete personne */

router.delete('/person/:id', (req,res) => {
  const id = parseInt(req.params.id)
  let personTodelete = persons.find(person => person.id === id)
  persons.splice(persons.indexOf(personTodelete),1)
  res.status(200).json(persons)
})

/* get all city */
router.get('/city',(req,res)=>{
  res.status(200).json(city)
})



/* get  city by id */
router.get('/city/:id',(req,res)=>{
  const id=parseInt(req.params.id)
  const cityById=city.find(item=>item.id===id)
  res.status(200).json(cityById)
})


/* ajout  city  */
router.post('/city',(req,res)=>{
  city.push(req.body)
  res.status(200).json(city)
})

/* delete city */

router.delete('/city/:id', (req,res) => {
  const id = parseInt(req.params.id)
  let cityTodelete = city.find(item => item.id === id)
  city.splice(city.indexOf(cityTodelete),1)
  res.status(200).json(city)
})


/* add city to person */
router.put('/cityToPerson/:id', (req,res) => {
  const id = parseInt(req.params.id)
  const idCity=parseInt(req.query.idCity)

  const cityById=city.find(item=>item.id===idCity)


  let personsToUpdate = persons.find(person => person.id === id)

  personsToUpdate.cities=cityById
  
  res.status(200).json(personsToUpdate)

})




/* delete city from person */
router.delete('/deleteCityToPerson/:id', (req,res) => {
  const id = parseInt(req.params.id)
  const idCity=parseInt(req.query.idCity)


  let personsToDeleteCity = persons.find(person => person.id === id)
  let city = personsToDeleteCity.cities.find(item => item.id === idCity)
  console.log("person city to delete",city)

persons.splice(persons.indexOf(city),1)
res.status(200).json(persons)

})



module.exports = router;
