# frozen_string_literal: true

require "nokogiri"
require "open-uri"
require "fileutils"
require 'json'

class GetGoodreadsData
  GOODREADS_URL = "https://www.goodreads.com"
  CURRENTLY_READING_URL = "https://www.goodreads.com/review/list/25506258-maxwell?order=a&shelf=currently-reading&sort=date_added"
  FINISHED_READING_URL = "https://www.goodreads.com/review/list/25506258-maxwell?shelf=read&sort=date_read"
  BOOK_ROW_SELECTOR = ".bookalike"
  IMAGES_DIR = "assets/images/now/books"

  def initialize
    @currently_reading_page = get_page(CURRENTLY_READING_URL)
    @finished_reading_page = get_page(FINISHED_READING_URL)
    @data = []
  end

  def execute
    FileUtils.remove_dir(IMAGES_DIR) if Dir.exists?(IMAGES_DIR)
    FileUtils.mkdir_p(IMAGES_DIR)

    gather_reading_rows

    File.open("_data/currentBooks.json", "wb") do |fo|
      fo.write @data.select { |b| b[:category] == "current" }.to_json
    end

    File.open("_data/finishedBooks.json", "wb") do |fo|
      fo.write @data.select { |b| b[:category] == "finished" }.to_json
    end
  end

  private

  def get_page(url)
    Nokogiri::XML(open(url));
  end

  def gather_reading_rows
    @currently_reading_page.search(BOOK_ROW_SELECTOR).first(5).each_with_index.map { |r, i| get_row_data(r, "current", i) }
    @finished_reading_page.search(BOOK_ROW_SELECTOR).first(5).each_with_index.map { |r, i| get_row_data(r, "finished", i) }
  end

  def get_row_data(row, type, i)
    page_url = "#{GOODREADS_URL}#{row.at(".title a").attr("href")}"
    file_name = "#{type}_#{i}.jpg"

    download_image(page_url, file_name)

    @data.push({
      title: row.at(".title a").attr("title"),
      category: type,
      author: row.at(".author a").text.split(", ").reverse.join(" "),
      image_url: file_name,
      link: page_url
    })
  end

  def download_image(page_url, file_name)
    page = get_page(page_url)
    image_url = page.at("#coverImage").attr("src")

    File.open("#{IMAGES_DIR}/#{file_name}", "wb") do |fo|
      fo.write open(image_url).read
    end
  end
end
