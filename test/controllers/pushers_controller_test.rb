require "test_helper"

class PushersControllerTest < ActionDispatch::IntegrationTest
  test "should get create" do
    sign_in(users(:one))
    assert_difference "Pusher.count" do
      post pushers_url, params: {pusher: {endpoint: :foobar, auth: :foobar, p256dh: :foobar}}
      assert_response :success
    end
  end
end
