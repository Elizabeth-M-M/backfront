class UsersController < ApplicationController
rescue_from ActiveRecord::RecordInvalid, with: :invalid_user_credentials
rescue_from ActiveRecord::RecordNotFound, with: :user_not_found

  #POST /signup
  def create
    user= User.create!(user_params)
    session[:user_id]= user.id
    render json: user
  end

  #GET /me
  def show
    user=User.find(session[:user_id])
    render json: user
  end

private

def user_params
  params.permit(:email, :username, :password, :password_confirmation)
end
def invalid_user_credentials(invalid)
  render json: {errors:invalid.record.errors.full_messages}, status: :unprocessable_entity #422
end
def user_not_found
  render json: {errors:["User does not exist"]}, status: :not_found  #404
end

end
