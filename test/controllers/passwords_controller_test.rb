require "test_helper"

class PasswordsControllerTest < ActionDispatch::IntegrationTest
  test "should get new" do
    user = User.create!(email: 'foobar@example.com', password: 'password')
    get new_password_url
    assert_response :success
    post password_url, params: {email: user.email}
    assert_redirected_to :new_session
    token = user.signed_id(expires_in: 15.minutes, purpose: UserMailer::RESET_PASSWORD_PURPOSE)
    get reset_password_url(token: token)
    assert_response :ok
    put password_url, params: {new_password: 'password2', token: token}
    assert_redirected_to :root
    assert user.reload.authenticate('password2')
    assert !user.reload.authenticate('password')
  end
end
