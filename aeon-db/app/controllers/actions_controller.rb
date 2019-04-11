class ActionsController < ApplicationController
  def index
    @user = User.find(params[:user_id])
    @actions = Action.where(user_id: @user.id)
    render json: @actions
  end

  def show
  end

  def create
    @user = User.find(params[:user_id])
    @action = Action.new(action_params)
    if @action.save
      render json @action, status :created
    else
      render json { errors: @action.errors }, status:
      :unprocessable_entity
    end
  end

  def update
  end

  def delete
  end

  def user_params
    params.require(:user).permit(:name, :status, :user_id)
  end
end
