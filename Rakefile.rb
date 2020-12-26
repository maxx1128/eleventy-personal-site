require_relative 'lib/shrink_and_optimize_images.rb'
require_relative 'lib/move_long_notes_to_posts.rb'
require_relative 'lib/get_goodreads_data.rb'

desc 'Optimize image assets by dimensions and file size'
task :optimize_images do
  ShrinkAndOptimizeImages.new.execute
end

desc 'Take long Notes and move them into a temp folder to turn them into Posts'
task :move_notes do
  MoveLongNotesToPosts.new.execute
end

desc 'Pull Goodreads books data into a data file'
task :get_goodreads_data do
  GetGoodreadsData.new.execute
end
