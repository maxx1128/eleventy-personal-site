# frozen_string_literal: true

require 'mini_magick'
require 'piet'
require 'piet-binary'

class ShrinkAndOptimizeImages
  def execute
    all_sizes = []

    Dir.glob('assets/images/**/**/*.{jpg,png,jpeg,JPEG,gif}') do |image|
      before_size = File.size(image)
      resize_image(image)
      optimize_image(image)
      after_size = File.size(image)

      change_in_size = (before_size - after_size).abs
      size_decreased = before_size > after_size

      all_sizes.push({
        change_in_size: change_in_size,
        size_decreased: size_decreased
      })
    end

    puts get_results(all_sizes)
  end

  private

  def resize_image(image)
    image_file = MiniMagick::Image.new(image)
    image_file.resize '800x2000' if image_file.width > 800
  end

  def optimize_image(image)
    Piet.optimize(image)
  end

  def get_results(data)
    smaller_images = data.select { |img| img[:size_decreased] }
    larger_images = data.reject { |img| img[:size_decreased] }

    bytes_saved = smaller_images.inject(0) { |sum, image| sum + image[:change_in_size] }
    bytes_gained = larger_images.inject(0) { |sum, image| sum + image[:change_in_size] }

    puts "Bytes saved: #{bytes_saved}"
    puts "Bytes gained: #{bytes_gained}"
    puts "Bytes change: #{bytes_gained - bytes_saved}"
    puts "Images shrunk: #{smaller_images.length}"
    puts "Images grown: #{larger_images.length}"
  end
end
