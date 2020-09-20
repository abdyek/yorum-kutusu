window.history.pushState({content: firstContent}, "", "");
let firstLoading = true;


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