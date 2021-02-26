window.history.pushState({content: firstContent}, "", "");
let firstLoading = true;

const turkishChars = {
    "ğ": "g",
    "ü": "u",
    "ş": "s",
    "ı": "i",
    "ö": "o",
    "ç": "c"
};

function getRatingColor(value) {
    if(value=="-") {
        return "";
    } else if(value>=0 && value<3) {
        return "red";
    } else if(value>=3 && value<5) {
        return "orange";
    } else if(value>=5 && value<7) {
        return "yellow";
    } else if(value>=7 && value<9) {
        return "teal";
    } else if(value>=9 && value<=10) {
        return "blue";
    }
}

function getUrlPar(data) {
    let keys = Object.keys(data);
    for(let i=0;i<keys.length;i++) {
        if(data[keys[i]]===false) {
            data[keys[i]]=0;
        } else if(data[keys[i]]===true) {
            data[keys[i]]=1;
        }
    }
    return Object.entries(data).map(e => e.join('=')).join('&');
}

function getSlugs(pageName) {
    let slugs = window.location.href.split(pageName)[1].split(",");
    slugs[0] = (slugs[0][0]=="/")?slugs[0].substr(1):slugs[0];
    let lastSlugs = slugs[slugs.length-1];
    slugs[slugs.length-1] = (lastSlugs[lastSlugs.length-1]=="/")?lastSlugs.substr(0, lastSlugs.length-1):lastSlugs;
    // ^ burada olası ön ve arka kısımdaki / işaretlerini temizliyorum
    return slugs;
}

function getSlugsExtra(pageName) {
    let afterPageName = window.location.href.split(pageName)[1];
    let slugs = afterPageName.split("/");
    let valuableSlugs = [];
    for(let i=0;i<slugs.length;i++) {
        if(slugs[i]){
            valuableSlugs.push(slugs[i]);
        }
    }
    return valuableSlugs;
}

function isMember() {
    return (getCookie('user') && getCookie('user')!='null');
}

function getPathNames(href) {
    href = href || window.location.href;
    const url = new URL(href);
    const pathname = url.pathname;
    const pathNames = pathname.split("/");
    const ret = [];
    for(let i=0;i<pathNames.length;i++) {
        if(pathNames[i]) {
            ret.push(pathNames[i]);
        }
    }
    if(ret[0]=="yorum-kutusu") {
        // localhost/yorum-kutusu
        ret.shift();
    }
    return ret;
}

function setCookie(key, value) {
    let now = new Date();
    let time = now.getTime();
    let expireTime = time + 31556926000;
    now.setTime(expireTime);
    document.cookie = key+'='+value+';expires='+now.toUTCString()+';path=/';
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
        c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function isMobile() {
    return (window.innerWidth<768)?true: false
}

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function normalizer(key, data) {
    if(key=='comments') {
        let comments = [];
        for(let i=0;i<data.length;i++) {
            let com = data[i];
            comments.push({
                id:com.commentID,
                text:com.commentText,
                //commentEdited,
                //commentLastEditDateTime,
                likeCount:com.commentLikeCount,
                liked:com.liked,
                title:com.owner.username,
                type:"profile",
                slug:com.owner.slug,
                date:com.commentCreateDateTime,
                rating:normalizer('comment-rating', com.rating),
                // tag 'dı rating yaptım
                /*
                tags:{3:{
                                passive:false,
                                text:"Batarya",
                                color:"yellow",
                                rateValue: "5",
                                slug:"batarya"
                        },
                        4:{
                                passive:false,
                                text:"Kamera",
                                color:"orange",
                                rateValue: "4",
                                slug:"kamera"
                        },
                        5:{
                                passive:false,
                                text:"Tasarım",
                                color:"",
                                rateValue: "-",
                                slug:"tasarim"
                        }
                },
                */
                owner:com.isOwner,
                reported:com.reported,
                hidden:com.hidden
            })
        }
        return comments;
    } else if(key=="comment-rating") {
        let tags = [];
        let keys = Object.keys(data);
        for(let i=0; i<keys.length; i++) {
            tags.push({
                passive: false,
                text:data[i].tagName,
                color:getRatingColor(data[i].ratingValue),
                rateValue: data[i].ratingValue,
                slug: data[i].slug
            });
        }
        return tags;
    } else if(key=="tags") {
        let tags = [];
        for(let i=0; i<data.length;i++) {
            tags.push({
                passive: (data[i].tagPassive=="1")?true:false,
                text: data[i].tagName,
                color: getRatingColor(data[i].tagAvarageRating),
                slug: data[i].slug,
                rateValue: (isFloat(parseFloat(data[i].tagAvarageRating)))?parseFloat(data[i].tagAvarageRating).toFixed(1):data[i].tagAvarageRating
            });
        }
        return tags;
    } else if(key=="rating") {
        // used in EditComment::sendComment();
        let rating = {};
        let values = Object.values(data);
        for(let i=0;i<values.length;i++) {
            rating[values[i].slug] = values[i].value
        }
        return rating;
    } else if(key=="tags-for-product-changing") {
        let tags = [];
        for(let i=0;i<data.length;i++) {
            if(data[i].newTag==false) {
                tags.push({
                    id:data[i].id,
                });
            } else if(data[i].newTag) {
                tags.push({
                    newTag:true,
                    name:data[i].name
                });
            }
        }
        return tags;
    } else if(key=="tags-for-product-changing-from-api") {
        let tags = [];
        for(let i=0;i<data.length;i++) {
            tags.push({
                id:data[i].id,
                slug:data[i].slug,
                name:data[i].tagName,
                passive:(data[i].tagPassive=="0")?false:true,
                newTag:false
            })
        }
        return tags;
    }

}

function getUserInfo() {
    if(!isMember()) {
        return null;
    }
    return objectFromBase64(getCookie('user'));
}

function encode_utf8(s) {
  return unescape(encodeURIComponent(s));
}

function decode_utf8(s) {
  return decodeURIComponent(escape(s));
}

function base64FromObject(obj) {
    let stringified = JSON.stringify(obj);
    let encodedUTF8 = encode_utf8(stringified);
    return btoa(encodedUTF8);
}

function objectFromBase64(encoded) {
    let decoded = atob(encoded);
    let decodedUTF8 = decode_utf8(decoded);
    return JSON.parse(decodedUTF8);
}

function isFloat(n){
    return Number(n) === n && n % 1 !== 0;
}

function generateProductSlug(productName) {
    productName = productName.toLowerCase();
    let slug = "";
    for(let i=0;i<productName.length;i++) {
        if(productName[i]==" ") {
            slug += "-";
        } else if(turkishChars[productName[i]]){
            slug += turkishChars[productName[i]];
        } else {
            slug += productName[i];
        }
    }
    return slug;
}

