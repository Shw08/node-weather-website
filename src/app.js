const path= require('path')
const express = require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')


const app = express()


console.log(__dirname)
console.log(path.join(__dirname, '../public'))


// define paths for express configuration 
const publicDirectoryPath=path.join(__dirname, '../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

// setup handbar engine and views location 
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)


// set up static diretory to serve 
app.use(express.static(publicDirectoryPath))


app.get('',(req,res) => {
    res.render('index',{
        title:'WEATHER',
        name:'shweta yadav'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title:'ABOUT',
        name:'shweta yadav '
    })
})


app.get('/help' ,(req,res)=>{
    res.render('help',{
        title:'HELP',
        helptext:'shweta yadav this is some helpfull text printing ',
        name:'shweta yadav'
    })
})


app.get('/weather' , (req,res) => {
    if(!req.query.address)
    {
        return res.send({
            error:'please provide an address'
        })
    }

    geocode(req.query.address ,(error , { latitude, longitude, location } = {} )=> {

        if(error)
        {
            return res.send({ error:'There is connection error !!'})
        }
        
        forecast(latitude,longitude, ( error, forecastdata) => {
            if(error)
            {
                return res.send({ error:'connection error on forecast page !!'})
            }

            res.send({   forecastData: forecastdata,
                          location,
                          address:req.query.address})
        })

    })

})

app.get('/products' , (req,res)=>{
    if (!req.query.search) {
      return  res.send({
           error:'You must provide a search term'
       })
    }
    

        console.log(req.query.search)
        res.send({
            product:'p'
        }) 
})


app.get('/help/*' , (req,res) => {
    res.render('error' , {
        title:'404',
        name:'Shweta yadav',
        errormsg:'help article page not found'
    })
})


app.get('*',(req,res) => {
   res.render('error',{
       title:'404',
       name:'shweta yadav',
       errormsg:'404 error page '
   })
})

app.listen(3000 , () => {
    console.log('server is up on port 3000 ')
})