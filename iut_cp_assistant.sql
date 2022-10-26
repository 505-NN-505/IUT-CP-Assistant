-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 26, 2022 at 10:09 AM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `iut_cp_assistant`
--

-- --------------------------------------------------------

--
-- Table structure for table `table_atcoder`
--

CREATE TABLE `table_atcoder` (
  `id` varchar(15) NOT NULL,
  `handle` varchar(50) NOT NULL,
  `rating` int(11) NOT NULL,
  `rank` varchar(50) NOT NULL,
  `solve_count` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `table_codeforces`
--

CREATE TABLE `table_codeforces` (
  `id` varchar(15) NOT NULL,
  `handle` varchar(50) NOT NULL,
  `rating` int(11) NOT NULL,
  `rank` varchar(50) NOT NULL,
  `solve_count` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `table_vjudge`
--

CREATE TABLE `table_vjudge` (
  `id` varchar(15) NOT NULL,
  `handle` varchar(50) NOT NULL,
  `rating` int(11) DEFAULT NULL,
  `rank` varchar(50) DEFAULT NULL,
  `solve_count` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `user_table`
--

CREATE TABLE `user_table` (
  `id` varchar(15) NOT NULL,
  `password` varchar(50) NOT NULL,
  `handle_codeforces` varchar(50) NOT NULL,
  `handle_atcoder` varchar(50) NOT NULL,
  `handle_vjudge` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `table_atcoder`
--
ALTER TABLE `table_atcoder`
  ADD PRIMARY KEY (`handle`);

--
-- Indexes for table `table_codeforces`
--
ALTER TABLE `table_codeforces`
  ADD PRIMARY KEY (`handle`),
  ADD KEY `fk_id_codeforces` (`id`);

--
-- Indexes for table `user_table`
--
ALTER TABLE `user_table`
  ADD PRIMARY KEY (`id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `table_codeforces`
--
ALTER TABLE `table_codeforces`
  ADD CONSTRAINT `fk_id_codeforces` FOREIGN KEY (`id`) REFERENCES `user_table` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
