namespace :front_stuff do

  files = Rake::FileList.new do |f|
    f.include File.join(PROJECT_ROOT, '*', 'assets', '*')
  end

  destination = 'public/'

  directory destination

  task :rails_2_only do
    unless defined?(Rails) && Rails::VERSION::MAJOR == 2
      fail "This task is only available for Rails 2"
    end
  end

  desc "Front Stuff: Remove generated files from #{destination}. Rails 2 only"
  task :clean => :rails_2_only do
    files.each do |f|
      filename = f.sub(/.*\/([^\/]+)$/, '\1')
      rm_rf File.join(destination, filename)
    end
  end

  desc "Front Stuff: Copy files to #{destination}. Rails 2 only"
  task :copy => [:rails_2_only, destination] do
    puts "Copying Front Stuff Javascript files to #{destination}/"
    files.each { |f| cp_r f, destination }
    puts "Finished."
  end

  desc "Front Stuff: Sync files with #{destination}. Rails 2 only"
  task :sync => [ :clean, :copy ]

end
