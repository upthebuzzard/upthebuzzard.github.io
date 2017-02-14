source "https://rubygems.org"
ruby RUBY_VERSION

# Hello! This is where you manage which Jekyll version is used to run.
# When you want to use a different version, change it below, save the
# file and run `bundle install`. Run Jekyll with `bundle exec`, like so:
#
#     bundle exec jekyll serve
#

# combining a hybrid of the jekyll and github-pages gem includes
# to ensure that jekyll is installed only when on Windows (dev platform)
# and github-pages is installed only when on github, i.e. not on Windows.
# Really really really don't want to go through the faff of building the github-pages gem on Windows.

gem "jekyll", "3.4.0" if Gem.win_platform?
gem "github-pages", group: :jekyll_plugins if ! Gem.win_platform?

# This will help ensure the proper Jekyll version is running.
# Happy Jekylling!
# gem "jekyll", "3.4.0"

# This is the default theme for new Jekyll sites. You may change this to anything you like.
gem "minima", "~> 2.0"

# If you want to use GitHub Pages, remove the "gem "jekyll"" above and
# uncomment the line below. To upgrade, run `bundle update github-pages`.
# gem "github-pages", group: :jekyll_plugins

# If you have any plugins, put them here!
group :jekyll_plugins do
   gem "jekyll-feed", "~> 0.6"
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
