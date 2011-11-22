# Build-related information:

PROJECT_ROOT = File.expand_path(File.dirname(__FILE__))

LIB_FILES = Rake::FileList.new do |f|
  f.include File.join(PROJECT_ROOT, 'lib', 'assets', 'javascripts', '**', '*.js')
end

SPEC_FILES = Rake::FileList.new.tap do |f|
  f.include File.join(PROJECT_ROOT, 'spec', '**', '*[sS]pec.js')
end

Dir.glob(File.join(PROJECT_ROOT, 'tasks', '**', '*.rake')).each { |f| load f }

# Tasks:

task :default => :spec
task :spec => :jshint
