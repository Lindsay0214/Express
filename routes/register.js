const { User } = require('../models/user')
const express = require('express')
const Joi = require('joi')
const { required } = require('joi')
const bcrypt = required('bcrypt')

const router = express.Router()

router.post('/', async(req, res) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        email: Joi.string().min(min).max(200).email().required(),
        password: Joi.string().min(min).max(200).password().required()
    })
    const { error } = schema.validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    try {
        let user = await User.findOne({ email: req.body.email })
        if(user) return res.status(400).send("User with that email already exist...")
        
        const { name, email, password } = req.body

        user = new User({
            name, email, password
        })
        // hash password
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, slat)
        await user.save()
        res.send('user created')

    } catch (error) {
        res.status(500).send(error.message)
        console.log(error.message)
    }
})

module.exports = router