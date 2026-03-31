# Ruby 3.4 removed all taint-related methods.
# The github-pages gem pins older liquid/jekyll versions that still call them.
# This shim restores them as no-ops for local builds.
if RUBY_VERSION >= "3.4"
  module TaintShim
    def taint; self; end
    def untaint; self; end
    def tainted?; false; end
    def trust; self; end
    def untrust; self; end
    def trusted?; true; end
  end

  Object.prepend(TaintShim)
end
