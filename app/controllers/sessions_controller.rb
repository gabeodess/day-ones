class SessionsController < ApplicationController
  skip_before_action :authenticate!, only: [:new, :create]

  def show
    @react_app = true
  end

  def create
    @user = User.find_by_email(params[:email])
    if @user&.authenticate(params[:password])
      flash[:error] = nil
      login!(@user)
      redirect_to :root
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
