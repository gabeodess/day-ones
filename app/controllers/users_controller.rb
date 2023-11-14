class UsersController < ApplicationController
  skip_before_action :authenticate!, only: [:new, :create]

  def new
    @user = User.new
  end

  def create
    @user = User.new(params.require(:user).permit(:email, :password))
    if @user.save
      login!(@user)
      redirect_to :root
    else
      render :new
    end
  end
end
