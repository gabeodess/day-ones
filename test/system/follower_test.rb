require "application_system_test_case"

class FollowerTest < ApplicationSystemTestCase
  def setup
    @user = users(:one)
    @user2 = users(:two)
    Follow.destroy_all
  end

  test "followers" do
    visit root_path
    fill_in "Email", with: @user.email
    fill_in "Password", with: :password
    click_on 'Sign In'
    click_on 'Profile'
    fill_in "follow[email]", with: @user2.email
    assert_difference 'Follow.count' do
      click_on 'Add Follower'
      assert_text @user2.email
    end
    click_on "Logout"
    fill_in "Email", with: @user2.email
    fill_in "Password", with: :password
    click_on 'Sign In'
    click_on 'foobar'
  end
end
