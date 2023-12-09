const currentPath = window.location.pathname;
if (currentPath === '/Fisheye/' || currentPath === '/') {
	import('./mainIndex.js');
} else if (currentPath === '/Fisheye/pages/photographer.html' || currentPath === '/pages/photographer.html') {
	import('./mainPhotographer.js');
}
