const express = require('express')
const mongoose = require('mongoose')
const Author =  require('./models/Author')
const AdminPreview = require('./models/AdminPreview')
const port = process.env.PORT || 8000
// INIT APP
const app = express()

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})

// MIDDLEWARES
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))


// ROUTES
app.get('/', (req,res) => {
    res.render('index')
})

app.get('/create', (req,res) => {
    res.render('create')
})
app.get('/adminstories', async (req,res) => {
    try{
        const data = await AdminPreview.find()
        res.render('adminstories', {data})
    }
    catch(err){
        res.send(err)
    }        
})
app.post('/story/search', async (req,res) => {
    try{
        const data = await AdminPreview.find().where('author').equals(req.body.search)
        res.render('adminstories', {data})
    }
    catch(err){
        res.send(err)
    }        
})
app.get('/stories', async (req,res) => {
    try{
        const data = await AdminPreview.find().where('published').equals(true)
        res.render('adminstories', {data})
    }
    catch(err){
        res.send(err)
    }        
})
app.get('/story/:id', async(req,res) => {
    try{ 
        const story = await AdminPreview.findById(req.params.id)
        console.log(story);
        res.render('verify', {story})
    }catch(err){
        res.send(err)
    }
})
app.post('/checkauthor', async (req,res) => {
    try{
        const author = await Author.findOne().where('name').equals(req.body.authorName);
        if(author == null){
            res.status(200).send({allow: true})
        }
        else{
            res.send({allow: false})
        }
    }
    catch(err){
        res.send(err)
    }
})
app.post('/publish', async (req,res) => {
    try{
        const author = await Author.findOne().where('name').equals(req.body.author)
        if(author == null){
            await Author.create({
                name:  req.body.author
            })
        }
        const article = await AdminPreview.findByIdAndUpdate(req.body.id, {
            title: req.body.title,
            author: req.body.author,
            markdown: req.body.markdown,
            secret: req.body.secret,
            published: true
        })
        
        res.redirect('/adminstories')
    }
    catch(err){
        res.send(err)
    }
})
app.post('/create', (req,res) => {
    AdminPreview.create({
        title: req.body.title,
        author: req.body.author,
        markdown: req.body.markdown,
        secret: req.body.secret,
        published: false
    })
    .then(data => {
        res.redirect('/adminstories')
    })
    .catch(err => console.log(err))
})

// LISTEN TO REQUEST
app.listen(port)