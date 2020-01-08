<?php
include "../db/connect.php";
include "../security/security.php";
include "../session/session_start.php";

if (!empty($_POST)) {
    if (isset($_POST['userName']) && isset($_POST['passWord'])) {
        $user_name = escape($_POST['userName']);
        $password = escape($_POST['passWord']);
        $bio = escape($_POST['bio']);

        if (!empty($user_name) && !empty($password)) {
            $insert = $db->prepare("INSERT INTO users (user_name, password, bio, created_date) VALUE(?, ?, ?, NOW())");
            $insert->bind_param('sss', $user_name, $password, $bio);

            if ($insert->execute()) {
                echo "success";
                $insert->close();
                $get = $db->prepare("SELECT user_id, user_name, password, bio, created_date FROM users WHERE user_name = ? AND password = ?");
                echo $db->error;
                $get->bind_param('ss', $user_name, $password);
                $get->execute();
                $get->bind_result($user_id, $user_name, $password, $bio, $created_data);
                $get->fetch();
                $assArr = array(
                    "user_id" => $user_id,
                    "user_name" => $user_name,
                    "password" => $password,
                    "bio" => $bio,
                    "created_date" => $created_data,
                );
                // echo '<pre>', print_r($assArr), '</pre>';
                $_SESSION['curr_user'] = (object) $assArr;
                $get->close();
                header("Location: login_success.php");
            } else {
                echo "fail";
                echo $db->error;
                header("Location: signnup.php");
            }
        } else {
            echo "Invalid User Name Or Password";
        }
    }
}
?>

<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <link rel="stylesheet" type="text/css" href="common_style.css">
    <title>Sign Up</title>
</head>

<body>
    <h1>Simple Time Table</h1>

    <h2>Sign Up</h2>

    <hr>

    <div class="form-container">
        <div class="signup-form" >
            <form action="signup.php" method="POST">
                <label for="userName">User Name: </label>
                <input type="text" name="userName" id="userName">
                <br>
                <label for="passWord">Password: </label>
                <input type="text" name="passWord" id="passWord">
                <br>
                <label for="bio">Bio (optional): </label>
                <textarea name="bio" id="bio"></textarea>
                <br>
                <br>
                <button type="submit" id="signUpBtn">Sign Up</button>
            </form>
        </div>
    </div>
</body>

</html>