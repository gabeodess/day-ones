class ApplicationRecord < ActiveRecord::Base
  primary_abstract_class

  def as_json(*args)
    return send("as_json_#{args.first}") if args.first.is_a?(Symbol)
    super
  end
end
