fonki = (th) => {
    th.setState({form:"loading"});
}

/*
get = (th, url, data)=>{
    fetch()
}
        fetch('http://localhost/yorum-kutusu/api/product' + '?' + getUrlPar({
            "productSlug":this.productSlug,
            "sortBy":"like",
            "pageNumber":this.pageNumber,
            "onlyComment":false
        }), {method: 'GET'}).then(response => response.json()).then(
                (json)=> {console.log(json);
                    if(!json['other']['comments'].length && this.pageNumber!=1) {
                        console.log("ilk sayfaya yönlendirmeli");
                    }
                    this.setState({
                        form:"normal",
                        productName:json['other']['product']['title'],
                        comments: this.normalizer('comments', json['other']['comments'])
                    });
                }
        ).catch((error) => {console.log("err: " + error); this.setState({form:"notFound"})});
*/
