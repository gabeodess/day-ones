class SessionsController < ApplicationController
  skip_before_action :authenticate!, only: [:new, :create]

  def new
  end

  def create
    @user = User.find_by_email(params[:email])
    if @user&.authenticate(params[:password])
      flash[:error] = nil
      login!(@user)
      redirect_to @user
    else
      flash[:error] = "Invalid credentials"
      render :new, status: :unprocessable_entity
    end
  end

  def destroy
    logout!
    redirect_to :new_session
  end
end