$(function(){
    constructorHome();
    
    $('body').on('click', '#list-nav #itens-category li', 
        function(){ 
            $('#list-nav').append('<input type="hidden" name="cat_id" id="cat_id" />'); 
            $('#cat_id').val($(this).attr('value'));
            constructListaEmpresa();
    });
    
    $('body').on('click', '#list-nav #itens-empresas li', 
        function(){ 
            constructEmpresa($(this).attr('value'));
    });
});