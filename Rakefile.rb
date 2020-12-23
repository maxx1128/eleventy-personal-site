require_relative 'lib/shrink_and_optimize_images.rb'
require_relative 'lib/move_long_notes_to_posts.rb'

desc 'Optimize image assets by dimensions and file size'
task :optimize_images do
  ShrinkAndOptimizeImages.new.execute
end

desc 'Take long Notes and move them into a temp folder to turn them into Posts'
task :move_notes do
  MoveLongNotesToPosts.new.execute
end
