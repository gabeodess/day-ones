require "test_helper"

class PushersControllerTest < ActionDispatch::IntegrationTest
  test "should get create" do
    get pushers_create_url
    assert_response :success
  end
end
