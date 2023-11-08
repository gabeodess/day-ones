require "test_helper"

class Api::DayOnesControllerTest < ActionDispatch::IntegrationTest
  test "create" do
    user = User.create!(email: 'foobar@example.com', password: 'password')
    post session_path, params: {email: user.email, password: user.password}
    assert_difference ->{user.day_ones.count} do
      post api_day_ones_path, params: {day_one: {date: '2020-01-01'}}
      assert_response :success
    end
  end
end
