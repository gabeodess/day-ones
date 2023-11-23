require "test_helper"

class DayOneTest < ActiveSupport::TestCase
  def setup
    @d1 = day_ones(:one)
    @user = @d1.user
    @user.update!(cycle_max: 29, cycle_min: 27)
  end

  test "within range" do
    day = @user.day_ones.create!(date: @d1.date + 28)
    assert_equal day.days, 28
    assert_equal @user.reload.cycle_max, 29
    assert_equal @user.reload.cycle_min, 27
  end

  test "below range" do
    day = @user.day_ones.create!(date: @d1.date + 26)
    assert_equal 26, day.days
    assert_equal 29, @user.reload.cycle_max
    assert_equal 26, @user.reload.cycle_min
  end

  test "above range" do
    day = @user.day_ones.create!(date: @d1.date + 30)
    assert_equal 30, day.days
    assert_equal 30, @user.reload.cycle_max
    assert_equal 27, @user.reload.cycle_min
  end

  test "multiweek low" do
    day = @user.day_ones.create!(date: @d1.date + 28 + 14)
    assert_equal 42, day.days
    assert_equal 42, @user.reload.cycle_max
    assert_equal 27, @user.reload.cycle_min
  end

  test "multiweek high" do
    day = @user.day_ones.create!(date: @d1.date + 28 + 15)
    assert_equal 15, day.days
    assert_equal 29, @user.reload.cycle_max
    assert_equal 15, @user.reload.cycle_min
  end
end
