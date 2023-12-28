class PushersController < ApiController
  def create
    current_user.pushers.find_or_create_by!(params.require(:pusher).permit(:endpoint, :auth, :p256dh))
  end
end
