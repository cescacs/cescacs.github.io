// GOOGLE ANALYTICS ID
const cookieId = "CHKYWCYH3N";
// GOOGLE ANALITYCS CONFIG
gtag('js', new Date());
gtag('config', 'G-'+cookieId, {
cookie_flags: 'secure;samesite=none'
});
// GOOGLE cookie consent function
function consentGranted() {
        gtag('consent', 'update', {
        'analytics_storage': 'granted'
        });
    }
// GENERAL COOKIE FUNCTIONS
const getCookie = (name) => {
    let value = " " + decodeURIComponent(document.cookie);
    console.log("value", `==${value}==`);
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
// COOKIE consent; requires id='cookies-eu-banner' element
document.addEventListener("DOMContentLoaded", (event) => {
    const GcookieId = "_ga_" + cookieId;
    const $cookiesBanner = document.getElementById("cookies-eu-banner");
    const $cookiesBannerButton = $cookiesBanner.querySelector("button");
    const hasCookie = getCookie(GcookieId);
    console.log("cookie Id:", GcookieId, "hasCookie:", hasCookie);
    if (!hasCookie) {
        $cookiesBanner.classList.remove("hidden");
    }
    $cookiesBannerButton.addEventListener("click", () => {
        consentGranted();
        setCookie("cookieGranted","closed",730);
        $cookiesBanner.remove();
    });
});
