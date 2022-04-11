import axios from 'axios'
const feedDisplay = document.querySelector('#feed')
const url = 'https://dr-who-web-scraper.herokuapp.com/news'

const options = {
    method: 'GET', 
    url: url, 
}

axios.request(options).then(response => {

    const data = response.data
    console.log(response.data)

    data.forEach(article => {
        const articleItem = `
            <div class="article">
                <a href=${`https://www.bbc.co.uk${article.url}`}>
                    <img src=${article.img ? article.img : "https://source.unsplash.com/random/320x213"}></img>
                    <h3> ${article.title} </h3>
                </a>
            </div>`
                
        feedDisplay.insertAdjacentHTML('beforeend', articleItem)
    });

}).catch(err => console.log(err))
