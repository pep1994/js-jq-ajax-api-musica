// Attraverso una chiamata ajax all’Api di boolean avremo a disposizione una decina di dischi musicali.
// Servendoci di handlebars stampiamo tutto a schermo. In questo momento non è importante la parte grafica.
// quindi qua o rifacciamo da capo o finiamo il layout come da screeshot (che vi metto sotto).
// Creare una select con i seguenti generi: pop, rock, metal e jazz. In base a cosa scegliamo nella select vedremo i corrispondenti cd.

$(document).ready(function () {
  
  // variabili handlebars
  var source = $("#album-template").html();
  var template = Handlebars.compile(source);

  // imposto di default il valore "all" per il select, in modo che si vedano tutte le cover
  $("select").val("all");

  // eseguo chiamata ajax
  $.ajax({

    url: "https://flynn.boolean.careers/exercises/api/array/music",

    method: "GET",

    success: function (data, stato) {
      // salvo in una variabile il risultato della chiamata ajax
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

        var html = template(context);

        // stampo in pagina il template
        $(".container").append(html);
      }

      // aggancio l'evento input al select
      $("select").on({
        input: function () {
          // salvo in unavariabile il valore di select
          var valInput = $("select").val();
          console.log(valInput);
          // nascondo tutte le cover
          $(".cover").hide();
          console.log($(this));

          // eseguo un ciclo su tutte le cover per estrapolare il valore del data-attribute di ogni cover
          $(".cover").each(function () {

            // questo valore lo salvo in una variabile
            var genereCover = $(this).data("genere");

            // se il valore dell'input è uguale al valore del data-attribute di quella cover allora mostrami questa cover
            if (valInput == genereCover) {

              $(this).show();

            }
          });

          // se il valore dell'input è "all" allora mostrami tutte le cover
          if (valInput == "all") {
            $(".cover").show();
          }
        },
      });
    },

    error: function (richiesta, stato, errore) { },
  });

});

