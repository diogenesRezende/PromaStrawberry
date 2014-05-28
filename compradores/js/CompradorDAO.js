/* JavaScript Document */

var CompradorDAO = {

	DB_KEY: "compradores",
	NEW: 1,
	UPDATE: 2,

	list: [], 

	save: function(comprador, tableController) {
		var list  = CompradorDAO.list,
		    index = CompradorDAO.getIndex(comprador);
		
		if(index > -1) {
			list[index] = comprador;
			CompradorDAO.serializeAndSave();
			return CompradorDAO.UPDATE;
		}
		else {
			list.push(comprador);
			if(tableController) {
				tableController.addItem(comprador);
			}
		}
		
		CompradorDAO.serializeAndSave();

		return CompradorDAO.NEW;
	},

	retrieve: function() {
		var list = CompradorDAO.list;
		if(list && list.length > 0) {
			return list;
		}
		alert("deu null!");
	},

	get: function(nome) {
		var list  = CompradorDAO.list,
		    index = CompradorDAO.getIndex({'nome': nome});

		if (index > -1) {
			var comprador = list[index];
			return comprador;
		}

		return null;
	},

	getIndex: function(comprador) {
		var list = CompradorDAO.list,
		    item = {};

		for (var i = 0; i < list.length; i++) {
			item = list[i];
			if(item.nome == comprador.nome) {
				return i;
			}
		}

		return -1;
	},

	delete: function(nome) {
		var list  = CompradorDAO.list,
		    index = CompradorDAO.getIndex({'nome': nome});

		if (index > -1) {
			list.splice(index, 1);
			CompradorDAO.serializeAndSave();
			return true;
		}

		return false;
	},

	serializeAndSave: function() {
		var list = CompradorDAO.list;
		if(list && list.length > 0) {
			var json = JSON.stringify(CompradorDAO.list);
			window.localStorage.setItem(CompradorDAO.DB_KEY, json);
		}
	},

	unserializeAndParse: function() {
		var json = window.localStorage.getItem(CompradorDAO.DB_KEY);
		if(json) {
			CompradorDAO.list = JSON.parse(json);
		}
		else {
			CompradorDAO.list = [];
		}
	}

};
