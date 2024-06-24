const mongoose = require('mongoose');

const shelterSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    type:{
        type: String,
        enum: ['dog','cat','rabbit','bird','reptile','other'],
        required: true,
        lowercase: true
    },
    breed: {
        type: String,
        required: true
    },
    gender:{
        type: String,
        enum: ['male','female'],
        required: true
    },
    age:{
        type: Number,
        required: true,
        min: 0
    },
    health:{
        type: Boolean
    },
    adoptionStatus:{
        type: String,
        enum: ['available','adopted','pending'],
        required: true
    }
})

const Animal = mongoose.model('Animal',shelterSchema);
module.exports = Animal;