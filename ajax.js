function fetchProduct(productName) {
    $.ajax({
        type:'GET',
        url:'https://yorumlaa.herokuapp.com/api/products/'+productName,
        data: "",
        success: function(response){
            console.log(response);
        },
        dataType:'json'
    })
}