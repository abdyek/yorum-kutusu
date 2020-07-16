<?php
    session_start();
    $member = false;
    if(isset($_SESSION["jwt"])) {
        $member = true;
    }

?>