class PasswordsController < ApplicationController
  skip_before_action :authenticate!, only: [:new, :create, :reset]

  def create
    user = User.find_by_email(params.require(:email))
    UserMailer.password_reset(user).deliver_now
    redirect_to :new_session, notice: 'Password email sent'
  end

  def reset
    user = User.find_signed!(params.require(:token), purpose: 'reset-password')
    login!(user)
  end

  def update
    if params[:token]
      logout! unless current_user == User.find_signed!(params[:token], purpose: UserMailer::RESET_PASSWORD_PURPOSE)
    else
      logout! unless current_user.authenticate(params.require(:password))
    end
    redirect_to(:new_session, error: 'Invalid authentication') unless logged_in?
    current_user.update! password: params.require(:new_password)
    redirect_to :root, notice: "Password was reset successfully."
  end
end
