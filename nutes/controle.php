<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Asap:ital,wght@1,700&family=Nunito:wght@700&family=Yellowtail&display=swap" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="CSS/normalize.css">
    <link rel="stylesheet" type="text/css" href="CSS/style.css">
    <title>Painel de Controle</title>
</head>
<body>

    <nav>
        <a href="index.php" >Solicitações</a>
        
        <ul>
            <li style="right: 50px;"><a href='cadastra.php'></a></li>
            <li style="right: 50px;"><a href='logout.php'> Logout </a></li>
        </ul>
    </nav>
    <header id="topo">
        
    </header>

    <section id="corpo">
        <h1>Solicitações</h1>

        <!-- Formulário com seletor de tipo -->
        <form method="get" action="">
            <label for="tipo">Selecione o tipo:</label>
            <select name="tipo" id="tipo">
                <?php
                // Conecta ao banco de dados
                $conexao = mysqli_connect("localhost", "root", "");
                $db = mysqli_select_db($conexao, "agendamentos");

                // Query para obter os tipos distintos
                $sql_tipos = "SELECT DISTINCT tipo FROM agendamentos";
                $resultado_tipos = mysqli_query($conexao, $sql_tipos);

                // Loop para exibir as opções do seletor
                while ($linha_tipo = mysqli_fetch_array($resultado_tipos)) {
                    $tipo = $linha_tipo["tipo"];
                    echo "<option value='$tipo'>$tipo</option>";
                }
                ?>
            </select>
            <input type="submit" value="Filtrar">
        </form>

        <?php
        // Verifica se o usuário está logado
        session_start();
        if (!isset($_SESSION['login_usuario'])) {
            header("Location: index.php");
        }
         
        // Conecta e requisita os dados no banco
        $conexao = mysqli_connect("localhost", "root", "");
        $db = mysqli_select_db($conexao, "agendamentos");

        // Verifica se um tipo foi selecionado no formulário
        if (isset($_GET['tipo'])) {
            $tipoSelecionado = $_GET['tipo'];
            $sql = "SELECT * FROM agendamentos WHERE tipo='$tipoSelecionado' ORDER BY id DESC";
        } else {
            // Se nenhum tipo for selecionado, mostra todos os tipos
            $sql = "SELECT * FROM agendamentos ORDER BY id DESC";
        }

        $resultado = mysqli_query($conexao, $sql) or die ("Não foi possível realizar a consulta ao banco de dados");

        // Exibe os resultados na tabela
        echo "<table width=95% border=0 cellpadding=5 cellspacing=1>";
        echo "<tr>";
        echo "<th width=100>Nome:</th>";
        echo "<th width=100>Telefone:</th>";
        echo "<th width=100>Tipo:</th>";
        echo "<th width=100>CPF:</th>";
        echo "<th width=50>Excluir</th>";
        echo "<th width=50>Ver</th>";
        echo "</tr>";
        
        // Armazena os dados do cliente em variáveis e os exibe
        while ($linha=mysqli_fetch_array($resultado)) {
            $id = $linha["id"];
            $nome = $linha["nome"];
            $tel = $linha["tel"];
            $tipo = $linha["tipo"];
            $cpf = $linha["cpf"];

            echo "<tr>";
            echo "<th width=100>$nome</th>";
            echo "<th width=100>$tel</th>";
            echo "<th width=100>$tipo</th>";
            echo "<th width=100>$cpf</th>";
            echo "<th width=50><a href='excluir.php?id=$id'>Excluir</a></th>";
            echo "<th width=50><a href='solicitacao.php?id=$id'>Ver</a></th>";
            echo "</tr>";
        }
        echo "</table>";
        ?>
    </section>

</body>
</html>

