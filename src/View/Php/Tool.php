<?php

namespace YorumKutusu\View\Php;
use YorumKutusu\Api\Config\Config;
use YorumKutusu\View\Php\Template;

class Tool {
    public static function generatePage($pageName) {
        $pageTitle = Config::PAGEURL[$pageName]['title'];
        $content = Config::PAGEURL[$pageName]['content'];
        $path = __DIR__ . '/Template.php';
        include $path;
    }
    public static function generateAdminPage() {
        $path = __DIR__ . '/AdminPage.php';
        include $path;
    }
}

?>
