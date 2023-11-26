class Api::SessionsController < ApplicationController
  def show
    render json: current_user.as_json(:v1)
  end
end
