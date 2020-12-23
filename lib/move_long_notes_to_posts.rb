# frozen_string_literal: true

require 'fileutils'

class MoveLongNotesToPosts
  NOTE_COUNT_LIMIT = 250
  TO_POSTS_DIR = 'noteToPost'

  def execute
    unless File.directory?(TO_POSTS_DIR)
      FileUtils.mkdir_p(TO_POSTS_DIR)
    end

    Dir.glob('notes/*.md') do |note|
      count = number_of_words_in(note)

      if count > NOTE_COUNT_LIMIT
        FileUtils.mv(note, note.gsub('notes', TO_POSTS_DIR))
      end
    end
  end

  private

  def number_of_words_in(file)
    file = File.open(file)
    word_count = 0

    file.each_line do |line|
      words_length = line.split.length
      word_count += words_length
    end

    word_count
  end
end
