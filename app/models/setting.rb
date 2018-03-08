# RailsSettings Model
class Setting < RailsSettings::Base
  source Rails.root.join("config/config.yml")
  namespace Rails.env
end
