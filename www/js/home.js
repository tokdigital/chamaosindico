$(function(){
    if(db){
        db.transaction(function(tx) {
        tx.executeSql('SELECT * FROM myTable WHERE logado=?', [1], function (tx, resultado) {
            if(resultado.rows.length > 1){
                var rows = resultado.rows[0];

                logado = rows.logado;
                email = rows.email;
                nome = rows.nome;
                bairro_id = rows.bairro_id;
                bairro_nome = rows.bairro_nome;
                cidade = rows.cidade;
                estado = rows.estado;
            }

            },function (tx, error){
              alert('ooops ' + error.message);
            });
        }); 
    }
});