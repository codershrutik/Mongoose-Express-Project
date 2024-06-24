const mongoose = require('mongoose');
const Animal = require('./models/animal');

mongoose.connect('mongodb://127.0.0.1:27017/animalShelter',{ useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=>{
        console.log("Mongo Connection open")
    })
    .catch(err=>{
        console.log("Error connecting to MongoDB",err)
    });

// const a = new Animal({
//     name: "Fido",
//     type: 'Dog',
//     breed: "Golden Retriever",
//     gender: 'male',
//     age: 3,
//     health: true,
//     adoptionStatus: 'available'
// });
// a.save().then(a=>{
//     console.log(a);
// })
// .catch(e=>{
//     console.log(e);
// })

const seedAnimals = [
    {
        name: 'Kaalu',
        type: 'dog',
        breed: 'Labrador',
        gender: 'male',
        age: 2,
        health: true,
        adoptionStatus: 'available'
    },
    {
        name: 'Chandani',
        type: 'cat',
        breed: 'calico',
        gender: 'female',
        age: 1,
        health: true,
        adoptionStatus: 'available'
    },
    {
        name: 'Mishti',
        type: 'cat',
        breed: 'Siamese',
        gender: 'female',
        age: 3,
        health: true,
        adoptionStatus: 'available'
    },
    {
        name: 'Kala',
        type: 'cat',
        breed: 'Persian',
        gender: 'male',
        age: 2,
        health: true,
        adoptionStatus: 'pending'
    },
    {
        name: 'Mochi',
        type: 'rabbit',
        breed: 'Dwarf',
        gender: 'female',
        age: 1,
        health: true,
        adoptionStatus: 'adopted'
    }
]

Animal.insertMany(seedAnimals)
    .then(res=>{
        console.log(res)
    })
    .catch(e =>{
        console.log(e)
    })