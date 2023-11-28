require "test_helper"

class Api::SessionsControllerTest < ActionDispatch::IntegrationTest
  test "should get show" do
    sign_in(users(:one))
    get api_session_url
    assert_response :success
    assert_equal JSON.parse(response.body)['followees'], [{
      "id" => users(:two).id, 
      "first_name" => "foobar",
      "calendar" => users(:two).calendar.as_json,
    }], response.body
  end
end
