const Joi = require('joi') //adicionado essa biblioteca para fazer a validação
const bcrypt = require('bcrypt')
const express = require('express')
const app = express()

const validator = require('express-joi-validation').createValidator({
    passError: true
}) // objeto que realiza a validação

app.use(express.json())

const { deleteUser, insertUser, findToken } = require('./db')


//criando a validação necessária e colocando dentro do objeto schema
const userSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    is_shaver: Joi.boolean().required()
})

app.get('/welcome', function (req, res) {
    res.json({ message: "Olá QAx" })
})

app.get('/token/:email', async function(req,res){
    const {email} = req.params
    const token = await findToken(email)

    if(!token){
        return res.status(404).end()
    }

    res.status(200).json(token)
})

app.delete('/user/:email', async function (req, res) {
    console.log(req.params)
    const { email } = req.params
    await deleteUser(email)
    res.status(204).end()
})

//adicionado o objeto validador do que tem em body dos dados passados por userSchema

app.post('/user', validator.body(userSchema), async function (req, res) {
    const { name, email, password, is_shaver } = req.body
    const hassPass = await bcrypt.hash(password, 8)

    const user = {
        name: name,
        email: email,
        password: hassPass,
        is_shaver: is_shaver
    }

    //MODELOS DE VALIDAÇÕES 
    // if (!user.name || !user.email || !user.password ){
    //     return res.status(400).json({message: 'Every field is mandatory.'})
    // }


    // // if(!user.name){
    //     return res.status(400).json({message: 'Name is required.'})
    // }
    // if(!user.email){
    //     return res.status(400).json({message: 'Email is required'})
    // }
    // if(!user.password){
    //     return res.status(400).json({message: 'Password is required'})
    // }
    // if(!user.is_shaver){
    //     return res.status(400).json({message: 'Shaver is required'})
    // }

    console.log(user)

    try {
        await deleteUser(user.email)

        const id = await insertUser(user)
        res.status(201).json({ user_id: id })

    } catch (error) {

        res.status(500).json({ error: 'Ocorreu um erro.', stack: error })

    }




})

//função que realiza a validação dos campos gerados
app.use((err, req, res, next) => {
    if (err && err.error && err.error.isJoi) {
        // we had a joi error, let's return a custom 400 json response
        res.status(400).json({
            type: err.type, // will be "query" here, but could be "headers", "body", or "params"
            message: err.error.toString()
        });
    } else {
        // pass on to another error handler
        next(err);
    }
});

app.listen(5000)