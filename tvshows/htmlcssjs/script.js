document.addEventListener('DOMContentLoaded', function() {
    const apiUrl = 'https://api.tvmaze.com/singlesearch/shows?q=shameless';

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            document.getElementById('show-name').textContent = data.name;
            document.getElementById('show-image').src = data.image.original;
            document.getElementById('show-genres').textContent = data.genres.join(', ');
            document.getElementById('show-status').textContent = data.status;
            document.getElementById('show-rating').textContent = data.rating.average;
            document.getElementById('show-official-site').href = data.officialSite;
            document.getElementById('show-summary').innerHTML = data.summary;

            return fetch(`https://api.tvmaze.com/shows/${data.id}?embed=cast`);
        })
        .then(response => response.json())
        .then(data => {
            const castList = data._embedded.cast;
            const castElement = document.getElementById('show-cast');
            castList.forEach(cast => {
                const li = document.createElement('li');
                li.textContent = `${cast.person.name} as ${cast.character.name}`;
                castElement.appendChild(li);
            });
        })
        .catch(error => console.error('Error fetching data:', error));

    document.getElementById('toggle-cast').addEventListener('click', function() {
        const castList = document.getElementById('show-cast');
        if (castList.style.display === 'none' || castList.style.display === '') {
            castList.style.display = 'block';
            this.textContent = 'Hide Cast';
        } else {
            castList.style.display = 'none';
            this.textContent = 'Show Cast';
        }
    });
    document.getElementById('show-cast').style.display = 'none';
});
