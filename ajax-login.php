<?php

    require "session.php";
    require "tool.php";

    if(!isset($_POST["user"])){
        header('Location: index');
        exit();
    }

    $userInfo = array(
        "user"=> [
            "email_or_username" => $_POST["user"]["email_or_username"],
            "password"=> $_POST["user"]["password"]
        ]
    );

    $apiResponse = CallAPI("POST", "https://yorumlaa.herokuapp.com/api/login/", http_build_query($userInfo));
    echo json_encode($apiResponse);

    if(isset($apiResponse["message"])) {
        echo json_encode($apiResponse);
        // ^ sadece hata mesajlarında message key'i olduğu için hata varsa client'a yolla direkt
    } else {
        $_SESSION["jwt"] = $apiResponse["jwt"];
        $_SESSION["id"] = $apiResponse["id"];
        $_SESSION["username"] = $apiResponse["username"];
        $_SESSION["verification"] = $apiResponse["varification"];
    }

?>