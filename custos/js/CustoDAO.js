/* JavaScript Document */

var CustoDAO = {

	DB_KEY: "custos",
	NEW: 1,
	UPDATE: 2,

	list: [], 

	save: function(custo, tableController) {
		var list  = CustoDAO.list,
		    index = CustoDAO.getIndex(custo);
		
		if(index > -1) {
			list[index] = custo;
			CustoDAO.serializeAndSave();
			return CustoDAO.UPDATE;
		}
		else {
			list.push(custo);
			if(tableController) {
				tableController.addItem(custo);
			}
		}
		
		CustoDAO.serializeAndSave();

		return CustoDAO.NEW;
	},

	retrieve: function() {
		var list = CustoDAO.list;
		if(list && list.length > 0) {
			return list;
		}
		return null;
	},

	get: function(nome) {
		var list  = CustoDAO.list,
		    index = CustoDAO.getIndex({'nome': nome});

		if (index > -1) {
			var custo = list[index];
			return custo;
		}

		return null;
	},

	getTotal: function() {
		var 
		list = CustoDAO.list,
		soma = 0.0;
		for (var i = 0; i < list.length; i++) {
			soma = ((parseFloat(soma)) + (parseFloat(list[i].valor)));
		};
		return soma;
	},

	getIndex: function(custo) {
		var list = CustoDAO.list,
		    item = {};

		for (var i = 0; i < list.length; i++) {
			item = list[i];
			if(item.nome == custo.nome) {
				return i;
			}
		}

		return -1;
	},

	delete: function(nome) {
		var list  = CustoDAO.list,
		    index = CustoDAO.getIndex({'nome': nome});

		if (index > -1) {
			list.splice(index, 1);
			CustoDAO.serializeAndSave();
			return true;
		}

		return false;
	},

	serializeAndSave: function() {
		var list = CustoDAO.list;
		if(list && list.length > 0) {
			var json = JSON.stringify(CustoDAO.list);
			window.localStorage.setItem(CustoDAO.DB_KEY, json);
		}
	},

	unserializeAndParse: function() {
		var json = window.localStorage.getItem(CustoDAO.DB_KEY);
		if(json) {
			CustoDAO.list = JSON.parse(json);
		}
		else {
			CustoDAO.list = [];
		}
	}

};
