// Attraverso una chiamata ajax all’Api di boolean avremo a disposizione una decina di dischi musicali.
// Servendoci di handlebars stampiamo tutto a schermo. In questo momento non è importante la parte grafica.
// quindi qua o rifacciamo da capo o finiamo il layout come da screeshot (che vi metto sotto).
// Creare una select con i seguenti generi: pop, rock, metal e jazz. In base a cosa scegliamo nella select vedremo i corrispondenti cd.

// variabili handlebars
var source = $("#album-template").html();
var template = Handlebars.compile(source);

// imposto di default il valore vuoto per il select
$("select").val("");

// eseguo chiamata ajax
$.ajax({
	url: "https://flynn.boolean.careers/exercises/api/array/music",

	method: "GET",

	success: function (data, stato) {
		// salvo in una variabile il risultato della chimata
		var dataResult = data.response;
		console.log(dataResult);
		console.log(stato);

		//  eseguo ciclo per stampare in pagina il template con la relativa immagine, nome album e autore
		for (var i = 0; i < dataResult.length; i++) {
			// ad ogni iterazione i segnaposto del template assumono valori diversi
			var context = {
				album: dataResult[i].poster,
				title: dataResult[i].title,
				author: dataResult[i].author,
				year: dataResult[i].year,
				genere: dataResult[i].genre.toLowerCase(),
			};

			var generiMusicali = dataResult[i].genre;
			console.log(generiMusicali);

			var html = template(context);

			// stampo in pagina il template
			$(".container").append(html);

			// aggancio l'evento input al select
			$("select").on({
				input: function () {
					var valInput = $("select").val();
					console.log(valInput);
					$(".cover").hide();
					console.log($(this));

					$(".cover").each(function () {
						var genereCover = $(this).data("genere");
						if (valInput == genereCover) {
							$(this).show();
						}
					});

					if (valInput == "all") {
						$(".cover").show();
					}
				},
			});
		}
	},

	error: function (richiesta, stato, errore) {},
});
