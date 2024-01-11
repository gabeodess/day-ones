class DayOneReminderJob < ApplicationJob
  queue_as :default

  attr_accessor :pusher

  delegate :user, :endpoint, :auth, :p256dh, to: :pusher
  delegate :next_day_one, to: :user

  def perform
    Pusher.includes(:user).find_each do |p|
      self.pusher = p
      next if next_day_one.blank? || next_day_one > Date.today
      begin
        WebPush.payload_send(
          endpoint: p.endpoint,
          auth: p.auth,
          p256dh: p.p256dh,
          message: "Remember to record your day one!",
          ttl: 24 * 60 * 60,
          vapid: {
              subject: 'mailto:gabeodess@gmail.com',
              public_key: Rails.application.credentials.vapid.public_key,
              private_key: Rails.application.credentials.vapid.private_key
          }
        )
      rescue WebPush::ExpiredSubscription
        pusher.destroy!
      end
    end
  end
end