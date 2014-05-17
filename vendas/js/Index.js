/* JavaScript */

var Index = {

	init: function() {
		Index.setForm();
		Index.listProdutores();
	},

	setForm: function() {
		var form = document.getElementById('form');
		if(form) {
			form.onsubmit = function() {
				Index.saveProdutor(form);
				return false;
			};
		}
	},

	saveProdutor: function(form) {
		var produtor = {};
		produtor.nome  = form.nome.value;
		produtor.cidade = form.cidade.value;
		produtor.bairro = form.bairro.value;
		produtor.rua = form.rua.value;
		produtor.numero = form.numero.value;
		produtor.celular = form.celular.value;
		produtor.celular2 = form.celular2.value;
		
		if(ProdutorDAO.save(produtor) == ProdutorDAO.NEW) {
			TableController.addItem(produtor, Index.edit, Index.delete);
		}
		else {
			TableController.clearList();
			Index.listProdutores();
		}

		form.nome.value = form.cidade.value = form.bairro.value = form.rua.value = form.numero.value = form.celular.value = form.celular2.value = "";
	},

	setTable: function() {
		var table = document.getElementById('tabela-produtores');
		TableController.setTable(table);
	},

	listProdutores: function() {
		Index.setTable();
		var produtorList = ProdutorDAO.retrieve();
		if (produtorList && produtorList.length) {
			TableController.addList(produtorList, Index.edit, Index.delete);
		}
	}, 

	edit: function(nome) {
		if(confirm("Você deseja editar o produtor " + nome + " ?")) {
			var produtor = ProdutorDAO.get(nome);
			if (produtor) {
				var form = document.getElementById('form');
				form.nome.value  = produtor.nome;
				form.cidade.value = produtor.cidade;
				form.bairro.value = produtor.bairro;
				form.rua.value = produtor.rua;
				form.numero.value = produtor.numero;
				form.celular.value = produtor.celular;
				form.celular2.value = produtor.celular2;
				form.telefone.value = produtor.telefone;
			}
		}
	},

	delete: function(nome, element) {
		if(confirm("Você deseja deletar o produtor " + nome + " ?")) {
			var produtor = ProdutorDAO.get(nome);
			if (produtor) {
				if(ProdutorDAO.delete(nome)) {
					var row = element.parentNode.parentNode;
					row.parentNode.removeChild(row);
				}
			}	
		}
	}
};

//initialization
ProdutorDAO.unserializeAndParse();
Index.init();