-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3307
-- Generation Time: Nov 20, 2022 at 11:39 AM
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
-- Table structure for table `problems_table`
--
-- Creation: Nov 20, 2022 at 10:18 AM
-- Last update: Nov 20, 2022 at 10:33 AM
--

CREATE TABLE `problems_table` (
  `url` varchar(150) NOT NULL,
  `id` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `problems_table`:
--   `id`
--       `user_table` -> `id`
--

-- --------------------------------------------------------

--
-- Table structure for table `standings`
--
-- Creation: Nov 20, 2022 at 10:37 AM
--

CREATE TABLE `standings` (
  `id` varchar(20) NOT NULL,
  `name` varchar(20) NOT NULL,
  `points` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `standings`:
--   `id`
--       `user_table` -> `id`
--

--
-- Dumping data for table `standings`
--

INSERT INTO `standings` (`id`, `name`, `points`) VALUES
('190041118', 'shahriar', 1642);

-- --------------------------------------------------------

--
-- Table structure for table `table_atcoder`
--
-- Creation: Nov 20, 2022 at 10:35 AM
--

CREATE TABLE `table_atcoder` (
  `id` varchar(15) NOT NULL,
  `handle` varchar(50) NOT NULL,
  `rating` int(11) NOT NULL,
  `rank` varchar(50) NOT NULL,
  `solve_count` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `table_atcoder`:
--   `id`
--       `user_table` -> `id`
--

--
-- Dumping data for table `table_atcoder`
--

INSERT INTO `table_atcoder` (`id`, `handle`, `rating`, `rank`, `solve_count`) VALUES
('190041115', 'LaBIB', 18, '71527', 25),
('190041118', 'shahriar118', 75, '52960', 17),
('190041132', 'chroot', 581, '22573rd', 118),
('1900411XX', 'iztihad110', 98, '49079', 29);

-- --------------------------------------------------------

--
-- Table structure for table `table_codeforces`
--
-- Creation: Nov 20, 2022 at 10:35 AM
--

CREATE TABLE `table_codeforces` (
  `id` varchar(15) NOT NULL,
  `handle` varchar(50) NOT NULL,
  `rating` int(11) NOT NULL,
  `rank` varchar(50) NOT NULL,
  `solve_count` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `table_codeforces`:
--   `id`
--       `user_table` -> `id`
--

--
-- Dumping data for table `table_codeforces`
--

INSERT INTO `table_codeforces` (`id`, `handle`, `rating`, `rank`, `solve_count`) VALUES
('190041115', '_labib', 1160, 'Newbie', 955),
('190041118', 'Shahriar118', 1265, 'Pupil', 370),
('190041132', 'chroot_', 1702, 'Expert', 1141),
('1900411XX', 'Mr_nOoB', 1322, 'Pupil', 1641);

-- --------------------------------------------------------

--
-- Table structure for table `user_table`
--
-- Creation: Nov 20, 2022 at 09:45 AM
--

CREATE TABLE `user_table` (
  `id` varchar(15) NOT NULL,
  `password` varchar(50) NOT NULL,
  `handle_codeforces` varchar(50) NOT NULL,
  `handle_atcoder` varchar(50) NOT NULL,
  `handle_vjudge` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `user_table`:
--

--
-- Dumping data for table `user_table`
--

INSERT INTO `user_table` (`id`, `password`, `handle_codeforces`, `handle_atcoder`, `handle_vjudge`) VALUES
('1', '1', '1', '1', '1'),
('1222232', 'trtr', 'rtret', 'trt', 'trtr'),
('190000000', 'lelpass', 'lelbaba', 'lelbaba', 'lelbaba'),
('19001111', 'aa', 'edefe', 'fef', 'fef'),
('190041115', 'labiberpass', '_labib', 'LaBIB', '_labib'),
('190041117', 'shantoerpass', 'ssshanto', 'Ssshanto', 'ssshanto'),
('190041118', 'shahriar777', 'Shahriar118', 'shahriar118', 'shahriar'),
('190041132', 'chrooterpass', 'chroot_', 'chroot', 'chroot'),
('1900411XX', 'iztihaderpass', 'Mr_nOoB', 'iztihad110', 'iztihad110'),
('1999999999999', 'aaaaaaaa', 'deded', 'ddede', 'deded'),
('2', '1', '1', '1', '1'),
('2323', '12345678', 'eret', 'trt', 'ytyt'),
('3', 'dwedef', 'fefe', 'grg', 'g');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `problems_table`
--
ALTER TABLE `problems_table`
  ADD PRIMARY KEY (`url`,`id`),
  ADD KEY `fk_id_friends` (`id`);

--
-- Indexes for table `standings`
--
ALTER TABLE `standings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `table_atcoder`
--
ALTER TABLE `table_atcoder`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `table_codeforces`
--
ALTER TABLE `table_codeforces`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_table`
--
ALTER TABLE `user_table`
  ADD PRIMARY KEY (`id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `problems_table`
--
ALTER TABLE `problems_table`
  ADD CONSTRAINT `fk_id_friends` FOREIGN KEY (`id`) REFERENCES `user_table` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `standings`
--
ALTER TABLE `standings`
  ADD CONSTRAINT `fk_id_standings` FOREIGN KEY (`id`) REFERENCES `user_table` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `table_atcoder`
--
ALTER TABLE `table_atcoder`
  ADD CONSTRAINT `fk_id_atcoder` FOREIGN KEY (`id`) REFERENCES `user_table` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `table_codeforces`
--
ALTER TABLE `table_codeforces`
  ADD CONSTRAINT `fk_id_codeforces` FOREIGN KEY (`id`) REFERENCES `user_table` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;


--
-- Metadata
--
USE `phpmyadmin`;

--
-- Metadata for table problems_table
--

--
-- Metadata for table standings
--

--
-- Metadata for table table_atcoder
--

--
-- Metadata for table table_codeforces
--

--
-- Metadata for table user_table
--

--
-- Metadata for database iut_cp_assistant
--
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
