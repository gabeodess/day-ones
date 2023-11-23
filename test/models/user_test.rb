require "test_helper"

class UserTest < ActiveSupport::TestCase
  test "initialize period" do
    user = User.create!(email: 'foobar@example.com', password: 'password')
    assert_equal user.cycle_min, 27
    assert_equal user.cycle_max, 29
  end
end
