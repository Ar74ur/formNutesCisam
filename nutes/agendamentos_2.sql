-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 18/03/2024 às 19:35
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `agendamentos`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `agendamentos`
--

CREATE TABLE `agendamentos` (
  `id` int(5) NOT NULL,
  `nome` varchar(25) NOT NULL,
  `tel` varchar(25) NOT NULL,
  `email` varchar(50) NOT NULL,
  `endereco` varchar(50) NOT NULL,
  `cep` varchar(25) NOT NULL,
  `cpf` varchar(25) NOT NULL,
  `data_nasc` varchar(11) DEFAULT NULL,
  `nome_mae` varchar(25) NOT NULL,
  `cns` varchar(25) NOT NULL,
  `tipo` varchar(25) NOT NULL,
  `extra` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `agendamentos`
--

INSERT INTO `agendamentos` (`id`, `nome`, `tel`, `email`, `endereco`, `cep`, `cpf`, `data_nasc`, `nome_mae`, `cns`, `tipo`, `extra`) VALUES
(7, 'maxiane', '87 88112255', 'maxiane@mail.com', 'rua 1, Recife - PE (Apt 05)', '12.345-678', '145.236-78', '25/09/20202', '', '', 'Climatério', 'Sintomas: \r\nAlterações nos órgãos sexuais, como coceira, secura da mucosa vaginal'),
(11, 'maria', '88 85581225', 'maria@mail.com', 'rua 2, Recife - PE(bloco 2)', '25.565-555', '123.321-77', '11/09/2001', '', '', 'Climatério', 'Sintomas:\r\nDepressão ou irritabilidade'),
(13, 'maria joaquina', '87 81323154', 'mj@email.com', 'tes, tes, Recife - PE', '50650458', '1255465415221', '11/09/2001', 'joana', '15wd14ew5', 'Prevenção da Gravidez', 'Inserção DIU Mirena (hormonal)'),
(14, 'maria joaquina teste', '87 81323154', 'mj@email.com', 'tes, tes, Recife - PE', '50650458', '1255465415221', '11/09/2001', '', '', 'Prevenção da Gravidez', 'Inserção DIU Mirena (hormonal)</br>Inserção DIU Mirena (hormonal)'),
(16, 'maria', '87 81224536', 'a@a.a', 'rua 1, teste, recife - pe(apt po)', '50564452', '125.252.698-88', '25/02/2000', 'dona zefa', '151fht150htg', 'Climatério', 'Selecione abaixo os sinais e sintomas que você está apresentando, pode clicar em mais de um:: Depressão ou irritabilidade');

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `ID` int(11) NOT NULL,
  `login` varchar(255) NOT NULL,
  `senha` varchar(100) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Despejando dados para a tabela `usuarios`
--

INSERT INTO `usuarios` (`ID`, `login`, `senha`) VALUES
(1, 'admin', '21232f297a57a5a743894a0e4a801fc3');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `agendamentos`
--
ALTER TABLE `agendamentos`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `agendamentos`
--
ALTER TABLE `agendamentos`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
