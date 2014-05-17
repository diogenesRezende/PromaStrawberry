/* JavaScript Document */

var VariedadeDAO = {

	DB_KEY: "variedades",
	NEW: 1,
	UPDATE: 2,

	list: [], 

	save: function(variedade, tableController) {
		var list  = VariedadeDAO.list,
		    index = VariedadeDAO.getIndex(variedade);
		
		if(index > -1) {
			list[index] = variedade;
			VariedadeDAO.serializeAndSave();
			return VariedadeDAO.UPDATE;
		}
		else {
			list.push(variedade);
			if(tableController) {
				tableController.addItem(variedade);
			}
		}
		
		VariedadeDAO.serializeAndSave();

		return VariedadeDAO.NEW;
	},

	retrieve: function() {
		var list = VariedadeDAO.list;
		if(list && list.length > 0) {
			return list;
		}
		return null;
	},

	get: function(nome) {
		var list  = VariedadeDAO.list,
		    index = VariedadeDAO.getIndex({'nome': nome});

		if (index > -1) {
			var variedade = list[index];
			return variedade;
		}

		return null;
	},

	getIndex: function(variedade) {
		var list = VariedadeDAO.list,
		    item = {};

		for (var i = 0; i < list.length; i++) {
			item = list[i];
			if(item.nome == variedade.nome) {
				return i;
			}
		}

		return -1;
	},

	delete: function(nome) {
		var list  = VariedadeDAO.list,
		    index = VariedadeDAO.getIndex({'nome': nome});

		if (index > -1) {
			list.splice(index, 1);
			VariedadeDAO.serializeAndSave();
			return true;
		}

		return false;
	},

	serializeAndSave: function() {
		var list = VariedadeDAO.list;
		if(list && list.length > 0) {
			var json = JSON.stringify(VariedadeDAO.list);
			window.localStorage.setItem(VariedadeDAO.DB_KEY, json);
		}
	},

	unserializeAndParse: function() {
		var json = window.localStorage.getItem(VariedadeDAO.DB_KEY);
		if(json) {
			VariedadeDAO.list = JSON.parse(json);
		}
		else {
			VariedadeDAO.list = [];
		}
	}

};
