---
title: How to store static data in Rails
category: Ruby
date: 2021-01-19
---

There’s likely data used and looped through frequently in an app, so it’s useful to have the data stored in a specific location and accessed when needed. This can be done by storing them in a YAML file, accessing certain info through a Models file, and then pulling it in the Controller.

For a list of articles, all the data can be stored in a YAML file. It can be stored in `config` or `db`, or a custom `data` folder.

```ruby
# data/articles.yml

articles:
  - name: New York Times
    author: Mackenzie McKale
    url: www.nytimes.com/fake-article-url

  - name: Wall Street Journal
    author: Will McAvoy
    url: www.washingtonpost.com/fake-article-url
```

You can then access and organize this data as needed in a models file. This is technically organizing and creating a data structure, which is why it’d fit well in the Models folder.

There’s many different approaches here, and ways to filter and modify the data. This example simply uses a [Struct](./../ruby/Structs.html) to get all the basic info and return an array of hashes.

```ruby
# app/models/articles.rb

module Articles
  AllArticles = Struct.new(:name, :author, :url) do
    DATA_PATH = Rails.root.join("data", "articles.yml").to_s.freeze

    def self.list
      YAML.load_file(DATA_PATH)["articles"].map do |article|
        new(article["name"], article["author"], article["url"])
      end
    end
  end
end
```

Now this module can be called in a controller and passed to a template.

```ruby
# app/controllers/press.rb

def index
  @articles = Articles::AllArticles.list
end
```
