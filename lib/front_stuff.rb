module FrontStuff

  if defined?(Rails) && Rails::VERSION::MAJOR == 3
    class Engine < ::Rails::Engine
      engine_name 'front_stuff'
    end
  end

end
