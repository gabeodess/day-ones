require "test_helper"

class Api::SessionsControllerTest < ActionDispatch::IntegrationTest
  test "should get show" do
    get api_sessions_show_url
    assert_response :success
  end
end
