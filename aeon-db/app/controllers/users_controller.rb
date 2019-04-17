class UsersController < ApplicationController
  # skip_before_action :ensure_signed_in, only: [:create, :login]

  def gen_token(user_id)
    payload = {id: user_id}
    JWT.encode(payload, Rails.application.secrets.secret_key_base)
  end

  def index
  end

  def show
    @user = User.find(params[:id])
    render json: @user
    @use = User.find(params[:user_id])
    @action = Action.find(params[:id])
  end

  def create
      password = params[:password]
      name = params[:name]
      bio = params[:bio]

      new_user = User.new({
        password: password,
        name: name,
        bio: bio
      })


      if new_user.valid?
        new_user.save!
        user_data = {
          name: user.name,
          bio: user.bio
        }
        render json: { user: user_data, token: gen_token(new_user.id)}
      else
        render nothing: true, status: 401
    end
  end

  def login
    name = params[:name]
    password = params[:password]

    user = User.find_from_credentials name, password
    if user.nil?
      render nothing: true, status: 401
    else
      render json: {user: user, token: gen_token(user.id)}
    end
  end

  def verify
    ensure_signed_in
    render json: { user: current_user }
end

  def update
  end

  def delete
  end

  private

  def user_params
    params.require(:user).permit(:name, :bio, :password)
  end
end
