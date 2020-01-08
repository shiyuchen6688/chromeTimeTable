<!-- Record tasks user planned -->
<?php
include "../db/connect.php";
include "../security/security.php";
include "../session/session_start.php";

echo "Hello";
// $test = "test2";
// $insert = $db->prepare("INSERT INTO tasks (task_name, created_time, task_type, user_id, done)
//         VALUES (?, NOW(),'NONE', 1, 0)");
// $insert->bind_param('s', $test);
// echo $db->error;
if (!empty($_GET)) {
    echo "not empty";
    if (isset($_GET['hour']) && isset($_GET['min']) && isset($_GET['newTaskName'])) {
        $hour = escape($_GET['hour']);
        $min = escape($_GET['min']);
        $new_task_name = escape($_GET['newTaskName']);
        echo $hour;
        // currently assume only one user, change later
        $user_id = 1;
        $insert = $db->prepare("INSERT INTO tasks (task_name, created_time, task_type, user_id, done)
        VALUES (?, NOW(),'NONE', 1, 0)");
        $insert->bind_param('s', $new_task_name);
        $insert->execute();
        $insert->close();
        echo $db->error;
    }
}
echo "empty";
?>