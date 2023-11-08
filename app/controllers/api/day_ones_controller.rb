class Api::DayOnesController < ApplicationController
    skip_before_action :verify_authenticity_token

    def create
        puts params.inspect
        @day_one = current_user.day_ones.new(params.require(:day_one).permit(:date))
        if @day_one.save
            head :ok
        else
            render json: {errors: @day_one.errors}, status: :unprocessable_entity
        end
    end
end
