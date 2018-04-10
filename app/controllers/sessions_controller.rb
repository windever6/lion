# frozen_string_literal: true

class SessionsController < Devise::SessionsController
  skip_before_action :authenticate_user!

  layout 'login'

  def new
    super
  end

  def create
    super
  end

  def destroy
    super
  end
end
