<?php
// mysqli
$db = new mysqli("127.0.0.1", "root", "", "chrome_timetable");

if ($db->connect_errno) {
    die("Sorry, we are having some problems.");
}