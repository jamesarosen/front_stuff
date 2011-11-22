namespace :jshint do
  task :require do
    sh "which jshint" do |ok, res|
      fail 'Cannot find jshint on $PATH' unless ok
    end
  end

  task :check => :require do
    config_file = File.join(PROJECT_ROOT, '.jshintrc')

    files_to_check = (LIB_FILES + SPEC_FILES).join(' ')

    sh "jshint #{files_to_check} --config #{config_file}" do |ok, res|
      fail 'JSHint checks failed' unless ok
    end

    puts "JSHint checks passed"
  end
end

desc 'Run JSHint checks against Javascript source'
task :jshint => 'jshint:check'
