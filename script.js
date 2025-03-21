document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('changeTextButton')?.addEventListener('click', function() {
        var userInput = document.getElementById('userInput')?.value;
        if (userInput) {
            document.getElementById('textToChange').innerText = userInput;
        }
    });

    function fetchNews() {
        const apiKey = '993202ea30b74b8caf63e6418162d099';
        const category = 'technology';
        const url = `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${apiKey}&pageSize=10`;

        fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const news = data.articles;
            let newsContainer = document.getElementById('newsContainer');
            if (!newsContainer) return;
            
            newsContainer.innerHTML = '';
            news.forEach(article => {
                const articleElement = document.createElement('div');
                articleElement.className = "col-md-4";
                articleElement.innerHTML = `
                    <div class="card h-100">
                        <img src="${article.urlToImage || 'https://via.placeholder.com/150'}" class="card-img-top" alt="News Image">
                        <div class="card-body">
                            <h5 class="card-title">${article.title}</h5>
                            <p class="card-text">${article.description || 'No description available.'}</p>
                            <a href="${article.url}" target="_blank" class="btn btn-primary">Read more</a>
                        </div>
                    </div>
                `;
                newsContainer.appendChild(articleElement);
            });
        })
        .catch(error => console.error('Error fetching news:', error));
    }

    fetchNews();
});