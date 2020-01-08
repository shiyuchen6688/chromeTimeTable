<?php
include "../db/connect.php";
include "../security/security.php";
include "../session/session_start.php";

if (!empty($_POST)) {
    // echo "not empty";
    if (isset($_POST['userName']) && isset($_POST['passWord'])) {
        $user_name = escape($_POST['userName']);
        $password = escape($_POST['passWord']);
        // echo "both is set";
        if (!empty($user_name) && !empty($password)) {
            $result = $db->query("SELECT * FROM users");
            // echo "- both not empty -";
            $contains_user = 0;
            while ($row = $result->fetch_object()) {
                if ($row->user_name == $user_name) {
                    // if found user_name
                    $contains_user = 1;
                    if ($row->password == $password) {
                        // if correct password
                        echo "success";
                        $_SESSION['curr_user'] = $row;
                        header("Location: login_success.php");
                        break;
                    } else {
                        // if wrong password
                        echo "Wrong password";
                    }
                }
            }
            if (!$contains_user) {
                // if user name not found
                echo "User Name Does Not Exist, Please Sign Up First.";
            }
        } else {
            echo "Invalid User Name Or Password";
        }
    }
}
// echo "empty";
?>

<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <link rel="stylesheet" type="text/css" href="common_style.css">
    <title>Log in</title>
</head>

<body>
    <div class="page-heading">
        <h1>Simple Time Table</h1>
        <h2>Log in</h2>
    </div>

    <hr>
    <div class="form-container">
        <div class="login-form">
            <form action="login.php" method="POST">
                <label for="userName">User Name: </label>
                <input type="text" name="userName" id="userName">
                <br>
                <label for="passWord">Password: </label>
                <input type="text" name="passWord" id="passWord">
                <br>
                <button type="submit" name="loginBtn">Log in</button>
            </form>
        </div>
    </div>
</body>

</html>