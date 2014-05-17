/* JavaScript */

var Index = {

	init: function() {
		Index.setForm();
		Index.listCompradores();
	},

	setForm: function() {
		var form = document.getElementById('form');
		if(form) {
			form.onsubmit = function() {
				Index.saveComprador(form);
				return false;
			};
		}
	},

	saveComprador: function(form) {
		var comprador = {};
		comprador.nome  = form.nome.value;
		comprador.cidade = form.cidade.value;
		comprador.bairro = form.bairro.value;
		comprador.rua = form.rua.value;
		comprador.numero = form.numero.value;
		comprador.celular = form.celular.value;
		comprador.celular2 = form.celular2.value;
		comprador.telefone = form.telefone.value;
		
		if(CompradorDAO.save(comprador) == CompradorDAO.NEW) {
			TableController.addItem(comprador, Index.edit, Index.delete);
		}
		else {
			TableController.clearList();
			Index.listCompradores();
		}

		form.nome.value = form.cidade.value = form.bairro.value = form.rua.value = form.numero.value = form.celular.value = form.celular2.value = form.telefone.value = "";
	},

	setTable: function() {
		var table = document.getElementById('tabela-compradores');
		TableController.setTable(table);
	},

	listCompradores: function() {
		Index.setTable();
		var compradorList = CompradorDAO.retrieve();
		if (compradorList && compradorList.length) {
			TableController.addList(compradorList, Index.edit, Index.delete);
		}
	}, 

	edit: function(nome) {
		if(confirm("Você deseja editar o comprador " + nome + " ?")) {
			var comprador = CompradorDAO.get(nome);
			if (comprador) {
				var form = document.getElementById('form');
				form.nome.value  = comprador.nome;
				form.cidade.value = comprador.cidade;
				form.bairro.value = comprador.bairro;
				form.rua.value = comprador.rua;
				form.numero.value = comprador.numero;
				form.celular.value = comprador.celular;
				form.celular2.value = comprador.celular2;
				form.telefone.value = comprador.telefone;
			}
		}
	},

	delete: function(nome, element) {
		if(confirm("Você deseja deletar a comprador " + nome + " ?")) {
			var comprador = CompradorDAO.get(nome);
			if (comprador) {
				if(CompradorDAO.delete(nome)) {
					var row = element.parentNode.parentNode;
					row.parentNode.removeChild(row);
				}
			}	
		}
	}
};

//initialization
CompradorDAO.unserializeAndParse();
Index.init();