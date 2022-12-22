const axios = require('axios')
const fs = require('fs')
const cheerio = require('cheerio')


const page = axios.get('https://revisamed.com.br/residencia-medica/especialidades-medicas-e-areas-de-atuacao/')
    .then(function (response) {
        const $ = cheerio.load(response.data)
        const data = []

        const titles = $('h3')

        for(let i = 0; i < titles.length; i++) {
            let name = $(titles[i])

            if (name.text() !== 'Leia também...') {
                data.push({
                    id: i + 1,
                    nome: name.text()
                })
            }
        }

        let jsonData = JSON.stringify(data, null, 4)
        fs.writeFile('data.json', jsonData, 'utf8', function(err) {
            if (err) {
                console.log(err)
            } else {
                console.log('complete')
            }
        })
    })
    .catch(function (error) {
        console.log(error)
    })
    .then(function() {})

