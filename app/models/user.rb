class User < ApplicationRecord
	ACCESSABLE_ATTRS = %i(name email current_password password password_confirmation _rucaptcha)

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :omniauthable

  has_many :commands
  has_many :links
  has_many :geems

  class << self
  end
end
