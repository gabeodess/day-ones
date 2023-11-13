require "test_helper"

class DayOneTest < ActiveSupport::TestCase
  test "cycle lengths" do
    user = User.create!(email: 'foobar@example.com', password: 'password')
    assert_equal user.cycle_max, 28
    assert_equal user.cycle_min, 28

    d1 = user.day_ones.create!(date: '2020-01-01')
    assert_equal day_one.days, 28
    assert_equal user.cycle_max, 28
    assert_equal user.cycle_min, 28

    d2 = user.day_ones.create!(date: d1.date + 20)
    assert_equal d2.days, 20
    assert_equal user.cycle_max, 28
    assert_equal user.cycle_min, 20

    d3 = user.day_ones.create!(date: d2.date + 54)
    assert_equal d3.days, 30
    assert_equal user.cycle_max, 30
    assert_equal user.cycle_min, 20
  end
end
