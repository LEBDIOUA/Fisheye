const currentPath = window.location.pathname;

if(currentPath === "/"){
    import("./mainIndex.js").then((mainIndex) => {
        mainIndex.default;
    }).catch((error) => {
        console.error("Erreur de chargement du module :", error);
    });
}

else if(currentPath === "/pages/photographer.html"){
    import("./mainPhotographer.js").then((mainPhotograph) => {
        mainPhotograph.default;
    }).catch((error) => {
        console.error("Erreur de chargement du module :", error);
    });
}