class Command < ApplicationRecord
  validates :content, uniqueness: { case_sensitive: false, message: "已存在相同内容的指令" }
end
