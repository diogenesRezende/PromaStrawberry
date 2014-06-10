var Index = {


	calcularMedia:function(variedade){
		var soma = Index.calcularSoma(variedade);
		var quantidade = Index.contador(variedade);
		if(quantidade != 0){
			var media = soma / quantidade;
			media = media.toFixed(2);
			return media;
		} else {
			console.log("Não foi possível encontrar registros de venda da variedade " + variedade);
			return "-----";
		}

	},
	calcularSoma:function(variedade){
		var soma = parseInt(0);

		VendaDAO.unserializeAndParse();
		var listVendas = VendaDAO.retrieve();

		for (var i = 0; i < listVendas.length; i++) {
			if(variedade == listVendas[i].variedade)
			soma = parseInt(soma) + parseInt(listVendas[i].quantidade);
		};
		// alert("soma :" + soma);
		if(soma == 0){
			return "-----";
		}
		return soma;

	},
	contador:function(variedade){
		var contador = 0;

		VendaDAO.unserializeAndParse();
		var listVendas = VendaDAO.retrieve();

		for (var i = 0; i < listVendas.length; i++) {
			if(variedade == listVendas[i].variedade){
				contador++;
			}
		};
		// alert("contador : " + contador);
		return contador;
	},
	carregarTabela:function(){
		var tabela = document.getElementById("tbody");

		VariedadeDAO.unserializeAndParse();
		var listVariedade = VariedadeDAO.retrieve();

		var nome,
			soma,
			media;

		for (var i = 0; i < listVariedade.length; i++) {
			nome = listVariedade[i].nome;
			soma = Index.calcularSoma(nome);
			media = Index.calcularMedia(nome);

			var row = Index.createNewRow(),
				index = 0;
			
			row.cells[index++].innerHTML = nome;
			row.cells[index++].innerHTML = soma
			row.cells[index++].innerHTML = media;

			tabela.appendChild(row);
		}
	},
		
	createNewRow: function() {
		var row = document.createElement('tr');
		row.appendChild(document.createElement('td'));
		row.appendChild(document.createElement('td'));
		row.appendChild(document.createElement('td'));
		return row;
	}
	
}
Index.carregarTabela();