## Front Stuff

A grab-bag of various Javascript, CSS, and other browsery goodness.

### Installation

#### Rails 3.1+ / Sprockets

Add to your Gemfile:

    gem 'front_stuff'

In `app/assets/javascripts/application.js`:

    //= require "foo/bar.js"

Where `foo/bar.js` is a path under `lib/assets/javascripts/` in this project.

### Rails 2

Add to your Gemfile:

    gem 'front_stuff'

Add to your Rakefile:

    require 'front_stuff/tasks'

Run the Rake task:

    [bundle exec] rake front_stuff:javascript:sync

That will copy everything under `lib/assets/javascripts/` into
`public/javascripts/front_stuff/`. You can add those files to a [Jammit](https://github.com/documentcloud/jammit) asset
package in `config/assets.yml` or use them directly in your layouts. You will
have to re-run the task every time you upgrade the gem.

*Note* `rake front_stuff:javascript:sync` is destructive. You should *not* put
anything extra in `public/javascripts/front_stuff`. (If you really want to for
some reason, you can use the `front_stuff:javascript:copy` task to only
import new things.)

### Development

Run JSHint checks and all specs:

    bundle exec rake

#### Installing JSHint

The JSHint checks depend on the `jshint` binary being on your `$PATH`. If you
don't have it installed, you can...

 * install [Node.js](http://nodejs.org/)
 * install [NPM](http://npmjs.org/)
 * install JSHint: `npm install -g jshint`

#### Installing jasmine-headless-webkit

The jasmine headless runner relies on qmake.
The easiest way to install on OSX is from Nokia's
[prebuilt package](http://get.qt.nokia.com/qt/source/qt-mac-opensource-4.7.4.dmg).
