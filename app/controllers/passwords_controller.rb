class PasswordsController < Devise::PasswordsController
	layout 'login'

	def new
		super
	end
end
