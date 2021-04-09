document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
  console.log("Plugin da camera: ",navigator.camera);
}

function validar(){
  let erro = false;
  if ($("#nome").val().length < 3) {
    $("#nome").addClass("invalid");
    erro = true;
  } else {
    $("#nome").removeClass("invalid");
    $("#nome").addClass("valid");
  }
  if ($("#telefone").val().length<9) {
    $("#telefone").addClass("invalid");
    erro = true;
  } else {
    $("#telefone").removeClass("invalid");
    $("#telefone").addClass("valid");
  }
  if(!$("#email").val().includes("@")){
    $("#email").addClass("invalid");
    erro = true;
  } else {
    $("#email").removeClass("invalid");
    $("#email").addClass("valid");
  }
  if (erro) {
    M.toast({html:"Dados inválidos!Verifique os campos em vermelho."});
    return false;
  };
  
  
  return true;
}


function incluir(){
  var nome = $("#nome").val(); 
  var email = $("#email").val();
  var telefone = $("#telefone").val();


  var item = '<li class="collection-item avatar"> '+
              '    <img src="https://images.unsplash.com/photo-1574965234283-2f20a4cffa43? ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1569&q=80" '+
              '    class="circle">'+
              '    <span class="title">'+nome+'</span>'+
              '    <p>Email: '+email+'<br>' +
              '       Telefone: '+telefone+' '+
              '<div class="secondary-content">  <a href="#!" ><i class="material-icons">local_phone</i></a>'+
              '  <a href="#!" ><i class="material-icons delete">delete</i></a></li>'+
              '</div></li>';
  $("#lista-contatos").append(item); 


  $(".delete").unbind();
  $(".delete").click(function(){
        $(this).parent().parent().parent().remove();
  });
}


$(document).ready(function(){
  $('.sidenav').sidenav();
  $('.pagina').each(function(){
      $(this).hide();
  });

  $("#menulista").click(function(){
      $("#pagina-novo").hide();
      $("#pagina-lista").show();
  });
  $("#menunovo").click(function(){
      $("#pagina-lista").hide();
      $("#pagina-novo").show();
  });

  $(".collection-item").click(function(){
      $(".collection-item").each(function(){
         $(this).removeClass("active");   
      })
      $(this).addClass("active");
  });

  $("input[type=search]").change(function(){
        $("span.title").each(function(){
            var texto = $("input[type=search]").get(0).value.toUpperCase();
            if ( $(this).text().toUpperCase().includes(texto) ) {
                $(this).parent().show();
         } else {
           console.log("Esconder "+$(this).text().toUpperCase());
           $(this).parent().hide();
           
         }

        });
    });


    $("#btadd").click(function(){
          if (validar()) {
            incluir();
          }
    });




});
      