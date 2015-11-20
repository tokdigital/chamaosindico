<?php
header('Access-Control-Allow-Origin: *');

$id = $_POST['id'];

//include('connection.php');
$conect = mysql_connect("localhost", "root", "123456789"); // Caso a conexão seja reprovada, exibe na tela uma mensagem de erro 
if (!$conect) die ("<h1>Falha na conexão com o Banco de Dados!</h1>"); // Caso a conexão seja aprovada, então conecta o Banco de Dados. 
mysql_select_db("app",$conect);

$sql = mysql_query('SELECT post_title FROM wp_posts WHERE ID='.$id);

//print_r(var_dump(mysql_fetch_array($sql)));

$sql = empty($sql) ? 'vazio' : $sql;

echo json_encode(var_dump(mysql_fetch_array($sql)));
//echo json_encode('adsadsad');