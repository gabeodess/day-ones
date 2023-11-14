require "test_helper"

class UserMailerTest < ActionMailer::TestCase
  test "password_reset" do
    mail = UserMailer.password_reset(users(:one))
    assert_equal "Password reset", mail.subject
    assert_equal [users(:one).email], mail.to
    assert_equal ["gabeodess+dayones@gmail.com"], mail.from
    assert_match "Password reset", mail.body.encoded
  end

end
