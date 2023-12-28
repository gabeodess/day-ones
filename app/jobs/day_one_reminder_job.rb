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
        Webpush.payload_send(
          endpoint: endpoint,
          auth: auth,
          p256dh: p256dh,
          message: "Remember to record your day one!",
          ttl: 24 * 60 * 60,
          vapid: {
              subject: 'mailto:gabeodess@gmail.com',
              public_key: ENV['VAPID_PUBLIC_KEY'],
              private_key: ENV['VAPID_PRIVATE_KEY']
          }
        )
      rescue Webpush::ExpiredSubscription
        pusher.destroy!
      end
    end
  end
end