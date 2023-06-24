var blocos = [];

// Carrega os dados do arquivo JSON
fetch('armarios.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    blocos = data.blocos;
    renderizarBlocos();
  });

// Função para renderizar os blocos e armários
function renderizarBlocos() {
  var container = document.getElementById('container');
  container.innerHTML = '';

  // Percorre os blocos
  for (var i = 0; i < blocos.length; i++) {
    var bloco = blocos[i];
    
    // Cria um elemento de bloco
    var blocoDiv = document.createElement('div');
    blocoDiv.className = 'bloco';
    blocoDiv.textContent = bloco.nome;

    // Cria um elemento para os armários
    var armariosDiv = document.createElement('div');
    armariosDiv.className = 'armarios';

    // Percorre os armários do bloco
    for (var j = 0; j < bloco.armarios.length; j++) {
      var armario = bloco.armarios[j];
      
      // Cria um elemento de armário
      var armarioDiv = document.createElement('div');
      armarioDiv.className = 'armario';
      armarioDiv.textContent = armario.numero;
      armarioDiv.style.backgroundColor = obterCorEstado(armario.estado);
      armarioDiv.setAttribute('data-indice-bloco', i);
      armarioDiv.setAttribute('data-indice-armario', j);
      armarioDiv.addEventListener('click', alterarEstado);
      armariosDiv.appendChild(armarioDiv);
    }

    // Adiciona os armários ao bloco
    blocoDiv.appendChild(armariosDiv);
    
    // Adiciona o bloco ao container
    container.appendChild(blocoDiv);
  }
}

// Função para obter a cor do estado do armário
function obterCorEstado(estado) {
  switch (estado) {
    case 'livre':
      return 'green';
    case 'ocupado':
      return 'red';
    case 'manutencao':
      return 'gold';
  }
}

// Função para alterar o estado do armário ao clicar
function alterarEstado() {
  var indiceBloco = parseInt(this.getAttribute('data-indice-bloco'));
  var indiceArmario = parseInt(this.getAttribute('data-indice-armario'));
  var armario = blocos[indiceBloco].armarios[indiceArmario];

  switch (armario.estado) {
    case 'livre':
      armario.estado = 'ocupado';
      break;
    case 'ocupado':
      armario.estado = 'manutencao';
      break;
    case 'manutencao':
      armario.estado = 'livre';
      break;
  }

  renderizarBlocos();
}
