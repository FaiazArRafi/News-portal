// catagories API added
const loadNews = () => {
  const url = 'https://openapi.programming-hero.com/api/news/categories'
  fetch(url)
    .then(res => res.json())
    .then(data => displayCatagories(data.data.news_category))
    .catch(error => console.log(error))
}
// catagories details added
const displayCatagories = (catagories) => {

  const newsCatagories = document.getElementById('news-catagories');
  document.getElementById('news-catagories').style.cursor = "pointer";

  catagories.forEach(i => {
    const catagorySpan = document.createElement('span');
    catagorySpan.innerHTML = `
        <h6 class="mx-4 new" onclick="loadNewsDetails('${i.category_id}')"> ${i.category_name ? i.category_name : 'No News Avialable'} </h6>
        `;
    newsCatagories.appendChild(catagorySpan)

  })
}


// loader (spinner) function
const toggleSpinner = isLoading => {
  const loaderSection = document.getElementById('loader')
  if (isLoading) {
    loaderSection.classList.remove('d-none')
  }
  else {
    loaderSection.classList.add('d-none')
  }
}


// news API added
const loadNewsDetails = (idNews) => {
  const url = `https://openapi.programming-hero.com/api/news/category/${idNews}`
  fetch(url)
    .then(res => res.json())
    .then(data => displayNewsDetails(data.data))
    .catch(error => console.log(error))
}

// news details added
const displayNewsDetails = news => {
  const newsDetail = document.getElementById('news-details');
  newsDetail.innerHTML = ``;
  toggleSpinner(true)

  // news sorting 
  news.sort((a, b) => {
    return b.total_view - a.total_view;
  });

  // total items in a catagory
  document.getElementById("news-details").innerHTML = `
  <div class="my-3 container border w-75 py-3"><span class="fw-bold"> ${news.length} </span> items found </div>`;

  news.forEach(i => {
    const newsDiv = document.createElement('div');
    newsDiv.innerHTML = `
      <div class="card mb-3 p-4 mx-5">
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
          <small class="fw-semibold">${i.author.name ? i.author.name : 'Not Found'} </small>
      </div>
      <div>
          <p >Total View:<span class="fw-semibold pe-4"> ${i.total_view ? i.total_view : 'No Data Available'}</span></p> 
      </div>
      <div>
          <span onclick="loadNewsDetailsModal('${i._id}')" data-bs-toggle="modal" data-bs-target="#newsDetailModal" class="fs-2 text fw-bold" style= "cursor:pointer"> → </span>
      </div>
      
    </div>
   </div>
  </div>
 </div>
</div>
        
        `;
    newsDetail.appendChild(newsDiv);

  })
  toggleSpinner(false)

}


// modal API added
const loadNewsDetailsModal = (id) => {
  const url = `https://openapi.programming-hero.com/api/news/${id}`;
  fetch(url)
    .then(res => res.json())
    .then(data => displayPhoneDetailsModal(data.data[0]))
    .catch(error => console.log(error))
}
// modal details added
const displayPhoneDetailsModal = idNum => {
  const modalTitle = document.getElementById('newsDetailModalLabel');
  modalTitle.innerText = idNum.title;

  const newsDetailsModalBody = document.getElementById('news-details-modal-body')
  newsDetailsModalBody.innerHTML = `

  <img src ="${idNum.author.img}" class="rounded-circle" style="width:3rem"></img>
  
  <small class="">${idNum.author.name ? idNum.author.name : 'Not Found'} </small>
  
  <p class="mt-2"><small>${idNum.author.published_date ? idNum.author.published_date : 'No Data Available'} </small></p>
  
  <p >Total View:<span class="fw-semibold mt-4"> ${idNum.total_view ? idNum.total_view : 'No Data Available'}</span></p> 
  
  <p >Ratings:<span class="fw-semibold mt-4"> ${idNum.rating.number ? idNum.rating.number : 'No Ratings Found'}</p>
  
  <p >Review:<span class="fw-semibold mt-4"> ${idNum.rating.badge ? idNum.rating.badge : 'No Review Found'}</p>
  `
}

loadNews()
