var ListController = {

setVariedade: function() {
	VariedadeDAO.unserializeAndParse();
	var list = VariedadeDAO.retrieve();
	var selectVariedade = document.getElementById('listVariedade');
	if(list){
		for (var i = 0; i < list.length; i++) {
			var option = document.createElement('option');
			option.text = list[i].nome;
			selectVariedade.add(option);
		};	
	}
	if(list.length == 1){
		selectVariedade.value = list[0].nome;
	}
	
},
setComprador: function() {
	CompradorDAO.unserializeAndParse();
	var list = CompradorDAO.retrieve();
	var selectComprador = document.getElementById('listComprador');
	if(list){
		for (var i = 0; i < list.length; i++) {
			var option = document.createElement('option');
			option.text = list[i].nome;
			selectComprador.add(option);
		};	
	}
	if(list.length == 1){
		selectComprador.value = list[0].nome;
	}
},
setProdutor:function() {
	ProdutorDAO.unserializeAndParse();
	var list = ProdutorDAO.retrieve();
	var selectProdutor = document.getElementById('listProdutor');
	if(list){
		for (var i = 0; i < list.length; i++) {
			var option = document.createElement('option');
			option.text = list[i].nome;
			selectProdutor.add(option);
		};	
	}
	if(list.length == 1){
		selectProdutor.value = list[0].nome;
	}
},
loadSelects: function() {
	ListController.setVariedade();
	ListController.setProdutor();
	ListController.setComprador();
}

};