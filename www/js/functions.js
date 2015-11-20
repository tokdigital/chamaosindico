function emailChecks(_email){
    $.ajax({
        url: 'http://192.168.1.10/app/login/',
        type:"POST",
        data: {
            email: _email
        },
//        dataType: 'json', 
        success: function(data){
            $('#form_login_mail').addClass('none');
            if(data){
                $('#reg_id').val(data.id);
                $('#name_user').html(data.nome);
                $('#form_login_pass').removeClass('none');
            }else{
                $('#form_login_data').removeClass('none');  
                registrationForm(1);
            }
        }
   }); 
}

function passwordChecks(_id, _senha){
    var obj = { 'id': _id, 'senha': _senha };
    $.ajax({
        url: 'http://192.168.1.10/app/login/',
        type:"POST",
        data: { result : obj },
//        dataType: 'json', 
        success: function(data){
            $('#form_login_mail').addClass('none');
            if(data){
                location.href = 'page/home.html';
            }else{
                $('#reg_erro_senha').removeClass('none');
            }
        }
   }); 
}

function registrationForm(_step){
    if(_step == 1){
        $.ajax({
            url: 'http://192.168.1.10/app/form-cadastro/',
            type:"POST",
            data: {step: _step},
            success: function(data){
                var estados = '<p id="block_reg_state"><label for="reg_state">Selecione um estado: </label><select name="reg_state" id="reg_state"><option disabled selected>Selecione...</option>';
                for(var x in data) { 
                    estados += '<option value="' + data[x].term_id + '">' + data[x].name + '</option>';
                }
                estados += '<select></p>';
                $('#form_login_data').append(estados);
            }
        }); 
    }
    if(_step == 2){
        $.ajax({
            url: 'http://192.168.1.10/app/form-cadastro/',
            type:"POST",
            data: {
                step: _step,
                cat: $('#reg_state').val()
            },
            success: function(data){
                $('#block_reg_state').addClass('none');
                var cidades = '<p id="block_reg_city"><label for="reg_city">Selecione uma cidade: </label><select name="reg_city" id="reg_city"><option disabled selected>Selecione...</option>';
                for(var x in data) { 
                    cidades += '<option value="' + data[x].term_id + '">' + data[x].name + '</option>';
                }
                cidades += '<select></p>';
                $('#form_login_data').append(cidades);
            }
        });
    }
    
    if(_step == 3){
        $.ajax({
            url: 'http://192.168.1.10/app/form-cadastro/',
            type:"POST",
            data: {
                step: _step,
                cat: $('#reg_city').val()
            },
            success: function(data){
                $('#block_reg_city').addClass('none');
                var bairro = '<p id="block_reg_neighborhood"><label for="reg_neighborhood">Selecione uma cidade: </label><select name="reg_neighborhood" id="reg_neighborhood"><option disabled selected>Selecione...</option>';
                for(var x in data) { 
                    bairro += '<option value="' + data[x].term_id + '">' + data[x].name + '</option>';
                }
                bairro += '<select></p>';
                $('#form_login_data').append(bairro);
            }
        });
    }
}

function userRegisters(_email, _nome, _estado, _cidade, _bairro){
    var obj = { email: _email, nome: _nome, estado: _estado, cidade: _cidade, bairro: _bairro };
    $.ajax({
        url: 'http://192.168.1.10/app/cadastro/',
        type:"POST",
        data: { result : obj },
//        dataType: 'json', 
        success: function(data){
            if(data){
                location.href = 'page/home.html';
            }
        }
   }); 
}

/* HOME */

function constructorHome(){
    var local = 10;
    $.ajax({
        url: 'http://192.168.1.10/app/loop-de-categoria/',
        type:"POST",
        data: { local : local },
//        dataType: 'json', 
        success: function(data){
            if(data){
                data = sortObject(data);
                var list = '<ul id="itens-category">';
                for(var x in data) { 
                    list += '<li class="category category-' + data[x].value.imagens.length + '" value="' + data[x].value.id + '">';
                    for(var i = 0; i < data[x].value.imagens.length; i++){
                        list += '<figure><img src="'+data[x].value.imagens[i]+'" /></figure>';
                    }
                    list += '<h2>' + data[x].value.name + '</h2></li>';
                }
                list += '</ul>';
                $('#list-nav').append(list);
            }
        }
   }); 
}

function sortObject(obj) {
    var arr = [];
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            arr.push({
                'key': prop,
                'value': obj[prop]
            });
        }
    }
    arr.sort();
    return arr;
}

/* */

/* LISTA EMPRESAS */
function constructListaEmpresa(){
    var obj = { 'local': 10, 'cat': $('#cat_id').val() };
    $.ajax({
        url: 'http://192.168.1.10/app/loop-de-empresa/',
        type:"POST",
        data: { result : obj },
//        dataType: 'json', 
        success: function(data){
            if(data){
                $('#list-nav #itens-category').remove();
                data = sortObject(data);
                var list = '<ul id="itens-empresas">';
                for(var y in data) { 
                    list += '<li value="' + data[y].value.id + '"><img src="' +  data[y].value.img + '" /><h2>' + data[y].value.name + '</h2></li>';
                }
                list += '</ul>';
                $('#list-nav').append(list);
            }
        }
   }); 
}

/* EMPRESA */

function constructEmpresa(_id){
    $('#list-nav').remove();
    $('#wrapper').append('<section id="item-empresa"></section>');
    $.ajax({
        url: 'http://192.168.1.10/app/loop-de-empresa-unica/',
        type:"POST",
        data: { id : _id },
//        dataType: 'json', 
        success: function(data){
            console.log(data);
            if(data){
                var empresa = '<img src="' + data.img + '" /><h1>' + data.nome + '</h1><p>' + data.resumo +'</p><p>' + data.autor + '</p><p>' + data.conteudo + '</p><p>' + data.telefone + '</p><p>' + data.email + '</p><p>' + data.site + '</p>';
                $('#item-empresa').append(empresa);
            }
        }
   }); 
}