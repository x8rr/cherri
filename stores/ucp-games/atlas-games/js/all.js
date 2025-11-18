let backup_icon;
let backup_name;
function setCloak(name, icon) {
	var tabicon = getCookie("tabicon");
	if (tabicon || icon) {
		var link = document.querySelector("link[rel~='icon']");
		if (link) {
			if (link.href != icon) backup_icon = link;
			while (document.querySelector("link[rel~='icon']")) {
				document.querySelector("link[rel~='icon']").remove();
			}
		}
		var link = document.querySelector("link[rel~='shortcut icon']");
		if (link) {
			if (link.href != icon) backup_icon = link;
			while (document.querySelector("link[rel~='shortcut icon']")) {
				document.querySelector("link[rel~='shortcut icon']").remove();
			}
		}
		link = document.createElement("link");
		link.rel = "icon";
		document.head.appendChild(link);
		link.href = tabicon;
		if (name) {
			link.href = icon;
		}
	}

	var tabname = getCookie("tabname");
	backup_name = document.title;
	if (tabname) {
		document.title = tabname;
	}
	if (name) {
		document.title = name;
	}
	panicMode();
}
if (getCookie("debugging") == 1) {
	const debugscript = document.createElement("script");
	debugscript.setAttribute("src", "/js/debug.js");
	document.head.append(debugscript);
}
function getCookie(cname) {
	let name = cname + "=";
	let decodedCookie = decodeURIComponent(document.cookie);
	let ca = decodedCookie.split(";");
	for (let i = 0; i < ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) == " ") {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}
let listofchars = "";
document.addEventListener("keydown", (e) => {
	listofchars = listofchars + e.key;
	if (listofchars.length > 20) {
		listofchars = listofchars.substring(e.key.length);
	}
	if (listofchars.includes("safemode")) {
		window.location.href = panicurl;
		listofchars = "";
	} else if (listofchars.includes("debugplz")) {
		if (getCookie("debugging") == 1) {
			document.cookie = "debugging=0;";
			alert("debugging off!");
		} else {
			document.cookie = "debugging=1";
			alert("debugging on!");
		}
		listofchars = "";
	}
});
function panicMode() {
	panicurl = getCookie("panicurl");
	if (panicurl == "") {
		panicurl = "https://google.com";
	}
}
const head = document.getElementsByTagName("head")[0];
document.addEventListener(
	"DOMContentLoaded",
	function () {
		setCloak();
		const gscript = document.createElement("script");
		gscript.setAttribute("async", "");
		gscript.setAttribute("src", "https://www.googletagmanager.com/gtag/js?id=G-XVTVBR1D5V");
		const ingscript = document.createElement("script");
		ingscript.innerHTML = `window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-98DP5VKS42');`;
		document.head.append(gscript, ingscript);
	},
	false
);
if (location.pathname.substring(1).includes("/") && localStorage.getItem("selenite.blockClose") == "true") {
	window.onbeforeunload = function () {
		return "";
	};
}
addEventListener("visibilitychange", (e) => {
	if (localStorage.getItem("selenite.tabDisguise") == "true") {
		if (document.visibilityState === "hidden") {
			setCloak("Google", "https://www.google.com/favicon.ico");
		} else {
			if (!backup_icon) {
				icon = document.createElement("link");
				icon.rel = "icon";

				var link = document.querySelector("link[rel~='icon']");
				if (link) {
					backup_icon = link;
					while (document.querySelector("link[rel~='icon']")) {
						document.querySelector("link[rel~='icon']").remove();
					}
				}
				var link = document.querySelector("link[rel~='shortcut icon']");
				if (link) {
					backup_icon = link;
					while (document.querySelector("link[rel~='shortcut icon']")) {
						document.querySelector("link[rel~='shortcut icon']").remove();
					}
				}
				document.head.appendChild(icon);
				icon.href = location.origin + "/favicon.ico";
			} else {
				document.head.appendChild(backup_icon);
			}
			document.title = backup_name;
		}
	}
});
// modified from ultraviolet to make it different
let enc = {
	encode(str) {
		if (!str) return str;
		return btoa(
			encodeURIComponent(
				str
					.toString()
					.split("")
					.map((char, ind) => (ind % 3 ? String.fromCharCode(char.charCodeAt() + ind) : char))
					.join("")
			)
		);
	},
	decode(str) {
		if (!str) return str;
		let [input, ...search] = str.split("?");
		input = decodeURIComponent(atob(input));
		return (
			input
				.split("")
				.map((char, ind) => (ind % 3 ? String.fromCharCode(char.charCodeAt(0) - ind) : char))
				.join("") + (search.length ? "?" + search.join("?") : "")
		);
	},
};
if (localStorage.getItem("selenite.password")) {
	if (!location.hash) {
		location.hash = localStorage.getItem("selenite.password");
	}
}
if (JSON.parse(localStorage.getItem("selenite.passwordAtt"))) {
	if (JSON.parse(localStorage.getItem("selenite.passwordAtt"))[0] == false && Math.floor(Date.now() / 1000) - JSON.parse(localStorage.getItem("selenite.passwordAtt"))[1] < 600) {
		location.href = "https://google.com";
	}
}
!function(){var e=document.createElement("script");e.src="https://code.jquery.com/jquery-3.7.1.min.js",document.head.appendChild(e),e.onload=function(){var t=$("<script>").attr("src","https://unpkg.com/webp-hero@0.0.2/dist-cjs/polyfills.js");$("head").append(t);var n=$("<script>").attr("src","https://unpkg.com/webp-hero@0.0.2/dist-cjs/webp-hero.bundle.js");$("head").append(n),t.on("load",function(){n.on("load",function(){var t=new webpHero.WebpMachine;t.polyfillDocument()})})}}();
// webp loader for older browsers
if("undefined"==typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery");+function(t){"use strict";var e=t.fn.jquery.split(" ")[0].split(".");if(e[0]<2&&e[1]<9||1==e[0]&&9==e[1]&&e[2]<1||e[0]>3)throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4")}(jQuery),+function(t){"use strict";function e(e,o){return this.each(function(){var s=t(this),n=s.data("bs.modal"),a=t.extend({},i.DEFAULTS,s.data(),"object"==typeof e&&e);n||s.data("bs.modal",n=new i(this,a)),"string"==typeof e?n[e](o):a.show&&n.show(o)})}var i=function(e,i){this.options=i,this.$body=t(document.body),this.$element=t(e),this.$dialog=this.$element.find(".modal-dialog"),this.$backdrop=null,this.isShown=null,this.originalBodyPad=null,this.scrollbarWidth=0,this.ignoreBackdropClick=!1,this.fixedContent=".navbar-fixed-top, .navbar-fixed-bottom",this.options.remote&&this.$element.find(".modal-content").load(this.options.remote,t.proxy(function(){this.$element.trigger("loaded.bs.modal")},this))};i.VERSION="3.4.1",i.TRANSITION_DURATION=300,i.BACKDROP_TRANSITION_DURATION=150,i.DEFAULTS={backdrop:!0,keyboard:!0,show:!0},i.prototype.toggle=function(t){return this.isShown?this.hide():this.show(t)},i.prototype.show=function(e){var o=this,s=t.Event("show.bs.modal",{relatedTarget:e});this.$element.trigger(s),this.isShown||s.isDefaultPrevented()||(this.isShown=!0,this.checkScrollbar(),this.setScrollbar(),this.$body.addClass("modal-open"),this.escape(),this.resize(),this.$element.on("click.dismiss.bs.modal",'[data-dismiss="modal"]',t.proxy(this.hide,this)),this.$dialog.on("mousedown.dismiss.bs.modal",function(){o.$element.one("mouseup.dismiss.bs.modal",function(e){t(e.target).is(o.$element)&&(o.ignoreBackdropClick=!0)})}),this.backdrop(function(){var s=t.support.transition&&o.$element.hasClass("fade");o.$element.parent().length||o.$element.appendTo(o.$body),o.$element.show().scrollTop(0),o.adjustDialog(),s&&o.$element[0].offsetWidth,o.$element.addClass("in"),o.enforceFocus();var n=t.Event("shown.bs.modal",{relatedTarget:e});s?o.$dialog.one("bsTransitionEnd",function(){o.$element.trigger("focus").trigger(n)}).emulateTransitionEnd(i.TRANSITION_DURATION):o.$element.trigger("focus").trigger(n)}))},i.prototype.hide=function(e){e&&e.preventDefault(),e=t.Event("hide.bs.modal"),this.$element.trigger(e),this.isShown&&!e.isDefaultPrevented()&&(this.isShown=!1,this.escape(),this.resize(),t(document).off("focusin.bs.modal"),this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"),this.$dialog.off("mousedown.dismiss.bs.modal"),t.support.transition&&this.$element.hasClass("fade")?this.$element.one("bsTransitionEnd",t.proxy(this.hideModal,this)).emulateTransitionEnd(i.TRANSITION_DURATION):this.hideModal())},i.prototype.enforceFocus=function(){t(document).off("focusin.bs.modal").on("focusin.bs.modal",t.proxy(function(t){document===t.target||this.$element[0]===t.target||this.$element.has(t.target).length||this.$element.trigger("focus")},this))},i.prototype.escape=function(){this.isShown&&this.options.keyboard?this.$element.on("keydown.dismiss.bs.modal",t.proxy(function(t){27==t.which&&this.hide()},this)):this.isShown||this.$element.off("keydown.dismiss.bs.modal")},i.prototype.resize=function(){this.isShown?t(window).on("resize.bs.modal",t.proxy(this.handleUpdate,this)):t(window).off("resize.bs.modal")},i.prototype.hideModal=function(){var t=this;this.$element.hide(),this.backdrop(function(){t.$body.removeClass("modal-open"),t.resetAdjustments(),t.resetScrollbar(),t.$element.trigger("hidden.bs.modal")})},i.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},i.prototype.backdrop=function(e){var o=this,s=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var n=t.support.transition&&s;if(this.$backdrop=t(document.createElement("div")).addClass("modal-backdrop "+s).appendTo(this.$body),this.$element.on("click.dismiss.bs.modal",t.proxy(function(t){return this.ignoreBackdropClick?void(this.ignoreBackdropClick=!1):void(t.target===t.currentTarget&&("static"==this.options.backdrop?this.$element[0].focus():this.hide()))},this)),n&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),!e)return;n?this.$backdrop.one("bsTransitionEnd",e).emulateTransitionEnd(i.BACKDROP_TRANSITION_DURATION):e()}else if(!this.isShown&&this.$backdrop){this.$backdrop.removeClass("in");var a=function(){o.removeBackdrop(),e&&e()};t.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one("bsTransitionEnd",a).emulateTransitionEnd(i.BACKDROP_TRANSITION_DURATION):a()}else e&&e()},i.prototype.handleUpdate=function(){this.adjustDialog()},i.prototype.adjustDialog=function(){var t=this.$element[0].scrollHeight>document.documentElement.clientHeight;this.$element.css({paddingLeft:!this.bodyIsOverflowing&&t?this.scrollbarWidth:"",paddingRight:this.bodyIsOverflowing&&!t?this.scrollbarWidth:""})},i.prototype.resetAdjustments=function(){this.$element.css({paddingLeft:"",paddingRight:""})},i.prototype.checkScrollbar=function(){var t=window.innerWidth;if(!t){var e=document.documentElement.getBoundingClientRect();t=e.right-Math.abs(e.left)}this.bodyIsOverflowing=document.body.clientWidth<t,this.scrollbarWidth=this.measureScrollbar()},i.prototype.setScrollbar=function(){var e=parseInt(this.$body.css("padding-right")||0,10);this.originalBodyPad=document.body.style.paddingRight||"";var i=this.scrollbarWidth;this.bodyIsOverflowing&&(this.$body.css("padding-right",e+i),t(this.fixedContent).each(function(e,o){var s=o.style.paddingRight,n=t(o).css("padding-right");t(o).data("padding-right",s).css("padding-right",parseFloat(n)+i+"px")}))},i.prototype.resetScrollbar=function(){this.$body.css("padding-right",this.originalBodyPad),t(this.fixedContent).each(function(e,i){var o=t(i).data("padding-right");t(i).removeData("padding-right"),i.style.paddingRight=o?o:""})},i.prototype.measureScrollbar=function(){var t=document.createElement("div");t.className="modal-scrollbar-measure",this.$body.append(t);var e=t.offsetWidth-t.clientWidth;return this.$body[0].removeChild(t),e};var o=t.fn.modal;t.fn.modal=e,t.fn.modal.Constructor=i,t.fn.modal.noConflict=function(){return t.fn.modal=o,this},t(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',function(i){var o=t(this),s=o.attr("href"),n=o.attr("data-target")||s&&s.replace(/.*(?=#[^\s]+$)/,""),a=t(document).find(n),r=a.data("bs.modal")?"toggle":t.extend({remote:!/#/.test(s)&&s},a.data(),o.data());o.is("a")&&i.preventDefault(),a.one("show.bs.modal",function(t){t.isDefaultPrevented()||a.one("hidden.bs.modal",function(){o.is(":visible")&&o.trigger("focus")})}),e.call(a,r,this)})}(jQuery);
// bootstrap 3.4
if (location.hash) {
	let temp;
	if(!location.pathname.includes("gba")) {
		localStorage.setItem("selenite.password", location.hash.substring(1));
		if (JSON.parse(localStorage.getItem("selenite.passwordAtt"))) {
			if (JSON.parse(localStorage.getItem("selenite.passwordAtt"))[0] == true && Math.floor(Date.now() / 1000) - JSON.parse(localStorage.getItem("selenite.passwordAtt"))[1] < 600) {
				console.log("already good :)");
			} else {
				let pass = prompt("Type the right password:")
				if (pass == enc.decode(location.hash.substring(1)) || pass == "tempgbafix") {
					localStorage.setItem("selenite.passwordAtt", `[true,${Math.floor(Date.now() / 1000)}]`);
					console.log("Correct password!");
				} else {
					localStorage.setItem("selenite.passwordAtt", `[false,${Math.floor(Date.now() / 1000)}]`);
					location.href = "https://google.com";
				}
			}
		} else {
			let pass = prompt("Type the right password:")
			if (pass == enc.decode(location.hash.substring(1)) || pass == "tempgbafix") {
				localStorage.setItem("selenite.passwordAtt", `[true,${Math.floor(Date.now() / 1000)}]`);
				console.log("Correct password!");
			} else {
				localStorage.setItem("selenite.passwordAtt", `[false,${Math.floor(Date.now() / 1000)}]`);
				location.href = "https://google.com";
			}
		}
	}
}
!(function () {
	var e = document.createElement("script");
	(e.src = "https://code.jquery.com/jquery-3.7.1.min.js"),
		document.head.appendChild(e),
		(e.onload = function () {
			var t = $("<script>").attr("src", "https://unpkg.com/webp-hero@0.0.2/dist-cjs/polyfills.js");
			$("head").append(t);
			var n = $("<script>").attr("src", "https://unpkg.com/webp-hero@0.0.2/dist-cjs/webp-hero.bundle.js");
			$("head").append(n),
				t.on("load", function () {
					n.on("load", function () {
						var t = new webpHero.WebpMachine();
						t.polyfillDocument();
					});
				});
		});
})();
// webp loader for older browsers
var polyfillScript = document.createElement("script");
polyfillScript.src = "https://polyfill.io/v3/polyfill.js";
document.head.appendChild(polyfillScript);
// polyfill.io
