// getting all required elements
const search = document.getElementById('search-box');
const matchList = document.getElementById('match-list');


const searchValues = async (searchText) => {
    const res = await fetch('https://jsonplaceholder.typicode.com/todos');
    const suggestions = await res.json();

    let matches = suggestions.filter(suggestion => {
        const regex = new RegExp(`^${searchText}`, 'gi');
        return suggestion.title.match(regex);
    });

    if (searchText.length === 0) {
        matches = [];
        matchList.innerHTML = '';
    }

    outputHTML(matches);
};

outputHTML = (matches) => {
    if (matches.length > 0) {
        const html = matches.map(match => `
        <div class="fas" id="item-list">
        <h4>${match.title}</h4>
        </div>
        `).join('');

        matchList.innerHTML = html;
    }
}


search.addEventListener('input', () => searchValues(search.value));