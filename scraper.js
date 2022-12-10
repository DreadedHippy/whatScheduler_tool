const axios = require('axios');
const cheerio = require('cheerio');
const ObjectsToCsv = require('objects-to-csv');

linkedinJobs = [];
let pageNumber = 0;
    
function getInfo() {
    return new Promise((resolve, reject) => {
    setTimeout(() => {
        let url = `https://www.linkedin.com/jobs/search?keywords=Web%20Development&location=Lagos%2C%20Lagos%20State%2C%20Nigeria&geoId=105693087&trk=public_jobs_jobs-search-bar_search-submit&position=1&pageNum=0&start=${pageNumber}`;
        axios(url).then(response => {
            const html = response.data;
            const $ = cheerio.load(html);
            const jobs = $('li')
            jobs.each((index, element) => {
                const jobTitle = $(element).find('h3.base-search-card__title').text().trim()
                const company = $(element).find('h4.base-search-card__subtitle').text().trim()
                const location = $(element).find('span.job-search-card__location').text().trim()
                const link = $(element).find('a.base-card__full-link').attr('href')
    
                linkedinJobs.push({
                    'Title': jobTitle,
                    'Company': company,
                    'Location': location,
                    'Link': link,
                })
    
                if(!jobTitle || !company || !location || !link){
                    linkedinJobs.pop()
                }
                resolve(linkedinJobs)
            });
            // const csv = new ObjectsToCsv(linkedinJobs)
            // csv.toDisk('./linkedInJobs.csv', { append: true })
        })
        .catch(console.error)

        pageNumber+= 25;
        if(pageNumber < 50){
            getInfo()
        }
    }, 5000);
})
}


let jobs = new Promise(function showResult(resolve, reject){
    getInfo().then((result) =>{
        resolve(result)
    }).catch(err => console.log(err))
})



module.exports = {jobs}

