function tirarFoto(){

    var options = {
      // Some common settings are 20, 50, and 100
      quality: 50,
      destinationType: Camera.DestinationType.FILE_URI,
      // In this app, dynamically set the picture source, Camera or photo gallery
      sourceType: Camera.PictureSourceType.CAMERA,
      encodingType: Camera.EncodingType.PNG,
      mediaType: Camera.MediaType.PICTURE,
      allowEdit: false,
      correctOrientation: true
  }


  function getFileEntry(imgUri,callback) {
       
    window.resolveLocalFileSystemURL(imgUri, function success(fileEntry) {

        // Do something with the FileEntry object, like write to it, u it, etc.
        // writeFile(fileEntry, imgUri);
        callback(fileEntry);
        console.log("got file: " + fileEntry.fullPath);
        // displayFileData(fileEntry.nativeURL, "Native URL");

    }, function () {
      // If don't get the FileEntry (which may happen when testing
      // on some emulators), copy to a new FileEntry.
        createNewFileEntry(imgUri,callback());
    });
}



  function onSucess(imageUri){
    $("#foto").attr("src",imageUri);
    $("#foto-path").val(imageUri);

    
    /*
    getFileEntry(imageData,function(fileEntry){
      $("#foto").attr("src",fileEntry.toURL());
      $("#foto-path").val(fileEntry.toURL());
    });*/
   //displayFileData(imageUri, "Native URL");




  }

  function onError(error){
    console.log(error);
    M.toast({html:"Erro capturando foto!"});

  }

  navigator.camera.getPicture(onSucess,onError,options);

}





document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
  console.log("Plugin da camera: ",navigator.camera);

  $("#tirar-foto").click(function(){
    tirarFoto();
  });  


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
  var foto = $("#foto-path").val();

  var item = '<li class="collection-item avatar"> '+
              '    <img src="'+foto+'" '+
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
      