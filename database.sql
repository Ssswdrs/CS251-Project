-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 30, 2023 at 02:46 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `xsell_buy_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `address`
--

CREATE TABLE `address` (
  `ID` int(6) NOT NULL,
  `Province` varchar(255) NOT NULL,
  `District` varchar(255) NOT NULL,
  `Street` varchar(255) NOT NULL,
  `Zipcode` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `address`
--

INSERT INTO `address` (`ID`, `Province`, `District`, `Street`, `Zipcode`) VALUES
(1, 'test', 'test', 'test', 12120),
(2, 'ptest', 'test', 'test', 12120),
(3, 'test', 'test', 'test', 12150),
(4, '123', 'pp', 'psak', 12010),
(5, 'test', 'test', 'test', 12110),
(6, '123', 'pp', 'psak', 12010),
(7, '123', '123', '123', 12010);

-- --------------------------------------------------------

--
-- Table structure for table `buyer`
--

CREATE TABLE `buyer` (
  `ID` int(6) NOT NULL,
  `Wallet` int(7) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `buyer`
--

INSERT INTO `buyer` (`ID`, `Wallet`) VALUES
(3, 8100),
(4, 0),
(7, 0);

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `ItemID` int(6) NOT NULL,
  `BuyerID` int(6) NOT NULL,
  `GameID` int(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`ItemID`, `BuyerID`, `GameID`) VALUES
(66, 3, 11);

-- --------------------------------------------------------

--
-- Table structure for table `chat`
--

CREATE TABLE `chat` (
  `BuyerID` varchar(20) NOT NULL,
  `SellerID` int(6) NOT NULL,
  `History` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `chat`
--

INSERT INTO `chat` (`BuyerID`, `SellerID`, `History`) VALUES
('3_GameID:12', 2, 'GameID: 12 Date: 2023-05-28 23:59:11'),
('3_GameID:13', 1, 'GameID: 13 Date: 2023-05-28 23:58:50'),
('3_GameID:14', 1, 'GameID: 14 Date: 2023-05-28 23:58:44'),
('3_GameID:3', 2, 'GameID: 3 Date: 2023-05-28 23:59:08'),
('3_GameID:5', 2, 'GameID: 5 Date: 2023-05-28 23:59:32');

-- --------------------------------------------------------

--
-- Table structure for table `contact`
--

CREATE TABLE `contact` (
  `GameID` int(6) NOT NULL,
  `contact` varchar(255) NOT NULL,
  `info` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `contact`
--

INSERT INTO `contact` (`GameID`, `contact`, `info`) VALUES
(2, '', ''),
(3, 'line', ''),
(4, '', ''),
(5, 'line', 'https://line.me/ti/p/8uMHK1LsvU'),
(6, 'line', 'https://line.me/ti/p/8uMHK1LsvU'),
(7, 'ig', 'p.sak'),
(9, 'facebook', 'saksorn'),
(10, 'line', 'https://line.me/ti/p/8uMHK1LsvU'),
(11, 'line', ''),
(12, 'facebook', ''),
(13, 'line', ''),
(14, 'line', '');

-- --------------------------------------------------------

--
-- Table structure for table `description`
--

CREATE TABLE `description` (
  `GameID` int(6) NOT NULL,
  `GameName` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `Desc` varchar(500) NOT NULL,
  `Real_Price` int(6) NOT NULL,
  `Discount` int(3) NOT NULL,
  `Show_Price` int(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `description`
--

INSERT INTO `description` (`GameID`, `GameName`, `title`, `Desc`, `Real_Price`, `Discount`, `Show_Price`) VALUES
(2, 'rov', 'dfsfsdf', '<p>dsfdsfs</p>', 100000, 20, 80000),
(3, 'valorant', 'valorant2', '<p>valorant2 desc</p>', 2450, 0, 2450),
(4, '', '', '', 0, 0, 0),
(5, 'marvelsnap', 'Marvel ไอดีเล่นนานแล้ว พอไปต่อได้ราคาถูก', '<p>สอบถามเพิ่มเติมลดได้อยากขาย</p>', 200, 0, 200),
(6, 'rov', 'Rov ตัวเยอะ สกินเยอะ', '<p>ราคากันเอง ลดได้อีกติดต่อมาครับ</p>', 7900, 0, 7900),
(7, 'cookierunkingdom', 'cookie run kingdom 1 ราคาประหยัด', '<p>ไอดีเริ่มต้นลงด่านไปไม่เยอะ ดูเพิ่มเติมได้ติดต่อมา</p>', 300, 5, 285),
(9, 'freefire', 'free fire2', '<p>ไอดีสะอาด ไม่เชื่อมกับอะไรเลย ติดต่อดูเพิ่มเติมได้</p>', 1550, 15, 1318),
(10, 'freefire', 'free fire1', '<p>สกินเยอะ ราคาถูก</p>', 500, 10, 450),
(11, 'rov', 'rov2', '<p>ไอดีสะอาดราคาประหยัด</p>', 1000, 10, 900),
(12, 'valorant', 'valorant', '<p>ไอดีสกินปืนเยอะๆ คุ้มๆ</p>', 2000, 20, 1600),
(13, 'valorant', 'valorant 3', '<p>valorant description</p>', 850, 0, 850),
(14, 'valorant', 'valorant 4', '<p>desc4</p>', 5000, 0, 5000);

-- --------------------------------------------------------

--
-- Table structure for table `idgame`
--

CREATE TABLE `idgame` (
  `GameID` int(6) NOT NULL,
  `SellerID` int(6) NOT NULL,
  `Username` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `idgame`
--

INSERT INTO `idgame` (`GameID`, `SellerID`, `Username`, `Password`, `Date`) VALUES
(2, 2, 'sellUser', 'pp1234', '2023-05-26 08:48:31'),
(3, 2, 'valo111', 'p1234', '2023-05-28 23:56:46'),
(4, 2, '', '', '2023-05-26 09:35:52'),
(5, 2, 'marvel1234', 'mv1234', '2023-05-28 20:53:34'),
(6, 2, 'rovp1234', 'rp1234', '2023-05-28 21:01:11'),
(7, 2, 'cc1234', 'cookierun1234', '2023-05-28 20:49:59'),
(9, 2, 'freefiree1234', 'ff1234', '2023-05-28 20:46:55'),
(10, 2, 'PSak251', 'pp1234', '2023-05-28 20:45:20'),
(11, 2, 'Psak', 'Psak1234', '2023-05-26 18:11:23'),
(12, 2, 'psak', 'saksorn1234', '2023-05-28 20:47:48'),
(13, 1, 'valo3', 'valo1234', '2023-05-28 21:11:17'),
(14, 1, 'valo1', 'valo1234', '2023-05-28 21:16:40');

-- --------------------------------------------------------

--
-- Table structure for table `picture_item`
--

CREATE TABLE `picture_item` (
  `pic_id` int(6) NOT NULL,
  `GameID` int(6) NOT NULL,
  `Picture` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `picture_item`
--

INSERT INTO `picture_item` (`pic_id`, `GameID`, `Picture`) VALUES
(87, 3, '1685293006720_valo2.jpg'),
(99, 4, ''),
(100, 5, '1685282014943_marvel1.jpg'),
(101, 6, '1685282471888_rov1.jpg'),
(102, 7, '1685281799260_cc1.jpg'),
(104, 9, '1685281615377_ff2.jpg'),
(105, 10, '1685281520211_ff1.jpg'),
(106, 11, '1685099483062_maxresdefault.jpg'),
(107, 12, '1685281668513_valo.jpg'),
(109, 13, '1685283077608_valo3.jpg'),
(110, 14, '1685283400095_valo4.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `seller`
--

CREATE TABLE `seller` (
  `ID` int(6) NOT NULL,
  `CitizenID` varchar(13) NOT NULL,
  `Payment_Method` varchar(50) NOT NULL,
  `Payment_No` varchar(20) NOT NULL,
  `Wallet` int(7) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `seller`
--

INSERT INTO `seller` (`ID`, `CitizenID`, `Payment_Method`, `Payment_No`, `Wallet`) VALUES
(1, '123456', 'promptpay', '1321545465', 5000),
(2, '1234567', 'TrueWallet', '1321545465', 900),
(6, '123456788841', 'TrueWallet', '132154546533', 0);

-- --------------------------------------------------------

--
-- Table structure for table `transaction`
--

CREATE TABLE `transaction` (
  `TransactionID` int(6) NOT NULL,
  `BuyerID` int(6) NOT NULL,
  `GameID` int(6) NOT NULL,
  `Price` int(6) NOT NULL,
  `Date_time` date NOT NULL,
  `Status_detail` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `transaction`
--

INSERT INTO `transaction` (`TransactionID`, `BuyerID`, `GameID`, `Price`, `Date_time`, `Status_detail`) VALUES
(173, 3, 14, 5000, '2023-10-22', 'ยืนยันการซื้อขายเสร็จสิ้น');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `ID` int(6) NOT NULL,
  `username` varchar(128) NOT NULL,
  `FirstName` varchar(255) NOT NULL,
  `LastName` varchar(255) NOT NULL,
  `Gender` varchar(20) NOT NULL,
  `Tel` varchar(10) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`ID`, `username`, `FirstName`, `LastName`, `Gender`, `Tel`, `email`, `password`) VALUES
(1, 'admin', 'ศักย์ศรณ์', 'สวัสดีรักษา', 'Male', '0980909', 'saksornsawatdee@gmail.com', '$2a$10$68n8/jAcSX0GC0ntegRdaOt3SvxF2MA/SgZLhzuSQTo6PwCMcZDW6'),
(2, 'sellUser', 'ศักย์ศรณ์', 'สวัสดีรักษา', 'Male', '0980909', 'saksornsawate@gmail.com', '$2a$10$bEltC3/oMh11XPM.TWsVH.eT443B5uxnOCppo2og3ga1w6dZithHW'),
(3, 'buyUser', 'asaf', 'sss', 'Female', '0999999', 'sasldlsa', '$2a$10$zDTG3oIeiDS/tLQKDVkI3.LI/9H0pk1HbKn3K0o.Cf8laNSGxGf4m'),
(4, '64096828844', 'Qer', 'Sak', 'Male', '0980909', 'saksornskrr@gmail.com', '$2a$10$HfZMO3wFDkiP0Ux9AwqkaeChxyF8N9n0m6ZvgdMbxpOPRlyt30F.i'),
(5, 'sellUser2', 'ศักย์ศรณ์', 'สวัสดีรักษา', 'Male', '0980909', 'saksornsawatdee3@gmail.com', '$2a$10$ASGBroPB3zvfx.NgBAhNnumzcpZjIIvF4eL.1oVbibv6UXVSdD1vW'),
(6, 'sellUser23', 'ศักย์ศรณ์', 'สวัสดีรักษา', 'Male', '0980909', 'saksornsawatdee33@gmail.com', '$2a$10$/sozZJTc2YMNdCfQ6dt4Xu2UtS2i8bCShkc2ixXL51LpcfCSRBFom'),
(7, 'buyUsertttttttttt', 'ศักย์ศรณ์', 'สวัสดีรักษา', 'Male', '09809092', 'saksornsawatdee32@gmail.com', '$2a$10$y/H.bLJ.qMbcMmfn6SUwGOyiklLbruJ3RhVUgvsQuMpX7FfJ/c.e2');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `address`
--
ALTER TABLE `address`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `buyer`
--
ALTER TABLE `buyer`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`ItemID`),
  ADD UNIQUE KEY `GameID` (`GameID`),
  ADD KEY `cart_ibfk_2` (`BuyerID`);

--
-- Indexes for table `chat`
--
ALTER TABLE `chat`
  ADD PRIMARY KEY (`BuyerID`),
  ADD KEY `chatcons` (`SellerID`);

--
-- Indexes for table `contact`
--
ALTER TABLE `contact`
  ADD PRIMARY KEY (`GameID`);

--
-- Indexes for table `description`
--
ALTER TABLE `description`
  ADD PRIMARY KEY (`GameID`);

--
-- Indexes for table `idgame`
--
ALTER TABLE `idgame`
  ADD PRIMARY KEY (`GameID`),
  ADD KEY `idgame_ibfk_1` (`SellerID`);

--
-- Indexes for table `picture_item`
--
ALTER TABLE `picture_item`
  ADD PRIMARY KEY (`pic_id`),
  ADD KEY `GameID` (`GameID`);

--
-- Indexes for table `seller`
--
ALTER TABLE `seller`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `CitizenID` (`CitizenID`);

--
-- Indexes for table `transaction`
--
ALTER TABLE `transaction`
  ADD PRIMARY KEY (`TransactionID`),
  ADD UNIQUE KEY `GameID` (`GameID`),
  ADD KEY `transaction_ibfk_1` (`BuyerID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `E-mail` (`email`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `ItemID` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- AUTO_INCREMENT for table `picture_item`
--
ALTER TABLE `picture_item`
  MODIFY `pic_id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=111;

--
-- AUTO_INCREMENT for table `transaction`
--
ALTER TABLE `transaction`
  MODIFY `TransactionID` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=174;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `address`
--
ALTER TABLE `address`
  ADD CONSTRAINT `address_ibfk_1` FOREIGN KEY (`ID`) REFERENCES `users` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `buyer`
--
ALTER TABLE `buyer`
  ADD CONSTRAINT `buyer` FOREIGN KEY (`ID`) REFERENCES `users` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`BuyerID`) REFERENCES `buyer` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `cart_ibfk_3` FOREIGN KEY (`GameID`) REFERENCES `idgame` (`GameID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `chat`
--
ALTER TABLE `chat`
  ADD CONSTRAINT `chatcons` FOREIGN KEY (`SellerID`) REFERENCES `idgame` (`SellerID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `contact`
--
ALTER TABLE `contact`
  ADD CONSTRAINT `contact_ibfk_1` FOREIGN KEY (`GameID`) REFERENCES `idgame` (`GameID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `description`
--
ALTER TABLE `description`
  ADD CONSTRAINT `description_ibfk_1` FOREIGN KEY (`GameID`) REFERENCES `idgame` (`GameID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `idgame`
--
ALTER TABLE `idgame`
  ADD CONSTRAINT `idgame_ibfk_1` FOREIGN KEY (`SellerID`) REFERENCES `seller` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `picture_item`
--
ALTER TABLE `picture_item`
  ADD CONSTRAINT `picture_item_ibfk_1` FOREIGN KEY (`GameID`) REFERENCES `idgame` (`GameID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `seller`
--
ALTER TABLE `seller`
  ADD CONSTRAINT `seller_ibfk_1` FOREIGN KEY (`ID`) REFERENCES `users` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `transaction`
--
ALTER TABLE `transaction`
  ADD CONSTRAINT `transaction_ibfk_1` FOREIGN KEY (`BuyerID`) REFERENCES `buyer` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `transaction_ibfk_2` FOREIGN KEY (`GameID`) REFERENCES `idgame` (`GameID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
