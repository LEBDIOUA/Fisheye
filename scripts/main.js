const currentPath = window.location.pathname;
console.log(currentPath);
if(currentPath === "/Fisheye/" || currentPath === "/"){
    import("./mainIndex.js").then((mainIndex) => {
        mainIndex.default;
    }).catch((error) => {
        console.error("Erreur de chargement du module :", error);
    });
}

else if(currentPath === "/Fisheye/pages/photographer.html" || currentPath === "/pages/photographer.html"){
    import("./mainPhotographer.js").then((mainPhotograph) => {
        mainPhotograph.default;
    }).catch((error) => {
        console.error("Erreur de chargement du module :", error);
    });
}
