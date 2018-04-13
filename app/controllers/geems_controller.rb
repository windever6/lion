class GeemsController < ApplicationController
  before_action :set_geem, only: [:show, :edit, :update, :confirm, :destroy]
  before_action :set_data_href, only: %i(update destroy)
  respond_to :html, :json
  layout false, only: %i(new edit confirm)

  def index
    @geems = current_user.geems
    respond_with(@geems)
  end

  def show
    respond_with(@geem)
  end

  def new
    @geem = Geem.new
    respond_with(@geem)
  end

  def edit
  end

  def create
    @geem = Geem.new(geem_params)
    @geem.save
  end

  def update
    @geem.update(geem_params)
  end

  def confirm
  end

  def destroy
    @geem.destroy
  end

  private
    def set_geem
      @geem = Geem.find(params[:id])
    end

    def geem_params
      params[:geem][:user_id] = current_user.id
      params[:geem].permit(:name, :use_for, :url, :labels, :user_id)
    end

    def set_data_href
      @data_href = edit_geem_path(@geem)
    end
end
