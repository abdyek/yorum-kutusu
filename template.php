<script>
    let firstContent = "<?php echo $content ?>";
    const SITEURL = "<?php echo Config::SITEURL ?>";
</script>
<!DOCTYPE html>
<html lang="tr">
<head>
    <base href="<?php echo Config::SITEURL ?>" >
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $pageTitle ?></title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/loading.css">

    <link rel="stylesheet" href="css/comment.css">
    <link rel="stylesheet" href="css/filter.css">
    <link rel="stylesheet" href="css/new-product.css">
    <link rel="stylesheet" href="css/profile.css">

    <!-- her sayfanın css sayfasını ayırmak istiyorum buradaki gibi -->
    <link rel="stylesheet" href="css/semantic.min.css" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/fork-awesome@1.1.7/css/fork-awesome.min.css" integrity="sha256-gsmEoJAws/Kd3CjuOQzLie5Q3yshhvmo7YNtBG7aaEY=" crossorigin="anonymous">
    <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@500&family=Work+Sans:wght@500&display=swap" rel="stylesheet">
</head>
<body>
    <div id="root"></div>

    <script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin></script>
    <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin></script>
    <script src="https://unpkg.com/react-router/umd/react-router.min.js"></script>

    <script src="https://code.jquery.com/jquery-3.5.0.min.js" integrity="sha256-xNzN2a4ltkB44Mc/Jz3pT4iU1cmeR0FkXs4pru/JxaQ=" crossorigin="anonymous"></script>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <script src="script/semantic.min.js"></script>
    <script src="script/script.js"></script>

    <!-- React bileşenimizi yükleyin. -->
    <script src="js/components.js"></script>

    <script src="js/cancelButton.js"></script>
    <script src="js/comment.js"></script>
    <script src="js/emailValidation.js"></script>
    <script src="js/emailValidationPage.js"></script>
    <script src="js/filter.js"></script>
    <script src="js/index.js"></script>
    <script src="js/login.js"></script>
    <script src="js/newProduct.js"></script>
    <script src="js/pageNavigation.js"></script>
    <script src="js/product.js"></script>
    <script src="js/profile.js"></script>
    <script src="js/signup.js"></script>
    <script src="js/tag.js"></script>

    <script src="js/app.js"></script>

</body>
</html>