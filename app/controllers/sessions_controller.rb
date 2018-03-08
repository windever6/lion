# frozen_string_literal: true

class SessionsController < Devise::SessionsController
  skip_before_action :authenticate_user!

  layout 'login'

  def new
    super
  end

  def create
    # resource = warden.authenticate!(scope: resource_name, recall: "#{controller_path}#new")
    # set_flash_message(:notice, :signed_in) if is_navigational_format?
    # sign_in(resource_name, resource)
    # redirect_back_or_default(root_url)
    super
  end

  def destroy
    super
  end
end
