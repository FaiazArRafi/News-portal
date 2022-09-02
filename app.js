const loadNews = () => {
    const url = 'https://openapi.programming-hero.com/api/news/categories'
    fetch(url)
        .then(res => res.json())
        .then(data => displayCatagories(data.data.news_category))
}

const displayCatagories = (catagories) => {
    const newsCatagories = document.getElementById('news-catagories');
    catagories.forEach(i => {
        console.log(i)
        const catagorySpan = document.createElement('span');
        catagorySpan.innerHTML = `
        <h6 class="mx-4"> ${i.category_name}</h6>
        
        `;
        newsCatagories.appendChild(catagorySpan)
    })
}

loadNews()