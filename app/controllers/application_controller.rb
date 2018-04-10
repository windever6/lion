require "application_responder"

class ApplicationController < ActionController::Base
  self.responder = ApplicationResponder
  respond_to :html

  protect_from_forgery with: :exception

  before_action do
    resource = controller_name.singularize.to_sym
    method = "#{resource}_params"
    params[resource] &&= send(method) if respond_to?(method, true)
    
    if devise_controller?
      devise_parameter_sanitizer.permit(:sign_in) { |u| u.permit(*User::ACCESSABLE_ATTRS) }
      devise_parameter_sanitizer.permit(:account_update) do |u|
        if current_user.email_locked?
          u.permit(*User::ACCESSABLE_ATTRS)
        else
          u.permit(:email, *User::ACCESSABLE_ATTRS)
        end
      end
      devise_parameter_sanitizer.permit(:sign_up) { |u| u.permit(*User::ACCESSABLE_ATTRS) }
    end
  end

  before_action :authenticate_user!

  def home
  end

  def redirect_back_or_default(default)
    redirect_to(session[:return_to] || default)
    session[:return_to] = nil
  end

  # def current_user
  #   if doorkeeper_token
  #     return @current_user if defined? @current_user
  #     @current_user ||= User.find_by_id(doorkeeper_token.resource_owner_id)
  #     sign_in @current_user
  #     @current_user
  #   else
  #     super
  #   end
  # end

  protected
end
