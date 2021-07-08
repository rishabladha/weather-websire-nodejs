const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const request = require('request')
const geoCode = require('./utils/geoCode')
const forCast = require('./utils/forecast')



// console.log(__dirname);
// console.log(path.join(__dirname, '../public'));
//for path

//define path for express config
const viewspath = path.join(__dirname, '../templates/views')
const partialspath = path.join(__dirname, '../templates/partials')

//set up handlebars engine and view location for dynamic content
app.set('view engine', 'hbs')
app.set('views', viewspath)//where to look views directory by express



//partials registering
hbs.registerPartials(partialspath)


//set up static directory to serve
app.use(express.static(path.join(__dirname, '../public')))




app.get('', (req, res) => {
    res.render('index', {
        'title': 'Weather',
        'name': 'Rishab Ladha'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        'title': 'About Me',
        'name': 'Rishab Ladha'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        'title': 'Help Page',
        'name': 'Rishab Ladha',

        'helptext': 'i am here to help you'
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send('address must be there')
    }
    // All query string key/value pairs are on req.query


    geoCode(req.query.address, (error, { latitude, longitude } = {}) => {
        //{ } avoid destructuring erroe we have intiliazed as empty to latitude longitude in case if there is an error
        // we cannot destructure undefined
        // do watch playground 7 th file
        // console.log(error)
        // console.log(data)
        // console.log(data)
        // latitude , longitude
        if (error) {

            return res.send({ error })

        }
        else {

            forCast(latitude, longitude, (error, { temp, humidity, condition }) => {

                if (error) {

                    return res.send({ error })
                }


                res.send(
                    {
                        temp,
                        humidity,
                        condition,
                        address: req.query.address
                    }
                )

            }

            )
        }



    })
})

app.get('/help/*', (req, res) => {
    res.render('helperror', {
        'title': 'Help Wrong URL',
        'name': 'Rishab Ladha'
    })
})


app.get('*', (req, res) => {
    res.render('error', {
        'title': 'Error 404',
        'Message': 'This is Wrong url',
        'name': 'Rishab Ladha'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})
