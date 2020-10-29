-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Oct 03, 2020 at 02:13 AM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `yorum-kutusu-2`
--

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `product_id` int(11) NOT NULL,
  `admin_id` int(11) NOT NULL,
  `member_id` int(11) DEFAULT NULL,
  `product_name` varchar(60) NOT NULL,
  `product_slug` varchar(60) NOT NULL,
  `product_visible` tinyint(1) NOT NULL,
  `product_created_by_member` tinyint(1) NOT NULL,
  `product_create_date_time` datetime NOT NULL,
  `product_follow_count` int(11) NOT NULL,
  `history_pointer` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `product_history` (
  `product_history_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `admin_id` int(11) NOT NULL,
  `member_id` int(11) DEFAULT NULL,
  `product_old_name` varchar(60) NOT NULL,
  `product_old_slug` varchar(60) NOT NULL,
  `product_change_date_time` datetime NOT NULL,
  `product_request_date_time` datetime NOT NULL,
  `history_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `product_request` (
  `product_request_id` int(11) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `member_id` int(11) NOT NULL,
  `product_name` varchar(60) NOT NULL,
  `product_slug` varchar(60) NOT NULL,
  `product_request_date_time` datetime NOT NULL DEFAULT current_timestamp(),
  `product_request_answered` tinyint(1) NOT NULL DEFAULT 0,
  `admin_note` varchar(200) DEFAULT NULL,
  `request_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `product_request_response` (
  `product_request_response_id` int(11) NOT NULL,
  `product_request_id` int(11) DEFAULT NULL,
  `admin_id` int(11) NOT NULL,
  `allowed_or_denied` tinyint(1) NOT NULL,
  `response_date_time` datetime NOT NULL,
  `admin_note` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `tag` (
  `tag_id` int(11) NOT NULL,
  `creater_member_id` int(11) DEFAULT NULL,
  `admin_id` int(11) NOT NULL,
  `created_for` int(11) DEFAULT NULL,
  `tag_name` varchar(25) NOT NULL,
  `tag_slug` varchar(25) NOT NULL,
  `tag_visible` tinyint(1) NOT NULL DEFAULT 1,
  `tag_create_date_time` datetime NOT NULL DEFAULT current_timestamp(),
  `tag_passive` tinyint(1) NOT NULL,
  `tag_product_count` int(11) NOT NULL DEFAULT 0,
  `history_pointer` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `tag_with_product` (
  `tag_with_product_id` int(11) NOT NULL,
  `tag_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `admin_id` int(11) NOT NULL,
  `member_id` int(11) DEFAULT NULL,
  `tag_with_product_visible` tinyint(1) NOT NULL,
  `tag_with_product_create_date_time` datetime NOT NULL,
  `tag_avarage_rating` int(2) DEFAULT NULL,
  `tag_history_pointer` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `tag_with_product_history` (
  `tag_with_product_history_id` int(11) NOT NULL,
  `tag_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `admin_id` int(11) NOT NULL,
  `member_id` int(11) DEFAULT NULL,
  `tag_with_product_change_date_time` datetime NOT NULL,
  `history_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `tag_with_product_request` (
  `tag_with_product_request_id` int(11) NOT NULL,
  `member_id` int(11) NOT NULL,
  `product_request_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `tag_id` int(11) DEFAULT NULL,
  `tag_name` varchar(25) DEFAULT NULL,
  `tag_slug` varchar(25) DEFAULT NULL,
  `tag_with_product_request_date_time` datetime NOT NULL DEFAULT current_timestamp(),
  `tag_with_product_request_answered` tinyint(1) NOT NULL DEFAULT 0,
  `admin_note` varchar(200) DEFAULT NULL,
  `request_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `tag_with_product_request_response` (
  `tag_with_product_request_response_id` int(11) NOT NULL,
  `tag_with_product_request_id` int(11) NOT NULL,
  `admin_id` int(11) NOT NULL,
  `allowed_or_denied` tinyint(1) NOT NULL,
  `response_date_time` datetime NOT NULL,
  `admin_note` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `tag_change_history` (
  `tag_change_history_id` int(11) NOT NULL,
  `tag_id` int(11) NOT NULL,
  `admin_id` int(11) NOT NULL,
  `tag_old_name` varchar(25) NOT NULL,
  `tag_old_slug` varchar(25) NOT NULL,
  `tag_change_date_time` datetime NOT NULL DEFAULT current_timestamp(),
  `tag_passive` tinyint(1) NOT NULL,
  `history_id` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `member` (
  `member_id` int(11) NOT NULL,
  `member_username` varchar(60) NOT NULL,
  `member_slug` varchar(60) NOT NULL,
  `member_first_email` varchar(60) NOT NULL,
  `member_email` varchar(60) NOT NULL,
  `member_password_hash` varchar(60) NOT NULL,
  `member_create_date_time` datetime NOT NULL DEFAULT current_timestamp(),
  `member_password_change_count` int(11) NOT NULL DEFAULT 0,
  `member_confirmed_email` tinyint(1) NOT NULL DEFAULT 0,
  `member_deleted` tinyint(1) DEFAULT 0,
  `request_pointer` int(11) NOT NULL DEFAULT 0,
  `member_restricted` tinyint(1) DEFAULT 0,
  `point` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `member_email_history` (
  `member_email_history_id` int(11) NOT NULL,
  `member_id` int(11) NOT NULL,
  `member_email` varchar(60) NOT NULL,
  `change_date_time` datetime NOT NULL DEFAULT current_timestamp(),
  `confirmed_email_date_time` datetime DEFAULT NULL,
  `code` int(6) NOT NULL,
  `member_confirmed_email` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `member_password_change_history` (
  `member_password_change_history_id` int(11) NOT NULL,
  `member_id` int(11) NOT NULL,
  `change_date_time` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `reset_password` (
  `reset_password_id` int(11) NOT NULL,
  `member_id` int(11) NOT NULL,
  `recovery_code` varchar(30) NOT NULL,
  `reset_password_date_time` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


CREATE TABLE `comment` (
  `comment_id` int(11) NOT NULL,
  `member_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `admin_id` int(11) DEFAULT NULL,
  `comment_text` varchar(500) NOT NULL,
  `comment_create_date_time` datetime NOT NULL DEFAULT current_timestamp(),
  `comment_edited` tinyint(1) NOT NULL DEFAULT 0,
  `comment_deleted` tinyint(1) NOT NULL DEFAULT 0,
  `comment_last_edit_date_time` datetime DEFAULT NULL,
  `comment_like_count` int(11) NOT NULL DEFAULT 0,
  `history_pointer` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `comment_request` (
  `comment_request_id` int(11) NOT NULL,
  `member_id` int(11) NOT NULL,
  `product_request_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `comment_id` int(11) DEFAULT NULL,
  `comment_text` varchar(10000) NOT NULL,
  `comment_request_date_time` datetime NOT NULL DEFAULT current_timestamp(),
  `comment_request_answered` tinyint(1) NOT NULL DEFAULT 0,
  `admin_note` varchar(200) DEFAULT NULL,
  `cancelled` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `comment_request_response` (
  `comment_request_response_id` int(11) NOT NULL,
  `comment_request_id` int(11) NOT NULL,
  `admin_id` int(11) DEFAULT NULL,
  `allowed_or_denied` tinyint(1) NOT NULL,
  `response_date_time` datetime NOT NULL DEFAULT current_timestamp(),
  `admin_note` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `comment_history` (
  `comment_history_id` int(11) NOT NULL,
  `comment_id` int(11) NOT NULL,
  `admin_id` int(11) DEFAULT NULL,
  `comment_old_text` varchar(500) NOT NULL,
  `comment_change_date_time` datetime NOT NULL DEFAULT current_timestamp(),
  `history_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `comment_delete_history` (
  `comment_delete_history_id` int(11) NOT NULL,
  `comment_id` int(11) NOT NULL,
  `admin_id` int(11) DEFAULT NULL,
  `comment_delete_date_time` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `comment_like` (
  `comment_like_id` int(11) NOT NULL,
  `comment_id` int(11) NOT NULL,
  `member_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `comment_like_history` (
  `comment_like_history_id` int(11) NOT NULL,
  `comment_id` int(11) NOT NULL,
  `member_id` int(11) NOT NULL,
  `comment_like_date_time` datetime NOT NULL DEFAULT current_timestamp(),
  `liked_or_dislike` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `tag_rating` (
  `tag_rating_id` int(11) NOT NULL,
  `tag_with_product_id` int(11) DEFAULT NULL,
  `tag_with_product_request_id` int(11) DEFAULT NULL,
  `member_id` int(11) NOT NULL,
  `tag_rating_value` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `tag_rating_history` (
  `tag_rating_history_id` int(11) NOT NULL,
  `tag_with_product_id` int(11) NOT NULL,
  `member_id` int(11) NOT NULL,
  `tag_rating_date_time` datetime NOT NULL DEFAULT current_timestamp(),
  `tag_rating_value` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


CREATE TABLE `product_follow` (
  `product_follow_id` int(11) NOT NULL,
  `member_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `last_seen_date_time` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `product_follow_history` (
  `product_follow_history_id` int(11) NOT NULL,
  `member_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `product_follow_date_time` datetime NOT NULL DEFAULT current_timestamp(),
  `follow_or_unfollow` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


CREATE TABLE `admin` (
  `admin_id` int(11) NOT NULL,
  `admin_username` varchar(60) NOT NULL,
  `admin_email` varchar(60) NOT NULL,
  `admin_password_hash` varchar(60) NOT NULL,
  `admin_inactive` tinyint(1) NOT NULL DEFAULT 0,
  `admin_root` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `admin_making_history` (
  `admin_making_history_id` int(11) NOT NULL,
  `maker_admin_id` int(11) NOT NULL,
  `admin_id` int(11) NOT NULL,
  `member_id` int(11) DEFAULT NULL,
  `admin_making_date_time` datetime NOT NULL DEFAULT current_timestamp(),
  `admin_note` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `product_visible_history` (
  `product_visible_history_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `admin_id` int(11) NOT NULL,
  `product_visible_history_date_time` datetime NOT NULL DEFAULT current_timestamp(),
  `visible_or_invisible` tinyint(1) NOT NULL,
  `admin_note` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `member_delete_history` (
  `member_delete_history_id` int(11) NOT NULL,
  `admin_id` int(11) DEFAULT NULL,
  `member_id` int(11) NOT NULL,
  `member_delete_date_time` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `tag_visible_history` (
  `tag_visible_history_id` int(11) NOT NULL,
  `tag_id` int(11) NOT NULL,
  `admin_id` int(11) NOT NULL,
  `tag_visible_history_date_time` datetime NOT NULL DEFAULT current_timestamp(),
  `visible_or_invisible` tinyint(1) NOT NULL,
  `admin_note` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `admin_inactive_history` (
  `admin_inactive_history_id` int(11) NOT NULL,
  `subject_admin_id` int(11) NOT NULL,
  `admin_id` int(11) NOT NULL,
  `admin_inactive_date_time` datetime NOT NULL,
  `active_or_inactive` tinyint(1) NOT NULL,
  `admin_note` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `member_restricted_history` (
  `member_restricted_history_id` int(11) NOT NULL,
  `admin_id` int(11) DEFAULT NULL,
  `member_id` int(11) NOT NULL,
  `member_restricted_history_date_time` datetime NOT NULL DEFAULT current_timestamp(),
  `restricted` tinyint(1) NOT NULL,
  `admin_note` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


CREATE TABLE `product_page_load_history` (
  `product_page_load_history_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `start_date_time` datetime NOT NULL,
  `finish_date_time` datetime NOT NULL,
  `product_page_load_count` int(11) NOT NULL,
  `product_page_load_count_unique_ip` int(11) NOT NULL,
  `product_page_load_count_member` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `product_fetch_history` (
  `product_fetch_history_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `start_date_time` datetime NOT NULL,
  `finish_date_time` datetime NOT NULL,
  `product_fetch_count` int(11) NOT NULL,
  `product_fetch_count_unique_ip` int(11) NOT NULL,
  `product_fetch_count_member` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `product_page_load_temp` (
  `product_page_load_temp_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `member_id` int(11) DEFAULT NULL,
  `page_load_count` int(11) NOT NULL,
  `ip_address` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `product_fetch_temp` (
  `product_fetch_temp_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `member_id` int(11) DEFAULT NULL,
  `fetch_count` int(11) NOT NULL,
  `ip_address` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


CREATE TABLE `comment_report_request` (
  `comment_report_request_id` int(11) NOT NULL,
  `member_id` int(11) NOT NULL,
  `comment_id` int(11) NOT NULL,
  `report_option_id` int(11) NOT NULL,
  `report_text` varchar(200) DEFAULT NULL,
  `report_date_time` datetime NOT NULL DEFAULT current_timestamp(),
  `report_answered` int(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `comment_report_response` (
  `comment_report_response_id` int(11) NOT NULL,
  `admin_id` int(11) NOT NULL,
  `comment_report_request_id` int(11) NOT NULL,
  `reponse_date_time` datetime NOT NULL DEFAULT current_timestamp(),
  `report_marked_as_read` tinyint(1) NOT NULL DEFAULT 0,
  `report_marked_as_read_date_time` datetime DEFAULT NULL,
  `admin_note` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `report_option` (
  `report_option_id` int(11) NOT NULL,
  `report_option_name` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`product_id`),
  ADD KEY `admin_id` (`admin_id`),
  ADD KEY `member_id` (`member_id`);

ALTER TABLE `product_history`
  ADD PRIMARY KEY (`product_history_id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `admin_id` (`admin_id`),
  ADD KEY `member_id` (`member_id`);

ALTER TABLE `product_request`
  ADD PRIMARY KEY (`product_request_id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `member_id` (`member_id`);

ALTER TABLE `product_request_response`
  ADD PRIMARY KEY (`product_request_response_id`),
  ADD KEY `product_request_id` (`product_request_id`),
  ADD KEY `admin_id` (`admin_id`);
  

ALTER TABLE `tag`
  ADD PRIMARY KEY (`tag_id`),
  ADD KEY `creater_member_id` (`creater_member_id`),
  ADD KEY `admin_id` (`admin_id`),
  ADD KEY `created_for` (`created_for`);

ALTER TABLE `tag_with_product`
  ADD PRIMARY KEY (`tag_with_product_id`),
  ADD KEY `tag_id` (`tag_id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `admin_id` (`admin_id`),
  ADD KEY `member_id` (`member_id`);

ALTER TABLE `tag_with_product_history`
  ADD PRIMARY KEY (`tag_with_product_history_id`),
  ADD KEY `tag_id` (`tag_id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `admin_id` (`admin_id`),
  ADD KEY `member_id` (`member_id`);

ALTER TABLE `tag_with_product_request`
  ADD PRIMARY KEY (`tag_with_product_request_id`),
  ADD KEY `member_id` (`member_id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `product_request_id` (`product_request_id`),
  ADD KEY `tag_id` (`tag_id`);

ALTER TABLE `tag_with_product_request_response`
  ADD PRIMARY KEY (`tag_with_product_request_response_id`),
  ADD KEY `tag_with_product_request_id` (`tag_with_product_request_id`),
  ADD KEY `admin_id` (`admin_id`);
 
ALTER TABLE `tag_change_history`
  ADD PRIMARY KEY (`tag_change_history_id`),
  ADD KEY `tag_id` (`tag_id`),
  ADD KEY `admin_id` (`admin_id`);


ALTER TABLE `member`
  ADD PRIMARY KEY (`member_id`);

ALTER TABLE `member_email_history`
  ADD PRIMARY KEY (`member_email_history_id`),
  ADD KEY `member_id` (`member_id`);

ALTER TABLE `member_password_change_history`
  ADD PRIMARY KEY (`member_password_change_history_id`),
  ADD KEY `member_id` (`member_id`);

ALTER TABLE `reset_password`
  ADD PRIMARY KEY (`reset_password_id`),
  ADD KEY `member_id` (`member_id`);


ALTER TABLE `comment`
  ADD PRIMARY KEY (`comment_id`),
  ADD KEY `member_id` (`member_id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `admin_id` (`admin_id`);

ALTER TABLE `comment_request`
  ADD PRIMARY KEY (`comment_request_id`),
  ADD KEY `member_id` (`member_id`),
  ADD KEY `product_request_id` (`product_request_id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `comment_id` (`comment_id`);

ALTER TABLE `comment_request_response`
  ADD PRIMARY KEY (`comment_request_response_id`),
  ADD KEY `comment_request_id` (`comment_request_id`), 
  ADD KEY `admin_id` (`admin_id`);

ALTER TABLE `comment_history`
  ADD PRIMARY KEY (`comment_history_id`),
  ADD KEY `comment_id` (`comment_id`), 
  ADD KEY `admin_id` (`admin_id`);

ALTER TABLE `comment_delete_history`
  ADD PRIMARY KEY (`comment_delete_history_id`),
  ADD KEY `comment_id` (`comment_id`), 
  ADD KEY `admin_id` (`admin_id`);

ALTER TABLE `comment_like`
  ADD PRIMARY KEY (`comment_like_id`),
  ADD KEY `comment_id` (`comment_id`), 
  ADD KEY `member_id` (`member_id`);

ALTER TABLE `comment_like_history`
  ADD PRIMARY KEY (`comment_like_history_id`),
  ADD KEY `comment_id` (`comment_id`), 
  ADD KEY `member_id` (`member_id`);

ALTER TABLE `tag_rating`
  ADD PRIMARY KEY (`tag_rating_id`),
  ADD KEY `tag_with_product_request_id` (`tag_with_product_request_id`), 
  ADD KEY `tag_with_product_id` (`tag_with_product_id`), 
  ADD KEY `member_id` (`member_id`);

ALTER TABLE `tag_rating_history`
  ADD PRIMARY KEY (`tag_rating_history_id`),
  ADD KEY `tag_with_product_id` (`tag_with_product_id`), 
  ADD KEY `member_id` (`member_id`);


ALTER TABLE `product_follow`
  ADD PRIMARY KEY (`product_follow_id`),
  ADD KEY `member_id` (`member_id`), 
  ADD KEY `product_id` (`product_id`);

ALTER TABLE `product_follow_history`
  ADD PRIMARY KEY (`product_follow_history_id`),
  ADD KEY `member_id` (`member_id`), 
  ADD KEY `product_id` (`product_id`);


ALTER TABLE `admin`
  ADD PRIMARY KEY (`admin_id`);

ALTER TABLE `admin_making_history`
  ADD PRIMARY KEY (`admin_making_history_id`),
  ADD KEY `maker_admin_id` (`maker_admin_id`), 
  ADD KEY `admin_id` (`admin_id`), 
  ADD KEY `member_id` (`member_id`);

ALTER TABLE `product_visible_history`
  ADD PRIMARY KEY (`product_visible_history_id`),
  ADD KEY `product_id` (`product_id`), 
  ADD KEY `admin_id` (`admin_id`);

ALTER TABLE `member_delete_history`
  ADD PRIMARY KEY (`member_delete_history_id`),
  ADD KEY `admin_id` (`admin_id`), 
  ADD KEY `member_id` (`member_id`);

ALTER TABLE `tag_visible_history`
  ADD PRIMARY KEY (`tag_visible_history_id`),
  ADD KEY `tag_id` (`tag_id`), 
  ADD KEY `admin_id` (`admin_id`);

ALTER TABLE `admin_inactive_history`
  ADD PRIMARY KEY (`admin_inactive_history_id`),
  ADD KEY `subject_admin_id` (`subject_admin_id`), 
  ADD KEY `admin_id` (`admin_id`);

ALTER TABLE `member_restricted_history`
  ADD PRIMARY KEY (`member_restricted_history_id`),
  ADD KEY `admin_id` (`admin_id`), 
  ADD KEY `member_id` (`member_id`);


ALTER TABLE `product_page_load_history`
  ADD PRIMARY KEY (`product_page_load_history_id`),
  ADD KEY `product_id` (`product_id`);

ALTER TABLE `product_fetch_history`
  ADD PRIMARY KEY (`product_fetch_history_id`),
  ADD KEY `product_id` (`product_id`);

ALTER TABLE `product_page_load_temp`
  ADD PRIMARY KEY (`product_page_load_temp_id`),
  ADD KEY `product_id` (`product_id`), 
  ADD KEY `member_id` (`member_id`);

ALTER TABLE `product_fetch_temp`
  ADD PRIMARY KEY (`product_fetch_temp_id`),
  ADD KEY `product_id` (`product_id`), 
  ADD KEY `member_id` (`member_id`);


ALTER TABLE `comment_report_request`
  ADD PRIMARY KEY (`comment_report_request_id`),
  ADD KEY `member_id` (`member_id`), 
  ADD KEY `comment_id` (`comment_id`), 
  ADD KEY `report_option_id` (`report_option_id`);

ALTER TABLE `comment_report_response`
  ADD PRIMARY KEY (`comment_report_response_id`),
  ADD KEY `admin_id` (`admin_id`), 
  ADD KEY `comment_report_request_id` (`comment_report_request_id`);

ALTER TABLE `report_option`
  ADD PRIMARY KEY (`report_option_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `product_history`
  MODIFY `product_history_id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `product_request`
  MODIFY `product_request_id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `product_request_response`
  MODIFY `product_request_response_id` int(11) NOT NULL AUTO_INCREMENT;


ALTER TABLE `tag`
  MODIFY `tag_id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `tag_with_product`
  MODIFY `tag_with_product_id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `tag_with_product_history`
  MODIFY `tag_with_product_history_id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `tag_with_product_request`
  MODIFY `tag_with_product_request_id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `tag_with_product_request_response`
  MODIFY `tag_with_product_request_response_id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `tag_change_history`
  MODIFY `tag_change_history_id` int(11) NOT NULL AUTO_INCREMENT;


ALTER TABLE `member`
  MODIFY `member_id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `member_email_history`
  MODIFY `member_email_history_id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `member_password_change_history`
  MODIFY `member_password_change_history_id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `reset_password`
  MODIFY `reset_password_id` int(11) NOT NULL AUTO_INCREMENT;


ALTER TABLE `comment`
  MODIFY `comment_id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `comment_request`
  MODIFY `comment_request_id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `comment_request_response`
  MODIFY `comment_request_response_id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `comment_history`
  MODIFY `comment_history_id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `comment_delete_history`
  MODIFY `comment_delete_history_id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `comment_like`
  MODIFY `comment_like_id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `comment_like_history`
  MODIFY `comment_like_history_id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `tag_rating`
  MODIFY `tag_rating_id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `tag_rating_history`
  MODIFY `tag_rating_history_id` int(11) NOT NULL AUTO_INCREMENT;


ALTER TABLE `product_follow`
  MODIFY `product_follow_id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `product_follow_history`
  MODIFY `product_follow_history_id` int(11) NOT NULL AUTO_INCREMENT;


ALTER TABLE `admin`
  MODIFY `admin_id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `admin_making_history`
  MODIFY `admin_making_history_id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `product_visible_history`
  MODIFY `product_visible_history_id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `member_delete_history`
  MODIFY `member_delete_history_id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `tag_visible_history`
  MODIFY `tag_visible_history_id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `admin_inactive_history`
  MODIFY `admin_inactive_history_id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `member_restricted_history`
  MODIFY `member_restricted_history_id` int(11) NOT NULL AUTO_INCREMENT;


ALTER TABLE `product_page_load_history`
  MODIFY `product_page_load_history_id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `product_fetch_history`
  MODIFY `product_fetch_history_id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `product_page_load_temp`
  MODIFY `product_page_load_temp_id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `product_fetch_temp`
  MODIFY `product_fetch_temp_id` int(11) NOT NULL AUTO_INCREMENT;


ALTER TABLE `comment_report_request`
  MODIFY `comment_report_request_id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `comment_report_response`
  MODIFY `comment_report_response_id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `report_option`
  MODIFY `report_option_id` int(11) NOT NULL AUTO_INCREMENT;


-- ilişkiler
ALTER TABLE `product`
  ADD CONSTRAINT `product_fk_1` FOREIGN KEY (`admin_id`) REFERENCES `admin` (`admin_id`),
  ADD CONSTRAINT `product_fk_2` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`);

ALTER TABLE `product_history`
  ADD CONSTRAINT `product_history_fk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`),
  ADD CONSTRAINT `product_history_fk_2` FOREIGN KEY (`admin_id`) REFERENCES `admin` (`admin_id`),
  ADD CONSTRAINT `product_history_fk_3` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`);

ALTER TABLE `product_request`
  ADD CONSTRAINT `product_request_fk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`),
  ADD CONSTRAINT `product_request_fk_2` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`);

ALTER TABLE `product_request_response`
  ADD CONSTRAINT `product_request_response_fk_1` FOREIGN KEY (`product_request_id`) REFERENCES `product_request` (`product_request_id`),
  ADD CONSTRAINT `product_request_response_fk_2` FOREIGN KEY (`admin_id`) REFERENCES `admin` (`admin_id`);

ALTER TABLE `tag`
  ADD CONSTRAINT `tag_fk_1` FOREIGN KEY (`creater_member_id`) REFERENCES `member` (`member_id`),
  ADD CONSTRAINT `tag_fk_2` FOREIGN KEY (`admin_id`) REFERENCES `admin` (`admin_id`),
  ADD CONSTRAINT `tag_fk_3` FOREIGN KEY (`created_for`) REFERENCES `product` (`product_id`);

ALTER TABLE `tag_with_product`
  ADD CONSTRAINT `tag_with_product_fk_1` FOREIGN KEY (`tag_id`) REFERENCES `tag` (`tag_id`),
  ADD CONSTRAINT `tag_with_product_fk_2` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`),
  ADD CONSTRAINT `tag_with_product_fk_3` FOREIGN KEY (`admin_id`) REFERENCES `admin` (`admin_id`),
  ADD CONSTRAINT `tag_with_product_fk_4` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`);

ALTER TABLE `tag_with_product_history`
  ADD CONSTRAINT `tag_with_product_history_fk_1` FOREIGN KEY (`tag_id`) REFERENCES `tag` (`tag_id`),
  ADD CONSTRAINT `tag_with_product_history_fk_2` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`),
  ADD CONSTRAINT `tag_with_product_history_fk_3` FOREIGN KEY (`admin_id`) REFERENCES `admin` (`admin_id`),
  ADD CONSTRAINT `tag_with_product_history_fk_4` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`);

ALTER TABLE `tag_with_product_request`
  ADD CONSTRAINT `tag_with_product_request_fk_1` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`),
  ADD CONSTRAINT `tag_with_product_request_fk_2` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`),
  ADD CONSTRAINT `tag_with_product_request_fk_3` FOREIGN KEY (`product_request_id`) REFERENCES `product_request` (`product_request_id`),
  ADD CONSTRAINT `tag_with_product_request_fk_4` FOREIGN KEY (`tag_id`) REFERENCES `tag` (`tag_id`);

ALTER TABLE `tag_with_product_request_response`
  ADD CONSTRAINT `tag_with_product_request_response_fk_1` FOREIGN KEY (`tag_with_product_request_id`) REFERENCES `tag_with_product_request` (`tag_with_product_request_id`),
  ADD CONSTRAINT `tag_with_product_request_response_fk_2` FOREIGN KEY (`admin_id`) REFERENCES `admin` (`admin_id`);

ALTER TABLE `tag_change_history`
  ADD CONSTRAINT `tag_change_history_fk_1` FOREIGN KEY (`tag_id`) REFERENCES `tag` (`tag_id`),
  ADD CONSTRAINT `tag_change_history_fk_2` FOREIGN KEY (`admin_id`) REFERENCES `admin` (`admin_id`);

ALTER TABLE `member_email_history`
  ADD CONSTRAINT `member_email_history_fk_1` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`);

ALTER TABLE `member_password_change_history`
  ADD CONSTRAINT `member_password_change_history_fk_1` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`);

ALTER TABLE `reset_password`
  ADD CONSTRAINT `reset_password_fk_1` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`);

ALTER TABLE `comment`
  ADD CONSTRAINT `comment_fk_1` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`),
  ADD CONSTRAINT `comment_fk_2` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`),
  ADD CONSTRAINT `comment_fk_3` FOREIGN KEY (`admin_id`) REFERENCES `admin` (`admin_id`);

ALTER TABLE `comment_request`
  ADD CONSTRAINT `comment_request_fk_1` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`),
  ADD CONSTRAINT `comment_request_fk_2` FOREIGN KEY (`product_request_id`) REFERENCES `product_request` (`product_request_id`),
  ADD CONSTRAINT `comment_request_fk_3` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`),
  ADD CONSTRAINT `comment_request_fk_4` FOREIGN KEY (`comment_id`) REFERENCES `comment` (`comment_id`);

ALTER TABLE `comment_request_response`
  ADD CONSTRAINT `comment_request_response_fk_1` FOREIGN KEY (`comment_request_id`) REFERENCES `comment_request` (`comment_request_id`),
  ADD CONSTRAINT `comment_request_response_fk_2` FOREIGN KEY (`admin_id`) REFERENCES `admin` (`admin_id`);

ALTER TABLE `comment_history`
  ADD CONSTRAINT `comment_history_fk_1` FOREIGN KEY (`comment_id`) REFERENCES `comment` (`comment_id`),
  ADD CONSTRAINT `comment_history_fk_2` FOREIGN KEY (`admin_id`) REFERENCES `admin` (`admin_id`);

ALTER TABLE `comment_delete_history`
  ADD CONSTRAINT `comment_delete_history_fk_1` FOREIGN KEY (`comment_id`) REFERENCES `comment` (`comment_id`),
  ADD CONSTRAINT `comment_delete_history_fk_2` FOREIGN KEY (`admin_id`) REFERENCES `admin` (`admin_id`);

ALTER TABLE `comment_like`
  ADD CONSTRAINT `comment_like_fk_1` FOREIGN KEY (`comment_id`) REFERENCES `comment` (`comment_id`),
  ADD CONSTRAINT `comment_like_fk_2` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`);

ALTER TABLE `comment_like_history`
  ADD CONSTRAINT `comment_like_history_fk_1` FOREIGN KEY (`comment_id`) REFERENCES `comment` (`comment_id`),
  ADD CONSTRAINT `comment_like_history_fk_2` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`);

ALTER TABLE `tag_rating`
  ADD CONSTRAINT `tag_rating_fk_1` FOREIGN KEY (`tag_with_product_id`) REFERENCES `tag_with_product` (`tag_with_product_id`),
  ADD CONSTRAINT `tag_rating_fk_2` FOREIGN KEY (`tag_with_product_request_id`) REFERENCES `tag_with_product_request` (`tag_with_product_request_id`),
  ADD CONSTRAINT `tag_rating_fk_3` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`);

ALTER TABLE `tag_rating_history`
  ADD CONSTRAINT `tag_rating_history_fk_1` FOREIGN KEY (`tag_with_product_id`) REFERENCES `tag_with_product` (`tag_with_product_id`),
  ADD CONSTRAINT `tag_rating_history_fk_2` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`);

ALTER TABLE `product_follow`
  ADD CONSTRAINT `product_follow_fk_1` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`),
  ADD CONSTRAINT `product_follow_fk_2` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`);

ALTER TABLE `product_follow_history`
  ADD CONSTRAINT `product_follow_history_fk_1` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`),
  ADD CONSTRAINT `product_follow_history_fk_2` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`);

ALTER TABLE `admin_making_history`
  ADD CONSTRAINT `admin_making_history_fk_1` FOREIGN KEY (`maker_admin_id`) REFERENCES `admin` (`admin_id`),
  ADD CONSTRAINT `admin_making_history_fk_2` FOREIGN KEY (`admin_id`) REFERENCES `admin` (`admin_id`),
  ADD CONSTRAINT `admin_making_history_fk_3` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`);

ALTER TABLE `product_visible_history`
  ADD CONSTRAINT `product_visible_history_fk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`),
  ADD CONSTRAINT `product_visible_history_fk_2` FOREIGN KEY (`admin_id`) REFERENCES `admin` (`admin_id`);

ALTER TABLE `member_delete_history`
  ADD CONSTRAINT `member_delete_history_fk_1` FOREIGN KEY (`admin_id`) REFERENCES `admin` (`admin_id`),
  ADD CONSTRAINT `member_delete_history_fk_2` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`);

ALTER TABLE `tag_visible_history`
  ADD CONSTRAINT `tag_visible_history_fk_1` FOREIGN KEY (`tag_id`) REFERENCES `tag` (`tag_id`),
  ADD CONSTRAINT `tag_visible_history_fk_2` FOREIGN KEY (`admin_id`) REFERENCES `admin` (`admin_id`);

ALTER TABLE `admin_inactive_history`
  ADD CONSTRAINT `admin_inactive_history_fk_1` FOREIGN KEY (`subject_admin_id`) REFERENCES `admin` (`admin_id`),
  ADD CONSTRAINT `admin_inactive_history_fk_2` FOREIGN KEY (`admin_id`) REFERENCES `admin` (`admin_id`);

ALTER TABLE `member_restricted_history`
  ADD CONSTRAINT `member_restricted_history_fk_1` FOREIGN KEY (`admin_id`) REFERENCES `admin` (`admin_id`),
  ADD CONSTRAINT `member_restricted_history_fk_2` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`);

ALTER TABLE `product_page_load_history`
  ADD CONSTRAINT `product_page_load_history_fk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`);

ALTER TABLE `product_fetch_history`
  ADD CONSTRAINT `product_fetch_history_fk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`);

ALTER TABLE `product_page_load_temp`
  ADD CONSTRAINT `product_page_load_temp_fk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`),
  ADD CONSTRAINT `product_page_load_temp_fk_2` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`);

ALTER TABLE `product_fetch_temp`
  ADD CONSTRAINT `product_fetch_temp_fk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`),
  ADD CONSTRAINT `product_fetch_temp_fk_2` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`);

ALTER TABLE `comment_report_request`
  ADD CONSTRAINT `comment_report_request_fk_1` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`),
  ADD CONSTRAINT `comment_report_request_fk_2` FOREIGN KEY (`comment_id`) REFERENCES `comment` (`comment_id`),
  ADD CONSTRAINT `comment_report_request_fk_3` FOREIGN KEY (`report_option_id`) REFERENCES `report_option` (`report_option_id`);

ALTER TABLE `comment_report_response`
  ADD CONSTRAINT `comment_report_response_fk_1` FOREIGN KEY (`admin_id`) REFERENCES `admin` (`admin_id`),
  ADD CONSTRAINT `comment_report_response_fk_2` FOREIGN KEY (`comment_report_request_id`) REFERENCES `comment_report_request` (`comment_report_request_id`);


COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
