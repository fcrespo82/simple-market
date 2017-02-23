'use strict';
var app = angular.module('SimpleMarket')

app.controller('ProdutosCtrl',
[ '$scope', '$http', 'GitHubService', function($scope, $http, GitHubService) {
	var self = this;

	$http.get('data/produtos.json').then(function(data) {
		var status = localStorage.getItem("status");
		if (status == null) {
			for (var i = 0; i < data.length; i++) {
				//var id = data[i].id;
				var nome = data[i].nome;
				var comprado = data[i].comprado;
				// var produto = localStorage.getItem(id,nome,comprado);
				// if (produto == null){
				localStorage.setItem(nome, comprado);
				//}
			}
			console.log(JSON.stringify(localStorage));
			localStorage.setItem("status", "importado"); //localStorage.setItem(produtos.id,JSON.stringify(produtos));  
		}
		// $scope.lista = [{"nome":"Arroz","comprado":"nao"},
		// {"nome":"Batata","comprado":"nao"},
		// {"nome":"Café","comprado":"nao"},
		// {"nome":"Detergente","comprado":"nao"},
		// {"nome":"Espinafre","comprado":"nao"},
		// {"nome":"Farinha","comprado":"nao"},
		// {"nome":"Goiaba","comprado":"nao"},
		// {"nome":"Hamburguer","comprado":"nao"},
		// {"nome":"Inseticida","comprado":"nao"}];

		$scope.lista = localStorage;		
		$scope.atualiza();
		
	});
	
	$scope.atualiza = function(){
		var listaComprados = [];
		var listaNaoComprados = [];
		
		for(var i=0, len=localStorage.length; i<len; i++) {
			var key = localStorage.key(i);
			var value = localStorage[key];
			if(value =="sim"){
				listaComprados.push(key);
				console.log(key + " => " + value);					
				console.log(listaComprados);	
			}else{				
				listaNaoComprados.push(key);
			}
		}
		
		$scope.listaComprados = listaComprados;
		$scope.listaNaoComprados = listaNaoComprados;
				
	}
		
	$scope.selecionar = function(key) {
		$scope.inputNome = key;
	}
		
	$scope.comprarProduto = function(key) {
		localStorage.setItem(key, "sim");
		$scope.atualiza();
	}

	$scope.devolverProduto = function(key) {
		localStorage.setItem(key, "nao");
		$scope.atualiza();
	}

	$scope.adicionarProduto = function(key) {
		localStorage.setItem(key, "nao");
		$scope.inputNome = '';
		$scope.atualiza();
	}

	$scope.removerProduto = function(key) {
		localStorage.removeItem(key);
		$scope.inputNome = '';
		$scope.atualiza();
	}
	
	$scope.finalizar = function(){
		var nome, status;
		var textToWrite;
		//var data = new Date().getTime();
		var prod = $('.list-group-item>b').length;
		$scope.listaComprados = [];
		$scope.listaNaoComprados = [prod];
		alert("Finalizando Lista com "+ (prod - 1) +" produtos");

		$('.list-group-item>b').each(function(){
			//status = 'nao';
			nome = $(this).text();
			var comprado = $(this).parent().hasClass('list-group-item-success');
			comprado ? status = 'sim': status = 'nao';
			textToWrite += '{"nome":"'+nome+'","comprado":"'+status+'"},\n';
			//Limpa a lista
			$scope.devolverProduto(nome);
		});
		textToWrite = textToWrite.replace("undefined","[\n");   
		textToWrite = textToWrite.replace(",\n{\"nome\":\"status\",\"comprado\":\"nao\"},","\n]");		

		var textFileAsBlob = new Blob([textToWrite], {type:'text/json'});
		//var fileNameToSaveAs = "produtos"+ data +".json";
		var fileNameToSaveAs = "produtos.json";

		var downloadLink = document.createElement("a");
		downloadLink.download = fileNameToSaveAs;
		downloadLink.innerHTML = "Baixar arquivo";
		if (window.URL != null)
		{
			// Para webkit
			downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
		}
		else
		{
			// Para o Firefox
			downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
			downloadLink.onclick = destroyClickedElement;
			downloadLink.style.display = "none";
			document.body.appendChild(downloadLink);
		}

		downloadLink.click();
	}
	//workaround para disponibilizar Download
	function destroyClickedElement(event)
	{
	document.body.removeChild(event.target);
	}

} ]);
