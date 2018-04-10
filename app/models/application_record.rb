class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

  def first_error_message
    errors.messages.values.first.first
  end
end
