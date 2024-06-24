const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override')

const Animal = require('./models/animal');
// const { request } = require('http');

mongoose.connect('mongodb://127.0.0.1:27017/animalShelter',{ useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=>{
        console.log("Mongo Connection open")
    })
    .catch(err=>{
        console.log("Error connecting to MongoDB",err)
    });

app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));

const type = ['dog','cat','rabbit','bird','reptile','other'];

app.get('/animals',async (req,res)=>{
    const { type } = req.query;
    if(type){
        const animals = await Animal.find({type})
        res.render('animals/index', { animals,type });
    }else{
        const animals = await Animal.find({})
        res.render('animals/index', { animals,type:'all' });
    }
})

app.get('/animals/new', (req,res)=>{
    res.render('animals/new')
})

app.post('/animals',async(req,res)=>{
    const newAnimal = new Animal(req.body);
    await newAnimal.save();
    res.redirect(`/animals/${newAnimal._id}`)
    // console.log(newAnimal);
    // res.send('Animal added')
})

app.get('/animals/:id', async (req, res) => {
    const { id } = req.params; // Correctly extracting id from req.params
    try {
        const animal = await Animal.findById(id);
        if (!animal) {
            return res.status(404).send('Animal not found');
        }
        res.render('animals/show', { animal });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

app.get('/animals/:id/edit', async (req,res)=>{
    const { id } = req.params;
    const animal = await Animal.findById(id);
    res.render('animals/edit', { animal })
})

app.put('/animals/:id',async(req,res)=>{
    const { id } = req.params;
    const animal = await Animal.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    // console.log(req.body);
    // res.send('PUT');
    res.redirect(`/animals/${animal._id}`);
})

app.delete('/animals/:id',async(req,res)=>{
    const { id } = req.params;
    const deletedAnimal = await Animal.findByIdAndDelete(id);
    res.redirect('/animals')
})

app.listen(3000,()=>{
    console.log('App is listening on Port 3000');
})