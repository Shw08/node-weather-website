const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url='http://api.weatherstack.com/current?access_key=ce1efca77846f40dfc2407c07a94d791&query=' + latitude +',' + longitude +'&units=m'

    request({ url , json:true} , (error , {body}) => {
        if(error)
        {
            callback('unable to connect to weather services ' , undefined)
        }
        else if(body.error)
        {
            callback('unable to fetch data there is problem wiht the coordintes ' , undefined )
        }
        else{
            callback(undefined , 
                'It is  '+ body.current.temperature + ' degree out there . There is ' + body.current.precip + '% chance of rain .The pressure here is ' + body.current.pressure +'.The wind direction is towards ' +body.current.wind_dir +'.'
            )
        }
    })
}

module.exports=forecast