class Api::FollowsController < ApiController
  def index
    render json: {items: current_user.follower_follows.as_json(:v1)}
  end

  def create
    follow = current_user.follower_follows.build(params.require(:follow).permit(:email))
    follow.followee = current_user
    if follow.save
      head :created
    else
      render json: {errors: follow.errors}, status: :unprocessable_entity
    end
  end

  def destroy
    current_user.follows.destroy(params[:id])
    head :ok
  end
end
