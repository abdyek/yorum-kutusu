<?php

    class Database {
        private static $db;
        public static function connect() {
            try {
                self::$db = new PDO('mysql:host=localhost;dbname='.Config::DBNAME.';charset=utf8', Config::DBID, Config::DBPW);
            } catch (PDOException $e){
                print $e->getMessage();
            }
        }
        public static function getRows($sql, $parameters=NULL) {
            $rows = self::$db->prepare($sql);
            $rows->fetchAll(PDO::FETCH_ASSOC);
            $rows->execute($parameters);
            return $rows;
        }
        public static function getRow($sql, $parameters=NULL) {
            $rows = self::$db->prepare($sql);
            $rows->execute($parameters);
            $row = $rows->fetch(PDO::FETCH_ASSOC);
            return $row;
        }
        public static function execute($sql, $parameters=NULL) {
            $query = self::$db->prepare($sql);
            $query->fetch(PDO::FETCH_ASSOC);
            $state = $query->execute($parameters);
            return ($state)?True:False;
            // ^ işlem başarılı ise True değerini döndürüyor, değilse False
        }

        // şimdilik ek bir fonksiyon olarak yapıyorum, ileride bütün isteklere uygulanabilir
        public static function executeWithError($sql, $parameters=NULL) {
            $query = self::$db->prepare($sql);
            $query->fetch(PDO::FETCH_ASSOC);
            $state = $query->execute($parameters);
            return ($state)? [true]: [false,$query->errorInfo()];
        }
        // diğer hata ile dönenler
        /* lazım olursa uyarlarım
        public static function getRows($sql, $parameters=NULL) {
            $rows = self::$db->prepare($sql);
            $rows->fetchAll(PDO::FETCH_ASSOC);
            $rows->execute($parameters);
            if($rows->errorInfo()[1]) {
                return [false, $rows->errorInfo()];
            }
            return $rows;
        }
        public static function getRow($sql, $parameters=NULL) {
            $rows = self::$db->prepare($sql);
            $rows->execute($parameters);
            $row = $rows->fetch(PDO::FETCH_ASSOC);
            if($rows->errorInfo()[1]) {
                return [false, $rows->errorInfo()];
            }
            return $row;
        }
        */
        
    }

    Database::connect();

?>