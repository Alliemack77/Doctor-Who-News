const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const cors = require('cors')
const PORT = process.env.PORT || 8000
const url = "https://www.bbc.co.uk/blogs/doctorwho"

const app = express()
app.use(cors())


app.get('/', (req, res) => {
    res.json("This is my web scraper")
})

app.get('/news', (req, res) => {

    axios.get(url)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
            const articles = []

            $(".post", html).each(function () {
                const title = $(this).find('h3').text()
                const url = $(this).find('a').attr('href')
                const img = $(this).find('img[sizes]').attr('src')
                articles.push({title, url, img})
            })

            console.log(articles)
            res.json(articles)

        }).catch(err => console.log(err))
})



app.listen(PORT, () => console.log(`Server running on port ${PORT}`) )