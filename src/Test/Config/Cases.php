<?php

namespace YorumKutusu\Test\Config;

class Cases {
    public function __construct() {
        $this->obj = [
            'example'=>[
                /*
                [
                    'method'=>'methodV1',
                    'request'=>'POST',
                    'parameter'=>['a', 'b', 'c'],
                    'data'=>[
                        'return'=>'$return',
                        'value'=>15
                    ]
                ],
                [
                    'method'=>'methodV2',
                    'request'=>'POST',
                    'parameter'=>['a', 'b', 'c'],
                    'calculator'=>function($arg) {
                        
                    }
                ],
                 */
                [
                    'functionName'=>'method1',
                    'method'=>'POST',
                    'data'=>[
                        'type'=>'return',
                        'value'=>15
                    ]
                ],
                [
                    'functionName'=>'method2',
                    'method'=>'POST',
                    'data'=>[
                        'type'=>'attribute',
                        'attributeName'=>'studentName',
                        'value'=>'hüseyin'
                    ]
                ],
                [
                    'functionName'=>'method3',
                    'method'=>'POST',
                    'data'=>[
                        'type'=>'return',
                        'parameters'=>[3,5],
                        'value'=>8
                    ]
                ],
                [
                    'functionName'=>'method4',
                    'method'=>'POST',
                    'data'=>[
                        'type'=>'attribute',
                        'attributeName'=>'result',
                        'parameters'=>[3,10],
                        'value'=> function($arg) {
                            return $arg[0]+$arg[1];
                        }
                    ]
                ],
                [
                    'functionName'=>'method5',
                    'method'=>'POST',
                    'data'=>[
                        'type'=>'return',
                        'parameters'=>[10],
                        'value'=> function($arg) {
                            $n = $arg[0];
                            $arr = [];
                            for($i=1;$i<=$n;$i++) {
                                $arr[] = $i;
                            }
                            return $arr;
                        }
                    ]
                ],
                /*
                [
                    'functionName'=>'method6',
                    'method'=>'POST',
                    'data'=>[
                        'type'=>'return',
                        'parameters'=>[10],
                        'checker'=>function() {
                            // true dönerse başarılı, false dönerse fail
                        }
                    ]
                ],
                 */
            ]
        ];
        return $this->obj;
    }
}
