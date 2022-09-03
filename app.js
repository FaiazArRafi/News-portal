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
        <h6 class="mx-4" onclick="loadNewsDetails('${i.category_id}')"> ${i.category_name ? i.category_name : 'No News Avialable'}</h6>
        
        `;
        newsCatagories.appendChild(catagorySpan)
    })
}

const loadNewsDetails = (idNews) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${idNews}`

    console.log(url)
    fetch(url)
        .then(res => res.json())
        .then(data => displayNewsDetails(data.data))
}


const displayNewsDetails = news => {
    const newsDetail = document.getElementById('news-details');
    newsDetail.innerHTML = ``;
    news.forEach(i => {
        console.log(i)
        const newsDiv = document.createElement('div');
        newsDiv.innerHTML = `
        <div class="card mb-3 w-75 p-4 mx-5">
        <div class="row g-4">
          <div class="col-md-3 ">
          <img src="${i.thumbnail_url}" class="img-fluid rounded-start " alt="...">
         </div>
    <div class="col-md-9">
      <div class="card-body">
        <h5 class="card-title">${i.title}</h5>
        <p class="card-text">${i.details.length > 300 ? i.details.slice(0, 300) : i.details}...</p>
        
        <div class="d-flex justify-content-between p-4">
        <div>
        <img src ="${i.author.img}" class="rounded-circle" style="width:2rem"></img>
        <small class="">${i.author.name ? i.author.name : 'No Data Available'} </small>
        </div>
        <div>
        <p >Total View:<span class="fw-semibold pe-4">${i.total_view ? i.total_view : 'No Data Available'}</span></p>
        </div>
        </div>
      </div>
    </div>
  </div>
</div>
        
        `;
        newsDetail.appendChild(newsDiv);

    })

}


loadNews()
loadNewsDetails()