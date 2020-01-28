document.getElementById('formulario').addEventListener('submit', cadastraveiculo);

function cadastraveiculo(e){
    var modelocarro = document.getElementById('modelocarro').value;
    var placacarro = document.getElementById('placacarro').value;
    var time = new Date();
    
    
    if(!modelocarro && !placacarro){
        alert("Por Favor, Prencher os campos em brancos");
        return false;
    }
    
    
    carro = {
        modelo: modelocarro,
        placa: placacarro,
        hora: time.getHours(),
        minutos: time.getMinutes()}
    
    if(localStorage.getItem('patio2') === null){
        var carros = [];
        carros.push(carro);
        localStorage.setItem('patio2', JSON.stringify(carros));
    }else{
        var carros = JSON.parse(localStorage.getItem('patio2'));
        carros.push(carro);
        localStorage.setItem('patio2', JSON.stringify(carros));
    }
    document.getElementById('formulario').reset();
    mostraPatio();
    
    e.preventDefault();
}

function apagarVeiculo(placa){
    
   var carros = JSON.parse(localStorage.getItem('patio2'));
    
    
    for(var i = 0; i < carros.length; i++){
        if(carros[i].placa == placa){
            carros.splice(i, 1);
            
        }
        localStorage.setItem('patio2',JSON.stringify(carros));
    }
    mostraPatio();
}

function mostraPatio(){
    var carros = JSON.parse(localStorage.getItem('patio2'));
    var carrosResultado = document.getElementById('resultados');
    
    carrosResultado.innerHTML = '';
    for(var i = 0; i < carros.length; i++){
        var modelo = carros[i].modelo;
        var placa = carros[i].placa;
        var hora = carros[i].hora;
        var minutos = carros[i].minutos;
        
        carrosResultado.innerHTML += '<tr><td>' + modelo +
            '</td><td>' + placa +
            '</td><td>' + hora + ' : ' + minutos +
            '</td><td><button class="btn btn-danger" onclick="apagarVeiculo(\'' + placa + '\')">Excluir</button></td>' +
                '</tr>'
        
        
    }
    
}