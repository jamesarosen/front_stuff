Gem::Specification.new do |gem|
  gem.version = '0.0.0'
  gem.name = 'front_stuff'
  gem.files = Dir["lib/**/*"] + %w(README.md)
  gem.summary = "A grab-bag of JS, CSS, and other browsery goodness"
  gem.description = gem.summary
  gem.email = "james.a.rosen@gmail.com"
  gem.homepage = "http://github.com/jamesarosen/front_stuff"
  gem.authors = ["Eric Chapweske", "James A. Rosen"]
  gem.test_files = []
  gem.require_paths = [".", "lib"]
  gem.has_rdoc = 'false'
  current_version = Gem::Specification::CURRENT_SPECIFICATION_VERSION
  gem.specification_version = 2
  gem.add_development_dependency 'rake'
  gem.add_development_dependency 'jasmine', '~> 1.1.0.rc3'
  gem.add_development_dependency 'jasmine-headless-webkit'
end
