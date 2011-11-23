describe('FrontStuff.Gravatar', function() {

  describe('url', function() {
    it('contains a hash of the email addresss ', function() {
      var gravatar = new FrontStuff.Gravatar('foo@example.com', '/default.jpg');
      expect(gravatar.url()).toMatch(/b48def645758b95537d4424c84d1a9ff/);
    });

    it('contains a reference to the fallback image', function() {
      var gravatar = new FrontStuff.Gravatar('foo@example.com', '/default.jpg');
      expect(gravatar.url()).toMatch(/\?d=\/default\.jpg/);
    });
  });

});
