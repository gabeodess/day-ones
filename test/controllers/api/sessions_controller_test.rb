require "test_helper"

class Api::SessionsControllerTest < ActionDispatch::IntegrationTest
  test "should get show" do
    sign_in(users(:one))
    get api_session_url
    assert_response :success
  end
end
