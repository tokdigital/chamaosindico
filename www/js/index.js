$(function(){
    registrationForm();
    
    $('#btn_prox').click(function(){emailChecks($('#reg_mail').val())});
    $('#btn_entrar').click(function(){passwordChecks($('#reg_id').val(), $('#reg_pass').val());});
    $('body').on('change', '#reg_state', function(){registrationForm(2)});
    $('body').on('change', '#reg_city', function(){registrationForm(3)});
    $('body').on('change', '#reg_neighborhood', function(){
        $('#block_reg_neighborhood').addClass('none');
        $('#btn_registrar').removeClass('none');
    });
    $('#btn_registrar').click(
        function(){
            if($('#reg_name').val()){
                userRegisters($('#reg_mail').val(), $('#reg_name').val(), $('#reg_state').val(), $('#reg_city').val(), $('#reg_neighborhood').val());
            }else{                
                $('#reg_erro_name').removeClass('none');
            }
        }
    );
});