class CommandsController < ApplicationController
  before_action :set_command, only: [:show, :edit, :update, :confirm, :destroy]
  before_action :set_data_href, only: %i(update destroy)
  respond_to :html, :json
  layout false, only: %i(new edit confirm)

  def index
    @commands = current_user.commands
    respond_with(@commands)
  end

  def show
    respond_with(@command)
  end

  def new
    @command = Command.new
    respond_with(@command)
  end

  def edit
  end

  def create
    @command = Command.new(command_params)
    @command.save
  end

  def update
    @command.update(command_params)
  end

  def confirm
  end

  def destroy
    @command.destroy
  end

  private
    def set_command
      @command = Command.find(params[:id])
    end

    def command_params
      params[:command][:user_id] = current_user.id
      params[:command].permit(:content, :use_for, :labels, :user_id)
    end

    def set_data_href
      @data_href = edit_command_path(@command)
    end
end
