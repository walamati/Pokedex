function renderChart(singlePokemon) {
  const ctx = document.getElementById('myChart');
  const labels = [];
  const data = []

  for (let j = 0; j < singlePokemon.stats.length; j++) {
    labels.push(singlePokemon.stats[j].stat.name);
    data.push(singlePokemon.stats[j].base_stat);
  }

  new Chart(ctx, {
    type: 'radar',
    data: {
      labels: labels,
      datasets: [{
        label: `Data of ${singlePokemon['name']}`,
        data: data,
        borderWidth: 1
      }]
    },
    options: {
      plugins: {
        legend: {
            labels: {
                font: {
                    size: 16
                }
            }
        }
    },
      scales: {
       r: {
        beginAtZero : true,
        min: 0,
        max: 140,
        pointLabels: {
          font: {
            size: 14
          }
        }
       }
      }
    }
  });
}
