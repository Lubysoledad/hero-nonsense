

$('#btn').on('click', function(e) {
    e.preventDefault();
    let heroId = $('#character-id').val();
    getHeroInfo(heroId);
});


function getHeroInfo(id) {
    if (isNaN(id)) {
        alert('Por favor, ingresa un número');
    } else {
        $.ajax({
            url: `https://www.superheroapi.com/api.php/4905856019427443/${id}`,
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                displayHeroInfo(data);
                displayChart(data);
            },
            error: function() {
                alert('Hubo un error en la búsqueda');
            }
        });
    }
}

function displayHeroInfo(data) {
    let html = `
        <div class="card" style="width: 18rem;">
            <img src="${data.image.url}" class="card-img-top" alt="${data.name}">
            <div class="card-body">
                <h5 class="card-title">${data.name}</h5>
                <p class="card-text">${data.biography['full-name']}</p>
            </div>
        </div>
    `;
    $('#infoHero').html(html);
}


// customizando colores pq a una le gusta complicarse la vida con tonteras innecesarias🫡
CanvasJS.addColorSet("customColorSet", [
    "#F21D2F",
    "#2E338C",
    "#05C7F2",
    "#F2E205",
    "#F2A30F",
    "#B46155",
    "#5857D6",
    "#8B3D6A",
    "#2B66E2",
    "#C2D759",
   ]);

function displayChart(data) {
    let chart = new CanvasJS.Chart("chartContainer", {
        colorSet: "customColorSet",
        data: [{
            type: "pie",
            dataPoints: [
                { label: "Intelligence", y: data.powerstats.intelligence },
                { label: "Strength", y: data.powerstats.strength },
                { label: "Speed", y: data.powerstats.speed },
                { label: "Durability", y: data.powerstats.durability },
                { label: "Power", y: data.powerstats.power },
                { label: "Combat", y: data.powerstats.combat }
            ]
        }]
    });
    chart.render();
}

//me costó mucho y quedó todo feo :c me dió toda la amnesia cuando empecé a hacerlo. 