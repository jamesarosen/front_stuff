/*globals $*/

//= require ../front_stuff.js
//= require jquery-1.7.js
//= require jquery.md5.js

(function() {

  function hash( email ) {
    return $.md5( $.trim( email ).toLowerCase() );
  }

  // ## FrontStuff.Gravatar
  //
  //     var gravatar = new FrontStuff.Gravatar('foo@example.com', 'default.jpg');
  //     gravatar.url();
  //       => https://secure.gravatar.com/avatar/b48def645758b95537d4424c84d1a9ff?d=default.jpg
  FrontStuff.Gravatar = function(email, defaultImage) {
    this.email = email;
    this['default'] = defaultImage;
  };

  FrontStuff.Gravatar.prototype = {
    baseURL: 'https://secure.gravatar.com/avatar/',

    url: function() {
      return this.baseURL + hash(this.email) + '?d=' + this['default'];
    }
  };

}());
