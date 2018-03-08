class AccountController < Devise::RegistrationsController
	layout 'login'

	def new
		super
	end

	def create
		build_resource(sign_up_params)
    resource.name = params[resource_name][:name]
    resource.email = params[resource_name][:email]
    if verify_rucaptcha?(resource) && resource.save
      sign_in(resource_name, resource)
    end
	end
end
