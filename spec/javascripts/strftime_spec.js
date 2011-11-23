describe('Date', function() {

  var date = new Date(2010, 11, 5, 18, 30); // Sun, Dec 5th, 2010, 6:30pm

  describe('#strftime', function() {
    it('requires a format string', function() {
      expect(function() {
        date.strftime();
      }).toThrow();
    });

    it('formats numbers with padding', function() {
      expect(date.strftime('%d')).toEqual('05');
    });

    it('formats month names', function() {
      expect(date.strftime('%b')).toEqual('Dec');
    });

    it('formats day names', function() {
      expect(date.strftime('%A')).toEqual('Sunday');
    });
  });

  describe('#toS', function() {
    it('without any arguments uses the default format', function() {
      FrontStuff.strftime.translations['date.formats.default'] = '%Y-%m-%d';
      expect(date.toS()).toEqual('2010-12-05');
    });

    it('accepts a predefined format argument', function() {
      FrontStuff.strftime.translations['date.formats.short'] = '%d %b';
      expect(date.toS('date.formats.short')).toEqual('05 Dec');
    });

    it('requires the named format to exist', function() {
      expect(function() {
        date.toS('foo.bar.baz');
      }).toThrow();
    });
  });

});
