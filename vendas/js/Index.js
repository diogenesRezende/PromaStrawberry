/* JavaScript */

var Index = {

	init: function() {
		Index.setForm();
		Index.setDateToday();
		Index.listVendas();
		ListController.loadSelects();
	},

	setForm: function() {
		var form = document.getElementById('form');
		if(form) {

			// document.getElementById('date').value = new Date().toDateInputValue();
			form.onsubmit = function() {
				Index.saveVenda(form);
				return false;
			};
		}
	},
	setDateToday:function() {
		var today = new Date();
		var day = today.getDate();
		var month = today.getMonth()+1;
		var year = today.getFullYear();
		var result = day +'-' + month+'-'+year;
		document.getElementById("date").value = result;
	},

	saveVenda: function(form) {
		var venda = {};
		venda.produtor  = form.listProdutor.value;
		venda.comprador = form.listComprador.value;
		venda.date = form.date.value;
		venda.quantidade = form.quantidade.value;
		venda.variedade = form.listVariedade.value;
		venda.preco = form.preco.value;
		
		if(VendaDAO.save(venda) == VendaDAO.NEW) {
			TableController.addItem(venda, Index.edit, Index.delete);
		}
		else {
			TableController.clearList();
			Index.listVendas();
		}

		form.quantidade.value = form.listComprador.value = form.listVariedade.value = form.date.value = form.listProdutor.value = form.preco.value = "";
	},

	setTable: function() {
		var table = document.getElementById('tabela-vendas');
		TableController.setTable(table);
	},

	listVendas: function() {
		Index.setTable();
		var vendaList = VendaDAO.retrieve();
		if (vendaList && vendaList.length) {
			TableController.addList(vendaList, Index.edit, Index.delete);
		}
	}, 

	edit: function(venda) {
		if(confirm("Você deseja editar a venda de" + venda + " ?")) {
			var venda = VendaDAO.get(venda);
			if (venda) {
				var form = document.getElementById('form');
				form.listProdutor.value  = venda.produtor;
				form.listComprador.value = venda.comprador;
				form.date.value = venda.date;
				form.quantidade.value = venda.quantidade;
				form.listVariedade.value = venda.variedade;
				form.preco.value = venda.preco;
			}
		}
	},

	delete: function(venda, element) {
		if(confirm("Você deseja deletar a venda de " + venda + " ?")) {
			var venda = VendaDAO.get(venda);
			if (venda) {
				if(VendaDAO.delete(venda)) {
					var row = element.parentNode.parentNode;
					row.parentNode.removeChild(row);
				}
			}	
		}
	}
};

//initialization
VendaDAO.unserializeAndParse();
Index.init();