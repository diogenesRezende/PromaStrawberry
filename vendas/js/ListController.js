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
},
loadSelects: function() {
	ListController.setVariedade();
	ListController.setProdutor();
	ListController.setComprador();
}

};