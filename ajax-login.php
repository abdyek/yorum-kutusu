<?php

    require "session.php";
    require "tool.php";

    /*
    if(!isset($_POST["user"])){
        header('Location: index');
        exit();
    }
    */

    $userInfo = array(
        "user"=> [
            "email_or_username" => $_POST["user"]["email_or_username"],
            "password"=> $_POST["user"]["password"]
        ]
    );

    $apiResponse = CallAPI("POST", "https://yorumlaa.herokuapp.com/api/login/", http_build_query($userInfo));
    $apiResponseArray = json_decode($apiResponse, true);

    if(isset($apiResponseArray["message"])) {
        echo $apiResponse;
        // ^ sadece hata mesajlarında message key'i olduğu için hata varsa client'a yolla direkt
    } else {
        $_SESSION["jwt"] = $apiResponseArray["jwt"];
        $_SESSION["id"] = $apiResponseArray["id"];
        $_SESSION["username"] = $apiResponseArray["username"];
        $_SESSION["verification"] = $apiResponseArray["verification"];
        echo $apiResponse;
    }

?>