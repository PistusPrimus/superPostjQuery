(function( $ ) {
 
var paramList = [];
var i = 0;
var strChip;
var count;

    $.fn.super = function( action,options ) {
   	
   	var defaults = {
            // These are the defaults.
            mode:"append"
        };
 
    var options = $.extend(defaults, options);  

 		/*TODO: Realizzare, sia per load che per get, un sistema di post e get dei rispettivi form/div interessati*/
 		//Mi manca la specifica dell'url
        if ( action === "post" ) {
        	$('.submit').click(function(){
        		i=0;
        		$(this).parent().find('.param').each(function(){
        			if(i === 0) //Alla prima iterazione del ciclo for-each seleziono il campo url 
        				paramList.push($(this).attr("data-url"));
        			else if (i===1 && options.mode=="append"){
        				//console.log($(this).attr("data-model"));
        				paramList.push($(this).attr("data-model"));
        				window.count = $(this).attr("data-model").split("{").length-1;
        			}
        			else //dopo di che inizio a preparare la lista di parametri per la post
        				paramList.push($(this).val());
        			i++;
        		});
        	//Now we can get the paramters by selecting them in the list and execute $.post function
        		$.post(paramList[0], { field1: paramList}, function(returnedData){
        			//console.log(returnedData);
        			if(options.mode == "append"){
        				var data = JSON.parse(returnedData);
         				//It print results by appending new elements when post ended(relativo al parametro in input: notify? append? entrambe?)
         				//alert('Utente registrato');
         				//Con il seguente codice sostituisco, all'interno del modello, i valori dinamici!
         		   		var template = data[0]["field1"][1]; //Rappresenta il template su cui effettuerò le varie sostituzioni
         				var html = ""; //html che andrò a generare
         				for (i=1; i<=window.count; i++){
         					strChip = "{"+i+"}";
         					//console.log(strChip);
         					template = template.replace(strChip,data[1][i-1]);
         				}
         				//"returnedData" mi deve rappresentare l'insieme dei risultati tornati dalla callback, li utilizzerò per effettuare le varie sostituzioni!
         				//Problema: se volessi generare + di un codice html dinamico??
         				//Si può anche, eventualmente, gestire la visibilità dei div, da hidden a visible, dopo che è stata eseguita la post (potrei usare una classe)
         				html = template;
         				console.log(html);
         				$('ul').append(html);
         			}else if(options.mode == "change"){
         				$('.bp').fadeOut();
         				var data = JSON.parse(returnedData);
         				$('.ap').each(function(){
         					$(this).fadeIn();
         					console.log($(this).html());
         					var subCount = $('.argNumber').attr("data-narg");
         					var template = $(this).html();

         					var html = "";
         					for (i=1;i<=subCount;i++){
         						//strChip = "{"+i+"}";
         						var regex = new RegExp("param"+i+"param", 'igm');
         						template = template.replace(regex,data[1][i-1]);
         					}
         					html = template;
         					console.log(html);
         					$(this).replaceWith(html);
         				});
         			}
				});
				paramList=[]; //Resetto i parametri altrimenti passo i parametri vecchi per post successive!
				i = 0;
				count = 0;

        	});
        }
        if ( action === "get" ) {
        	/*TODO: GET*/
        }
 
    };
 
}( jQuery ));