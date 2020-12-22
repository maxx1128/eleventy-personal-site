require_relative 'lib/shrink_and_optimize_images.rb'

desc "Optimize image assets by dimensions and file size"
task :optimize_images do
  ShrinkAndOptimizeImages.new().execute
end
