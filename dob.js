if (typeof dob_settings.cookie_day_expires == 'undefined') {
    dob_settings.cookie_day_expires = 3;
}

function dob_setCookie(c_name, value, exdays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
    document.cookie = c_name + "=" + c_value;
}

function dob_getCookie(c_name) {
    var c_value = document.cookie;
    var c_start = c_value.indexOf(" " + c_name + "=");
    if (c_start == -1) {
        c_start = c_value.indexOf(c_name + "=");
    }
    if (c_start == -1) {
        c_value = null;
    }
    else {
        c_start = c_value.indexOf("=", c_start) + 1;
        var c_end = c_value.indexOf(";", c_start);
        if (c_end == -1) {
            c_end = c_value.length;
        }
        c_value = unescape(c_value.substring(c_start, c_end));
    }
    return c_value;
}

function dob_close(dob_settings) {
    dob_setCookie('dob_ignore', 'true', dob_settings.cookie_day_expires);
    document.body.removeChild(browser_update_parent_div);
}

var BrowserDetect = {
    init: function () {
        this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
        this.version = this.searchVersion(navigator.userAgent)
            || this.searchVersion(navigator.appVersion)
            || "an unknown version";
        this.OS = this.searchString(this.dataOS) || "an unknown OS";
        this.device = this.searchString(this.dataDevice) || "an unknown Device";
    },
    searchString: function (data) {
        for (var i = 0; i < data.length; i++) {
            var dataString = data[i].string;
            var dataProp = data[i].prop;
            this.versionSearchString = data[i].versionSearch || data[i].identity;
            if (dataString) {
                if (dataString.indexOf(data[i].subString) != -1)
                    return data[i].identity;
            }
            else if (dataProp)
                return data[i].identity;
        }
    },
    searchVersion: function (dataString) {
        var index = dataString.indexOf(this.versionSearchString);
        if (index == -1) return;
        return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
    },
    dataBrowser: [
        {
            string: navigator.userAgent,
            subString: "RockMelt",
            identity: "RockMelt"
        },
        {
            string: navigator.userAgent,
            subString: "Chrome",
            identity: "Chrome"
        },
        { string: navigator.userAgent,
            subString: "OmniWeb",
            versionSearch: "OmniWeb/",
            identity: "OmniWeb"
        },
        {
            string: navigator.vendor,
            subString: "Apple",
            identity: "Safari",
            versionSearch: "Version"
        },
        {
            prop: window.opera,
            identity: "Opera"
        },
        {
            string: navigator.vendor,
            subString: "iCab",
            identity: "iCab"
        },
        {
            string: navigator.vendor,
            subString: "KDE",
            identity: "Konqueror"
        },
        {
            string: navigator.userAgent,
            subString: "Firefox",
            identity: "Firefox"
        },
        {
            string: navigator.vendor,
            subString: "Camino",
            identity: "Camino"
        },
        {   // for newer Netscapes (6+)
            string: navigator.userAgent,
            subString: "Netscape",
            identity: "Netscape"
        },
        {
            string: navigator.userAgent,
            subString: "MSIE",
            identity: "IE",
            versionSearch: "MSIE"
        },
        {
            string: navigator.userAgent,
            subString: "Gecko",
            identity: "Mozilla",
            versionSearch: "rv"
        },
        {
            // for older Netscapes (4-)
            string: navigator.userAgent,
            subString: "Mozilla",
            identity: "Netscape",
            versionSearch: "Mozilla"
        }
    ],
    dataOS: [
        {
            string: navigator.platform,
            subString: "Win",
            identity: "Windows"
        },
        {
            string: navigator.platform,
            subString: "Mac",
            identity: "Mac"
        },
        {
            string: navigator.platform,
            subString: "Linux",
            identity: "Linux"
        },
        {
            string: navigator.userAgent,
            subString: "iOS",
            identity: "iOS"
        }
    ],
    dataDevice: [
        {
            string: navigator.platform,
            subString: "iPad",
            identity: "iPad"
        },
        {
            string: navigator.platform,
            subString: "iPhone",
            identity: "iPhone"
        }
    ]

};
BrowserDetect.init();

if ('true' != dob_getCookie('dob_ignore')) {
    if (dob_settings.browsers[BrowserDetect.browser.toLowerCase()] > BrowserDetect.version) {
        var browser_update_parent_div = document.createElement('div');
        browser_update_parent_div.style.width = Math.max(document.body.clientWidth, document.body.offsetWidth, document.body.scrollWidth);
        browser_update_parent_div.style.height = Math.max(document.body.clientHeight, document.body.offsetHeight, document.body.scrollHeight);
        browser_update_parent_div.style.zIndex = '2';
        browser_update_parent_div.style.top = '0px';
        browser_update_parent_div.style.left = '0px';
        browser_update_parent_div.style.position = 'absolute';
        browser_update_parent_div.style.backgroundColor = 'white';
        browser_update_parent_div.innerHTML = 'Update your browser or click anywhere for view site as is';
        browser_update_parent_div.setAttribute('onclick', 'dob_close(dob_settings)');
        document.body.appendChild(browser_update_parent_div);
    }
}