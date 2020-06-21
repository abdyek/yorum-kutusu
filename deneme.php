<?php

    require "session.php";
    require "tool.php";

    $userInfo = array(
        "user"=> [
            "email_or_username" => "yunusemre",
            "password"=> "abc123"
        ]
    );

    $apiResponse = CallAPI("POST", "https://yorumlaa.herokuapp.com/api/login/", http_build_query($userInfo));

    if(isset($apiResponse["message"])) {
        echo json_encode($apiResponse);
        // ^ sadece hata mesajlarında message key'i olduğu için hata varsa client'a yolla direkt
    } else {
        //$apiResponseArray = json_decode(json_encode($apiResponse), true);
        $apiResponseArray = json_decode($apiResponse, true);
        $_SESSION["jwt"] = $apiResponseArray["jwt"];
        $_SESSION["id"] = $apiResponseArray["id"];
        $_SESSION["username"] = $apiResponseArray["username"];
        $_SESSION["verification"] = $apiResponseArray["verification"];
    }

?>