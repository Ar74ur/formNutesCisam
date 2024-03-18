<?php
    //Verifica se o user está logado
    session_start();
    if (isset($_SESSION['login_usuario'])) {
        header("Location: controle.php");
     }
    
    //Conecta ao banco
    $conexao = mysqli_connect("localhost","root","", "agendamentos");

    $erros = array();

    //Sistema de login
    if (isset($_POST['btn-login'])) {
        $login=$_POST['login'];
        $senha=$_POST['senha'];

        if (empty($login) || empty($senha)) {
            echo "Campos Obrigatorios";
            $erros[]="<li>Preencha todos os campos</li>";
        }else {
            $sql = "SELECT login FROM usuarios WHERE login='$login' ";
            $resultados = mysqli_query($conexao, $sql);
        
            if ( mysqli_num_rows($resultados) > 0) {
                $senha = md5( $senha );
                $sql = "SELECT * FROM usuarios WHERE login='$login' AND senha='$senha' ";
                $resultados = mysqli_query($conexao, $sql);
                if ( mysqli_num_rows($resultados) == 1) {
                    $dados = mysqli_fetch_array($resultados);
                    $_SESSION['id_usuario'] = $dados['id'];
                    $_SESSION['login_usuario'] = $dados['login'];

                    header("Location: controle.php");
                }else {
                    $erros[]="<li>Usuario e senha não batem</li>";
                }

            }else {
                $erros[]="<li>Usuario não existe</li>";
            }
         }

    }

?>


<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charser="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Asap:ital,wght@1,700&family=Nunito:wght@700&family=Yellowtail&display=swap" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="CSS/normalize.css">
    <link rel="stylesheet" type="text/css" href="CSS/style.css">
    <title>Login</title>
</head>

<body>
    <nav>
        <a href="index.php" >NUTES CISAM</a>
    </nav>

    <div id="div-login">
        <h1 style="color: #000000">login</h1><br>
    <?php
    foreach ($erros as $erro) {
        echo $erro;
    }
    ?>


    <form action="" method="post">
        <label for="login">Login</label>
    <br> <input type="text" name="login"><br>
        <label for="pass">Senha</label>
    <br> <input type="password" name="senha"><br><br>
    <button type='submit' name='btn-login'>Entrar</button>
    </form>

    </div>

    

</body>


</html>