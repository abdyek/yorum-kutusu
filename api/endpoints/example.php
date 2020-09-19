<?php

$selectedTags = [
    3=>[
        'passive'=>false,
        'text'=>"Batarya",
        'color'=>"yellow",
        'rateValue'=>"-",
        'slug'=>"batarya"
    ],
    4=>[
        'passive'=>false,
        'text'=>"Kamera",
        'color'=>"orange",
        'rateValue'=>"-",
        'slug'=>"kamera"
    ],
];

$response = [
    'selectedTags'=>$selectedTags
];

header('Content-Type: application/json');   
echo json_encode($response);

?>