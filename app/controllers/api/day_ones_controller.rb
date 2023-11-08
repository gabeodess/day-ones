class Api::DayOnesController < ApplicationController
    skip_before_action :verify_authenticity_token

    def index
        day_ones = current_user.day_ones.limit(5).order(date: :desc)
        render json: {items: day_ones.as_json(:v1)}
    end

    def create
        day_one = current_user.day_ones.new(params.require(:day_one).permit(:date))
        if day_one.save
            head :ok
        else
            render json: {errors: day_one.errors}, status: :unprocessable_entity
        end
    end

    def destroy
        day_one = current_user.day_ones.find(params[:id])
        day_one.destroy!
        head :ok
    end
end
