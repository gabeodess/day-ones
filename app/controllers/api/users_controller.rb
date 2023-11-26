class Api::UsersController < ApplicationController
  def show
    render json: User.accessible_by(current_user).find(params[:id]).as_json(:v1)
  end
end
