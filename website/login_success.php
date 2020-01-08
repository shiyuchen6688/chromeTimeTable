<!-- This page will show up if you loged in success or if you just sign up -->
<?php
// sessions
include "../db/connect.php";
include "../security/security.php";
include "../session/session_start.php";
echo "You are in!";
echo '<pre>',  print_r($_SESSION['curr_user']), '</pre>';
?>