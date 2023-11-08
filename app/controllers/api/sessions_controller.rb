class Api::SessionsController < ApplicationController
  def show
    render json: current_user.as_json(only: [:email, :period], methods: [:most_recent_date])
  end
end
