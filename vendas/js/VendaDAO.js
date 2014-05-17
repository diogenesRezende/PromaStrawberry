/* JavaScript Document */

var ProdutorDAO = {

	DB_KEY: "produtores",
	NEW: 1,
	UPDATE: 2,

	list: [], 

	save: function(produtor, tableController) {
		var list  = ProdutorDAO.list,
		    index = ProdutorDAO.getIndex(produtor);
		
		if(index > -1) {
			list[index] = produtor;
			ProdutorDAO.serializeAndSave();
			return ProdutorDAO.UPDATE;
		}
		else {
			list.push(produtor);
			if(tableController) {
				tableController.addItem(produtor);
			}
		}
		
		ProdutorDAO.serializeAndSave();

		return ProdutorDAO.NEW;
	},

	retrieve: function() {
		var list = ProdutorDAO.list;
		if(list && list.length > 0) {
			return list;
		}
		return null;
	},

	get: function(nome) {
		var list  = ProdutorDAO.list,
		    index = ProdutorDAO.getIndex({'nome': nome});

		if (index > -1) {
			var produtor = list[index];
			return produtor;
		}

		return null;
	},

	getIndex: function(produtor) {
		var list = ProdutorDAO.list,
		    item = {};

		for (var i = 0; i < list.length; i++) {
			item = list[i];
			if(item.nome == produtor.nome) {
				return i;
			}
		}

		return -1;
	},

	delete: function(nome) {
		var list  = ProdutorDAO.list,
		    index = ProdutorDAO.getIndex({'nome': nome});

		if (index > -1) {
			list.splice(index, 1);
			ProdutorDAO.serializeAndSave();
			return true;
		}

		return false;
	},

	serializeAndSave: function() {
		var list = ProdutorDAO.list;
		if(list && list.length > 0) {
			var json = JSON.stringify(ProdutorDAO.list);
			window.localStorage.setItem(ProdutorDAO.DB_KEY, json);
		}
	},

	unserializeAndParse: function() {
		var json = window.localStorage.getItem(ProdutorDAO.DB_KEY);
		if(json) {
			ProdutorDAO.list = JSON.parse(json);
		}
		else {
			ProdutorDAO.list = [];
		}
	}

};
