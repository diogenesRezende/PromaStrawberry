/* JavaScript */

var Index = {

	init: function() {
		Index.setForm();
		Index.listVariedades();
	},

	setForm: function() {
		var form = document.getElementById('form');
		if(form) {
			form.onsubmit = function() {
				Index.saveVariedade(form);
				return false; //to prevent the form submition
			};
		}
	},

	saveVariedade: function(form) {
		var variedade = {};
		variedade.nome  = form.nome.value;
		variedade.descricao = form.descricao.value;
		
		if(VariedadeDAO.save(variedade) == VariedadeDAO.NEW) {
			TableController.addItem(variedade, Index.edit, Index.delete);
		}
		else {
			TableController.clearList();
			Index.listVariedades();
		}

		form.nome.value = form.descricao.value = "";
	},

	setTable: function() {
		var table = document.getElementById('tabela-variedades');
		TableController.setTable(table);
	},

	listVariedades: function() {
		Index.setTable();
		var variedadeList = VariedadeDAO.retrieve();
		if (variedadeList && variedadeList.length) {
			TableController.addList(variedadeList, Index.edit, Index.delete);
		}
	}, 

	edit: function(nome) {
		if(confirm("Você deseja editar a variedade " + nome + " ?")) {
			var variedade = VariedadeDAO.get(nome);
			if (variedade) {
				var form = document.getElementById('form');
				form.nome.value  = variedade.nome;
				form.descricao.value = variedade.descricao;
			}
		}
	},

	delete: function(nome, element) {
		if(confirm("Você deseja deletar a variedade " + nome)) {
			var variedade = VariedadeDAO.get(nome);
			if (variedade) {
				if(VariedadeDAO.delete(nome)) {
					var row = element.parentNode.parentNode;
					row.parentNode.removeChild(row);
				}
			}	
		}
	}
};

//initialization
VariedadeDAO.unserializeAndParse();
Index.init();