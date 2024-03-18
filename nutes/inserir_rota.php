<?php
// Obtém o JSON enviado pelo Postman
header("Access-Control-Allow-Origin: *");
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
    exit();
}
$json = file_get_contents("php://input");

// Decodifica o JSON para um array associativo PHP
$data = json_decode($json, true);

// Verifica se o JSON foi decodificado com sucesso
if ($data === null) {
    // Se não foi possível decodificar o JSON, houve um erro na requisição
    echo "Erro ao decodificar o JSON!";
} else {
    // Se o JSON foi decodificado com sucesso, você pode acessar os dados
    $nome = $data['nome'];
    $tel = $data['tel'];
    $email = $data['email'];
    $ende = $data['endereco'];
    $cep = $data['cep'];
    $cpf = $data['cpf'];
    $data_nasc = $data['nascimento'];
    $cns= $data['cns'];
    $nome_mae= $data['nome_mae'];
    $tipo= $data['tipo'];
    $extra= $data['extra'];

    if (is_array($extra) && !empty($extra)) {
        // Usa implode para juntar os valores do array com '</br>' como separador
        $extra_string = implode('</br>', $extra);
    } else {
        echo "O array extra está vazio ou não é um array válido.";
    }

    // Conecta ao banco de dados
    $conexao = mysqli_connect("localhost", "root", "", "agendamentos")
        or die("Erro ao conectar ao banco de dados!");

    // Escapa os valores para prevenir SQL Injection
    $nome = mysqli_real_escape_string($conexao, $nome);
    $tel = mysqli_real_escape_string($conexao, $tel);
    $email = mysqli_real_escape_string($conexao, $email);
    $ende = mysqli_real_escape_string($conexao, $ende);
    $cep = mysqli_real_escape_string($conexao, $cep);
    $cpf = mysqli_real_escape_string($conexao, $cpf);
    $data_nasc = mysqli_real_escape_string($conexao, $data_nasc);
    $cns = mysqli_real_escape_string($conexao, $cns);
    $nome_mae = mysqli_real_escape_string($conexao, $nome_mae);
    $tipo = mysqli_real_escape_string($conexao, $tipo);
    $extra = mysqli_real_escape_string($conexao, $extra_string);

    // Monta o SQL com os dados
    $sql = "INSERT INTO agendamentos (nome, tel, email, endereco, cep, cpf, data_nasc, cns, nome_mae, tipo, extra) 
            VALUES ('$nome', '$tel', '$email', '$ende', '$cep', '$cpf', '$data_nasc', '$cns', '$nome_mae', '$tipo', '$extra_string')";

    // Executa a query no banco de dados
    $resultado = mysqli_query($conexao, $sql);

    if ($resultado) {
        echo "Cadastro efetuado com sucesso!";
    } else {
        echo "Erro ao gravar os dados no banco de dados!";
    }

    // Fecha a conexão
    mysqli_close($conexao);
}
?>
