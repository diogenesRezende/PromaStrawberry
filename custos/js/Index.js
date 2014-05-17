/* JavaScript */

var Index = {

	init: function() {
		Index.setForm();
		Index.listCustos();
	},

	setForm: function() {
		var form = document.getElementById('form');
		if(form) {
			form.onsubmit = function() {
				Index.saveCusto(form);
				return false;
			};
		}
	},

	saveCusto: function(form) {
		var custo = {};
		custo.nome  = form.nome.value;
		custo.valor = form.valor.value;
		
		if(CustoDAO.save(custo) == CustoDAO.NEW) {
			TableController.addItem(custo, Index.edit, Index.delete);
		}
		else {
			TableController.clearList();
			Index.listCustos();
		}

		form.nome.value = form.valor.value = "";
		TableController.updateTotal();
	},

	setTable: function() {
		var table = document.getElementById('tabela-custos');
		TableController.setTable(table);
	},

	listCustos: function() {
		Index.setTable();
		var custoList = CustoDAO.retrieve();
		if (custoList && custoList.length) {
			TableController.addList(custoList, Index.edit, Index.delete);
		}
	}, 

	edit: function(nome) {
		if(confirm("Você deseja editar o custo " + nome + " ?")) {
			var custo = CustoDAO.get(nome);
			if (custo) {
				var form = document.getElementById('form');
				form.nome.value  = custo.nome;
				form.valor.value = custo.valor;
			}
		}
	},

	delete: function(nome, element) {
		if(confirm("Você deseja deletar o custo " + nome + " ?")) {
			var custo = CustoDAO.get(nome);
			if (custo) {
				if(CustoDAO.delete(nome)) {
					var row = element.parentNode.parentNode;
					row.parentNode.removeChild(row);
					TableController.updateTotal();
				}
			}	
		}
	}
};

//initialization
CustoDAO.unserializeAndParse();
Index.init();