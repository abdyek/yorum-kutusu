window.history.pushState({content: firstContent}, "", "");
let firstLoading = true;

// bunu her istek için tekrardan tanımlamak zorunda olabilirim
const Http = new XMLHttpRequest({mozSystem: true});