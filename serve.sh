#!/bin/bash
# Local dev server for Jekyll site.
# Uses a Ruby 3.4 compatibility shim (taint methods removed in 3.4).
export RUBYOPT="-r $(dirname "$0")/_plugins/ruby34_compat.rb"
bundle exec jekyll serve "$@"
