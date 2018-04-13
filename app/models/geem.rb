class Geem < ApplicationRecord
  validates :name, uniqueness: { case_sensitive: false, message: "已存在相同名称的gem" }
end
