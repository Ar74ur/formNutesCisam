<?php
    //Verifica se o user está logado
    session_start();
    if (!isset($_SESSION['login_usuario'])) {
          header("Location: index.php");
       }

    //Recebe id do cliente
    $id=$_GET['id'];

    //Conecta ao banco
    $conexao = mysqli_connect("localhost","root","");
    $db = mysqli_select_db($conexao, "agendamentos");

    //Deleta o cliente
    $sql = "DELETE FROM agendamentos WHERE id='$id'";
      $resultado = mysqli_query($conexao, $sql)
      or die ("Não foi possível realizar a exclusão dos dados.");
      echo "<h1>A solicitação foi excluída com sucesso!</h1><br>";
      echo "<a href='controle.php'> Voltar para o Painel de controle </a>";

      ?>

      