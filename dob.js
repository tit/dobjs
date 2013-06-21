(function () {

  var QueryString = function () {
    // This function is anonymous, is executed immediately and
    // the return value is assigned to QueryString!
    var query_string = {};
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      // If first entry with this name
      if (typeof query_string[pair[0]] === "undefined") {
        query_string[pair[0]] = pair[1];
        // If second entry with this name
      } else if (typeof query_string[pair[0]] === "string") {
        query_string[pair[0]] = [ query_string[pair[0]], pair[1] ];
        // If third or later entry with this name
      } else {
        query_string[pair[0]].push(pair[1]);
      }
    }
    return query_string;
  }();

  if ('false' == QueryString.dob_ignore) setCookie('dob_ignore', '', 0);

  function declOfNum(number, titles) {
    var cases = [2, 0, 1, 1, 1, 2];
    return titles[ (number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5] ];
  }

  if ('undefined' == typeof dob_settings.cookie_day_expires) dob_settings.cookie_day_expires = 3;
  if ('undefined' == typeof dob_settings.background_color) dob_settings.background_color = 'red';
  if ('undefined' == typeof dob_settings.language) dob_settings.language = 'en';

  dob_settings.i18n = {
    en: {
      notification_text: 'For correctly view the site, update or change your browser',
      close_text: 'Close for ' + dob_settings.cookie_day_expires + ' ' + declOfNum(dob_settings.cookie_day_expires, ['day', 'days', 'days'])
    },
    ru: {
      notification_text: 'Для корректного просмотра сайта обновите или смените ваш браузер',
      close_text: 'Закрыть на ' + dob_settings.cookie_day_expires + ' ' + declOfNum(dob_settings.cookie_day_expires, ['день', 'дня', 'дней'])
    }
  };

  function setCookie(c_name, value, exdays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
    document.cookie = c_name + "=" + c_value;
  }

  function getCookie(c_name) {
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

  function banner_close() {
    setCookie('dob_ignore', 'true', dob_settings.cookie_day_expires);
    document.body.removeChild(document.getElementById('dob_banner'));
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

  if ('true' != getCookie('dob_ignore')) {
    if (dob_settings.browsers[BrowserDetect.browser.toLowerCase()] > BrowserDetect.version) {
      var elements = [];

      // div
      elements[0] = document.createElement('div');
      elements[0].setAttribute('id', 'dob_banner');
      elements[0].style.top = '0';
      elements[0].style.left = '0';
      elements[0].style.width = '100%';
      elements[0].style.height = '50px';
      elements[0].style.position = 'absolute';
      elements[0].style.opacity = '0.9';
      elements[0].style.backgroundColor = dob_settings.background_color;

      // table
      elements[1] = document.createElement('table');
      elements[1].style.verticalAlign = 'baseline';
      elements[1].style.textAlign = 'center';
      elements[1].style.width = '100%';
      elements[1].style.height = '100%';
      elements[1].style.opacity = '1';
      elements[1].style.color = 'whitesmoke';
      elements[1].style.fontWeight = 'bold';
      elements[1].style.fontFamily = 'sans-serif';

      // tr
      elements[2] = document.createElement('tr');

      // td
      elements[3] = document.createElement('td');
      elements[3].innerText = dob_settings.i18n[dob_settings.language].notification_text;

      // td
      elements[4] = document.createElement('td');

      // a
      elements[5] = document.createElement('a');
      elements[5].style.color = 'whitesmoke';
      elements[5].innerText = dob_settings.i18n[dob_settings.language].close_text;
      elements[5].setAttribute('href', '#');
      elements[5].onclick = banner_close;

      document.body.appendChild(elements[0]);
      elements[0].appendChild(elements[1]);
      elements[1].appendChild(elements[2]);
      elements[2].appendChild(elements[3]);
      elements[2].appendChild(elements[4]);
      elements[4].appendChild(elements[5]);
    }
  }

}());