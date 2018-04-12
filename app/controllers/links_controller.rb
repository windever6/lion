class LinksController < ApplicationController
  before_action :set_link, only: [:show, :edit, :update, :confirm, :destroy]
  before_action :set_data_href, only: %i(update destroy)
  respond_to :html, :json
  layout false, only: %i(new edit confirm)

  def index
    @links = current_user.links
    respond_with(@links)
  end

  def show
    respond_with(@link)
  end

  def new
    @link = Link.new
    respond_with(@link)
  end

  def edit
  end

  def create
    @link = Link.new(link_params)
    @link.save
  end

  def update
    @link.update(link_params)
  end

  def confirm
  end

  def destroy
    @link.destroy
  end

  private
    def set_link
      @link = Link.find(params[:id])
    end

    def link_params
      params[:link][:user_id] = current_user.id
      params[:link].permit(:content, :use_for, :labels, :user_id)
    end

    def set_data_href
      @data_href = edit_link_path(@link)
    end
end
