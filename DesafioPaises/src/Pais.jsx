import './main.css';

fetch('./paises.json')
  .then(res => res.json())
  .then(dados => {
    // Ordena os dados em ordem alfabética pelo nome dos países
    dados.sort((a, b) => a.name.localeCompare(b.name));
    mostraPais(dados);
  });

function mostraPais(dados) {
  const tabela = document.querySelector("#paises");
  const total = document.querySelector("#totalp");
  const totalFavoritos = document.querySelector("#totalFavoritos");
  const favoritos = document.querySelector("#favoritos");
  const populacaoTotal = document.querySelector("#populacaoTotal");

  total.innerHTML = `${dados.length}`;
  totalFavoritos.innerHTML = `Total de Favoritos = 0`;

  var totalPopulation = 0;

  dados.forEach(item => {
    tabela.innerHTML += `<tr class="tbl">
                          <td class="texto">${item.numericCode}</td>
                          <td class="texto">${item.name}</td>
                          <td class="texto">${item.population}</td>
                          <td><img src=${item.flag}></td>
                          <td><input type="checkbox" class="checkbox" data-name="${item.name}" data-flag="${item.flag}" data-population="${item.population}"><p>Favoritar / Desfavoritar</p></td>
                        </tr>`;
    totalPopulation += Number(item.population);
  });

  populacaoTotal.innerHTML = `${totalPopulation}`;

  document.querySelectorAll('.checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', function () {
      const name = this.getAttribute('data-name');
      const flag = this.getAttribute('data-flag');
      const population = Number(this.getAttribute('data-population'));

      if (this.checked) {
        const novoFavorito = document.createElement('tr');
        novoFavorito.className = 'tbl favorito';
        novoFavorito.setAttribute('data-name', name);
        novoFavorito.setAttribute('data-population', population);
        novoFavorito.innerHTML = `
          <td class="texto">${name}</td>
          <td><img src=${flag} data-name="${name}" data-flag="${flag}" data-population="${population}"></td>
        `;
        favoritos.appendChild(novoFavorito);
        totalPopulation -= population;
        populacaoTotal.innerHTML = totalPopulation;
        total.innerHTML = parseInt(total.innerHTML) - 1;
      } else {
        document.querySelector(`tr.favorito[data-name="${name}"]`).remove();
        totalPopulation += population;
        populacaoTotal.innerHTML = totalPopulation;
        total.innerHTML = parseInt(total.innerHTML) + 1;
      }

      attfavs();
      attPopulacaoTotalFavoritos();
      ordenaFavoritos(); // Adicione esta linha para ordenar os favoritos
    });
  });
}

function attfavs() {
  const totalFavoritos = document.querySelector("#totalFavoritos");
  const favoritosRows = document.querySelectorAll('tr.favorito');

  totalFavoritos.innerHTML = `Total de Favoritos = ${favoritosRows.length}`;
}

function attPopulacaoTotalFavoritos() {
  const populacaoTotalFavoritos = document.querySelector("#populacaoTotalFavoritos");
  const favoritosRows = document.querySelectorAll('tr.favorito');
  let totalPopulation = 0;

  favoritosRows.forEach(row => {
    totalPopulation += Number(row.getAttribute('data-population'));
  });

  populacaoTotalFavoritos.innerHTML = `População dos Favoritos = ${totalPopulation}`;
}

// Função para ordenar a tabela de favoritos
function ordenaFavoritos() {
  const favoritos = document.querySelector("#favoritos");
  const favoritosRows = Array.from(document.querySelectorAll('tr.favorito'));

  favoritosRows.sort((a, b) => a.getAttribute('data-name').localeCompare(b.getAttribute('data-name')));

  favoritos.innerHTML = `
    <tr id='fav'>
      <td class='textos'>NOME</td>
      <td class='textos'>BANDEIRA</td>
    </tr>
  `;
  
  favoritosRows.forEach(row => favoritos.appendChild(row));
}

function Pais() {
  return (
    <>
      <div id='tudo'>
        <div>
          <div><h1 id='txttt'>Total de países: </h1><h1 id='totalp'></h1></div><br />
          <h1 id='poptotal'>População total: </h1>
          <div id="populacaoTotal"></div>
          <table id="paises">
            <tr>
              <td className='textos'>ID</td>
              <td className='textos'>NOME</td>
              <td className='textos'>POPULAÇÃO</td>
              <td className='textos'>BANDEIRA</td>
              <td className='textos'>FAVORITO</td>
            </tr>
          </table>
        </div>
        <div>
          <div><h2 id='totalFavoritos' class='texto'></h2></div>
          <h2 class='texto'>Favoritos</h2>
          <h2 id="populacaoTotalFavoritos" class='texto'></h2>
          <table id="favoritos">
            <tr id='fav'>
              <td className='textos'>NOME</td>
              <td className='textos'>BANDEIRA</td>
            </tr>
          </table>
        </div>
      </div>
    </>
  );
}

export default Pais;
