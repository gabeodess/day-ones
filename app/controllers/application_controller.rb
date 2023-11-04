class ApplicationController < ActionController::Base
    before_action :authenticate!

    helper_method :logged_in?

    def authenticate!
        redirect_to :new_session unless current_user
    end

    def login!(user)
        session[:user_id] = user.id
    end

    def logout!
        session[:user_id] = nil
    end

    def current_user
        @current_user ||= User.find_by_id(session[:user_id])
    end

    def logged_in?
        !!current_user
    end
end
