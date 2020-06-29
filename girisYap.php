<?php
    require "session.php";
    print_r($_SESSION);
    if($member) {
        //header('Location: index');
        //exit();
        // ^ bu kısmı girip yap sayfası ile işim bittikten sonra açıcam
    }
?>
<?php if(isset($_SESSION["username"])): // php ile react'ı birleştirmek bana böyle çözümler üretmeye zorladı ?>
    <script>
        <?php echo "const username='".$_SESSION["username"]."'"; ?>
    </script>
<?php else: ?>
    <script>
        <?php echo "const username=undefined"; ?>
    </script>
<?php endif; ?>

<!DOCTYPE html>
<html lang="en">
<head>
    <!-- bu kısım host'a atınca güncellenmeli -->
    <base href="http://localhost/yorumlaa/" >
    <!-- ^ bu kısım host'a atınca güncellenmeli -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hesap</title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="semantic.min.css" />
    <link rel="stylesheet" href="css/loading.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/fork-awesome@1.1.7/css/fork-awesome.min.css" integrity="sha256-gsmEoJAws/Kd3CjuOQzLie5Q3yshhvmo7YNtBG7aaEY=" crossorigin="anonymous">
    <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@500&family=Work+Sans:wght@500&display=swap" rel="stylesheet">
</head>
<body>
    <div id="root">
    </div>
    <script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin></script>
    <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin></script>
    <script
    src="https://code.jquery.com/jquery-3.5.0.min.js"
    integrity="sha256-xNzN2a4ltkB44Mc/Jz3pT4iU1cmeR0FkXs4pru/JxaQ="
    crossorigin="anonymous"></script>
    <script src="semantic.min.js"></script>
    <script src="ajax.js"></script>
    <script src="components.js"></script>
    <script src="logIn.js"></script>
</body>
</html>