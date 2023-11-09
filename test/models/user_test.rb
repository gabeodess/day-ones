require "test_helper"

class UserTest < ActiveSupport::TestCase
    test "initialize period" do
        assert_equal User.create!(email: 'foobar@example.com', password: 'password').period, 28
    end
end
