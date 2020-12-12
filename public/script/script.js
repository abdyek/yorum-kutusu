window.history.pushState({content: firstContent}, "", "");
let firstLoading = true;

function getRatingColor(value) {
    if(value>=0 && value<3) {
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

function getPathNames() {
    const url = new URL(window.location.href);
    const pathname = url.pathname;
    const pathNames = pathname.split("/");
    const ret = [];
    for(let i=0;i<pathNames.length;i++) {
        if(pathNames[i]) {
            ret.push(pathNames[i]);
        }
    }
    return ret;
}

function setCookie(key, value) {
    document.cookie = key + "=" + value;
}
function getCookie(key) {
    return document.cookie.split('; ').find(row=>row.startWith(key)).split('=')[1];
}
