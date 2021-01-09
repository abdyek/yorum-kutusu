<?php

namespace YorumKutusu\View\Php;
use YorumKutusu\Api\Config\Config;

class Tool {
    public static function generatePage($pageName) {
        $pageTitle = Config::PAGEURL[$pageName]['title'];
        $content = Config::PAGEURL[$pageName]['content'];
        $username = 'mahmut';  // bu şimdilik
        $path = __DIR__ . '/Template.php';
        include $path;
    }
}

?>
