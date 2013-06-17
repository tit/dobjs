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

function dob_close() {
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
        browser_update_parent_div.style.top = '0';
        browser_update_parent_div.style.left = '0';
        browser_update_parent_div.style.width = '100%';//Math.max(document.body.clientWidth, document.body.offsetWidth, document.body.scrollWidth);
        browser_update_parent_div.style.height = '50px';
        browser_update_parent_div.style.position = 'absolute';
        browser_update_parent_div.style.opacity = '0.9';
        browser_update_parent_div.style.backgroundColor = 'red';
        document.body.appendChild(browser_update_parent_div);

        var browser_update_child_table = document.createElement('table');
        browser_update_child_table.style.verticalAlign = 'baseline';
        browser_update_child_table.style.textAlign = 'center';
        browser_update_child_table.style.width = '100%';
        browser_update_child_table.style.height = '100%';
        browser_update_child_table.style.opacity = '1';
        browser_update_child_table.style.color = 'whitesmoke';
        browser_update_child_table.style.fontWeight = 'bold';
        browser_update_child_table.style.fontFamily = 'sans-serif';
        browser_update_parent_div.appendChild(browser_update_child_table);

        var browser_update_child_tr = document.createElement('tr');
        browser_update_child_table.appendChild(browser_update_child_tr);

        var browser_update_child_td_text = document.createElement('td');
        browser_update_child_td_text.innerText = 'Для корректного просмотра сайта обновите или смените ваш браузер.';
        browser_update_child_tr.appendChild(browser_update_child_td_text);

        var browser_update_child_td_close = document.createElement('td');
        browser_update_child_tr.appendChild(browser_update_child_td_close);

        var browser_update_child_a_close = document.createElement('a');
        browser_update_child_a_close.style.color = 'whitesmoke';
        browser_update_child_a_close.innerText = 'Закрыть';
        browser_update_child_a_close.setAttribute('href', '#');
        browser_update_child_a_close.setAttribute('onclick', 'dob_close()');
        browser_update_child_td_close.appendChild(browser_update_child_a_close);
    }
}