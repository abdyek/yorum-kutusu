<?php
    namespace YorumKutusu\View\Php;
    use YorumKutusu\Api\Config\Config;
?>
<!DOCTYPE html>
<script>
    const SITEURL = "<?php echo Config::SITEURL ?>";
</script>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Yönet</title>
    <link rel="stylesheet" href="<?php echo Config::SITEURL ?>public/css/semantic.min.css" />
    <link rel="stylesheet" href="<?php echo Config::SITEURL ?>public/admin/css/style.css">
    <link rel="stylesheet" href="<?php echo Config::SITEURL ?>public/admin/css/theme.css">
</head>
<body>
    <div id="app">
        <div v-if="loading">
            <loading></loading>
        </div>
        <div v-else>
            <login v-if="!entered"></login>
            <div v-else>
                <admin-info></admin-info>
                <all-task></all-task>
            </div>
        </div>
    </div>
    <script src="https://unpkg.com/vuex@3.6.2/dist/vuex.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.js"></script>
    <script src="<?php echo Config::SITEURL ?>public/script/script.js"></script>
    <script src="<?php echo Config::SITEURL ?>public/admin/js/components.js"></script>
    <script src="<?php echo Config::SITEURL ?>public/admin/js/store.js"></script>
    <script src="<?php echo Config::SITEURL ?>public/admin/js/app.js"></script>
</body>
</html>
