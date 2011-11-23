//= require ../front_stuff.js

(function() {

  // ## FrontStuff.strftime
  //
  // ### Configuration
  //
  // You can modify the translated strings and date formats by setting
  // properties on `FrontStuff.strftime.translations` or by redefining
  // `FrontStuff.strftime.t`.
  //
  // ### Usage
  //
  // Return a Date in the given format.
  //
  //     FrontStuff.strftime(new Date(), '%Y-%m-%dT%H:%M);
  //     // => "2011-03-30T15:30"
  //
  // Requires the following keys in FrontStuff.strftime.translations:
  //
  //  * `time.am`, e.g. "AM"
  //  * `time.pm`, e.g. "PM"
  //  * `date.abbr_day_names`, e.g. ["Sun", "Mon", ...]
  //  * `date.day_names`, e.g. ["Sunday", "Monday", ...]
  //  * `date.abbr_month_names`, e.g. ["~", "Jan", "Feb", ...]
  //  * `date.month_names`, e.g. ["~", "January", "February", ...]
  //
  // Borrowed heavily from [fnado/i18n-js](https://github.com/fnando/i18n-js/blob/master/source/i18n.js)
  var strftime = FrontStuff.strftime = function(date, format) {
    if (date == null) {
      throw new Error('FrontStuff.strftime requires a Date');
    }
    if (format == null) {
      throw new Error('FrontStuff.strftime requires a format');
    }

    var weekDay = date.getDay();
    var day = date.getDate();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var hour = date.getHours();
    var hour12 = hour;
    var meridian = hour > 11 ? strftime.t('time.pm') : strftime.t('time.am');
    var secs = date.getSeconds();
    var mins = date.getMinutes();
    var offset = date.getTimezoneOffset();
    var absOffsetHours = Math.floor(Math.abs(offset / 60));
    var absOffsetMinutes = Math.abs(offset) - (absOffsetHours * 60);
    var timezoneoffset = (offset > 0 ? "-" : "+") +
                         (absOffsetHours.toString().length < 2 ? "0" + absOffsetHours : absOffsetHours) + ':' +
                         (absOffsetMinutes.toString().length < 2 ? "0" + absOffsetMinutes : absOffsetMinutes);

    if (hour12 > 12) {
      hour12 = hour12 - 12;
    } else if (hour12 === 0) {
      hour12 = 12;
    }

    var f = '' + format;
    f = f.replace(/%a/g, strftime.t('date.abbr_day_names')[weekDay]);
    f = f.replace(/%A/g, strftime.t('date.day_names')[weekDay]);
    f = f.replace(/%b/g, strftime.t('date.abbr_month_names')[month]);
    f = f.replace(/%B/g, strftime.t('date.month_names')[month]);
    f = f.replace(/%d/g, strftime.pad(day));
    f = f.replace(/%-d/g, day);
    f = f.replace(/%H/g, strftime.pad(hour));
    f = f.replace(/%-H/g, hour);
    f = f.replace(/%I/g, strftime.pad(hour12));
    f = f.replace(/%-I/g, hour12);
    f = f.replace(/%m/g, strftime.pad(month));
    f = f.replace(/%-m/g, month);
    f = f.replace(/%M/g, strftime.pad(mins));
    f = f.replace(/%-M/g, mins);
    f = f.replace(/%p/g, strftime.t('time.' + meridian));
    f = f.replace(/%S/g, strftime.pad(secs));
    f = f.replace(/%-S/g, secs);
    f = f.replace(/%w/g, weekDay);
    f = f.replace(/%y/g, strftime.pad(year));
    f = f.replace(/%-y/g, strftime.pad(year).replace(/^0+/, ""));
    f = f.replace(/%Y/g, year);
    f = f.replace(/%Z/g, timezoneoffset);

    return f;
  };

  strftime.translations = {
    // Defaults for those required by Date#toS:
    'date.formats.default':    '%Y-%m-%d',
    'date.formats.xml_schema': '%Y-%m-%dT%H:%M:%S%Z',

    // Defaults for those required for Date#strftime:
    'time.am': 'AM',
    'time.pm': 'PM',
    'date.abbr_day_names':    ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    'date.day_names':         ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    'date.abbr_month_names':  ['~', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    'date.month_names':       ['~', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  };

  // Helper method: return a translated version of a key.
  strftime.t = function(key) {
    return FrontStuff.strftime.translations[key];
  };

  // Helper method: pad a number to two digits.
  strftime.pad = function(n) {
    var s = "0" + n.toString();
    return s.substr(s.length - 2);
  };

  // ## Date#strftime
  //
  // Takes a single argument, a format.
  //
  //     (new Date(2010, 11, 13)).strftime('%a, %b %d %Y')
  //     // => "Mon, Dec 13 2010"
  Date.prototype.strftime = function(format) {
    return strftime(this, format);
  };

  // ## Date#toS
  //
  // Takes an optional argument, the name of a format, which defaults to
  // "date.formats.default". Whatever format name is used **must** be present
  // as a key in `FrontStuff.strftime.translations`.
  Date.prototype.toS = function(optionalFormatName) {
    optionalFormatName = optionalFormatName || 'date.formats.default';
    var format = strftime.t(optionalFormatName);
    if (format == null) { throw new Error("Date#toS could not find format named " + optionalFormatName); }
    return strftime(this, format);
  };

}());
