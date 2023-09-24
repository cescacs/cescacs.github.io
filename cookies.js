// GOOGLE ANALYTICS ID
const cookieId = "CHKYWCYH3N";
// GOOGLE ANALITYCS CONFIG
gtag('js', new Date());
gtag('config', 'G-'+cookieId, {
cookie_flags: 'secure;samesite=none'
});
// GOOGLE cookie consent AND Microsoft Clarity cookie consent function
function consentGranted() {
        gtag('consent', 'update', {
        'analytics_storage': 'granted'
        });
        window.clarity('consent');
    }
function consentDenied() {
        gtag('consent', 'update', {
        'analytics_storage': 'denied'
        });
        window.clarity('stop');
    }
// GENERAL COOKIE FUNCTIONS
const getCookie = (name) => {
    let value = " " + decodeURIComponent(document.cookie);
    console.log("cookies value", `==${value}==`);
    const parts = value.split(" " + name + "=");
    return parts.length < 2 ? undefined : parts.pop().split(";").shift();
};
const setCookie = function (name, value, expiryDays, domain, path, secure, sameSite) {
    const exdate = new Date();
    exdate.setHours(
        exdate.getHours() +
        (typeof expiryDays !== "number" ? 365 : expiryDays) * 24
    );
    document.cookie =
        name + "=" + value +
        ";expires=" + exdate.toUTCString() +
        ";path=" + (path || "/") +
        ";sameSite=" + (sameSite || "Strict") +
        (domain ? ";domain=" + domain : "") +
        (secure ? ";secure" : "");
};
const deleteCookie = function (name, domain, path) {
    document.cookie =
        name + "=" +
        ";max-age=" + "-1" +
        ";path=" + (path || "/") +
        (domain ? ";domain=" + domain : "");

}
// COOKIE consent; requires id='cookies-eu-banner' element
document.addEventListener("DOMContentLoaded", (event) => {
    const cookieGranted = "cookieGranted";
    const Gcookie = "_ga";
    const GcookieId = Gcookie + "_" + cookieId;
    const ClarityCookie1 = "_clck";
    const ClarityCookie2 = "_clsk";
    const $cookiesBanner = document.getElementById("cookies-eu-banner");
    const $cookiesBannerButtons = $cookiesBanner.querySelectorAll("button");
    const hasCookie = getCookie(cookieGranted);
    if (!hasCookie) {
        $cookiesBanner.classList.remove("hidden");
    }
    $cookiesBannerButtons.forEach(element => {
        element.addEventListener("click", (evt) => {
            const targetid = evt.currentTarget.id;
            if (targetid == 'cookies-yes') {
                consentGranted();
                setCookie("cookieGranted","closed",90);
            } else if (targetid == 'cookies-no') {
                consentDenied();
                deleteCookie(Gcookie);
                deleteCookie(GcookieId);
                deleteCookie(ClarityCookie1);
                deleteCookie(ClarityCookie2);
                setCookie("cookieGranted","Not granted",30);
            }
            $cookiesBanner.remove();
        });
    });

});
