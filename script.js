const API_KEY = "f7617d6aee0b448c98432acedfbb70f5";
const URL = "https://newsapi.org/v2/everything?q=";
const logo = document.getElementById('logo');
const searchButton = document.getElementById("submit-button");
const searchText = document.getElementById("search-bar");
let selectedTab = null;

window.addEventListener('load', ()=>{
    fetchNews('latest news');
})

logo.addEventListener('click', ()=>{
    window.location.reload();
})

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    selectedTab.classList.remove("active");
    selectedTab = null;
});

async function fetchNews(search){
    const res = await fetch(`${URL}${search}&apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
}

function bindData(articles){
    const cardContainer = document.getElementById("cards-container");
    const template = document.getElementById("template-news-card");
    cardContainer.innerHTML = '';
    articles.forEach((article) => {
        if(!article.urlToImage) return;
        const card = template.content.cloneNode(true);
        dataIntoCards(card, article);
        cardContainer.appendChild(card);
    });
}

function dataIntoCards(card, article){
    const newsImg = card.getElementById('news-img');
    const title = card.getElementById("news-title");
    const source = card.getElementById("news-source");
    const desc = card.getElementById("news-desc");
    newsImg.src = article.urlToImage;
    title.innerHTML = article.title;
    desc.innerHTML = article.description;
    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });
    source.innerHTML = `${article.source.name} • ${date}`;
    card.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}

function searchFor(search) {
    fetchNews(search);
}

function changeNewsTab(search){
    fetchNews(search);
    if(selectedTab != null) selectedTab.classList.remove('active');
    selectedTab = document.getElementById(search);
    selectedTab.classList.add('active');
}