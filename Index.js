var Index = {

	init: function(){
		Index.localizacao();
		// Index.previsao();
	},
	localizacao: function(){
		var link = document.getElementById("link");
		
		link.addEventListener('click',function(){
			$.get("http://ipinfo.io", function (response) {
		    $("#cidade").html("Cidade: " + response.city );
		    $("#estado").html("Estado: " + response.region);
			}, "jsonp");
		});
	},
	// previsao: function(){
	// 	// var aux = cidade;
	// 	$.get("http://ipinfo.io", function (response) {
	// 		cidade = response.city;
	// 		estado = response.region;
	// 	}, "jsonp");
	// 	// alert(cidade);
	// 	// var aux = cidade.replace( /\s/g, '' );
	// 	// var link = "http://www.tempoagora.com.br/previsao-do-tempo/brasil/" + aux + "-MG";
	// 	// var str = 'teste teste teste teste ';  
	// 	// alert( 'string ANTES do replace: '+str );
	// 	// alert( 'strong DEPOIS do replace: '+str.replace( /\s/g, '' ) );
	// 	var previsao = document.getElementById("linkPrevisao");
	// 	previsao.addEventListener('click',function(){
	// 		// http://www.tempoagora.com.br/previsao-do-tempo/brasil/Estiva-MG
	// 		// previsao.href = link;

	// 	});
	// }

};
Index.init();