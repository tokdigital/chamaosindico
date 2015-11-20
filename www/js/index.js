$(function(){
    db.transaction(function(tx) {
    tx.executeSql('SELECT * FROM myTable WHERE logado=?', [1], function (tx, resultado) {
        if(resultado.rows.length > 0){
            var rows = resultado.rows[0];

            logado = rows.logado;
            email = rows.email;
            nome = rows.nome;
            bairro_id = rows.bairro_id;
            bairro_nome = rows.bairro_nome;
            cidade = rows.cidade;
            estado = rows.estado;

            location.href = 'page/home.html';        
        }else{
            initIndex();            
        }

        },function (tx, error){
          alert('ooops ' + error.message);
        });
    }); 
});