class User < ApplicationRecord
    has_secure_password

    scope :accessible_by, ->(user) { where(id: user.id).or(User.where(id: user.followee_ids)) }

    has_many :day_ones
    has_many :follower_follows, foreign_key: :followee_id, class_name: :Follow
    has_many :followee_follows, foreign_key: :follower_id, class_name: :Follow
    has_many :followees, through: :followee_follows

    before_create do
      self.cycle_min ||= DayOne::DEFAULT_CYCLE_LENGTH - 1
      self.cycle_max ||= DayOne::DEFAULT_CYCLE_LENGTH + 1
    end

    delegate :most_recent_date, to: :day_ones

    def first_name
      email.split(/[^a-zA-Z]/).first
    end

    def calculate_days(date)
      previous = most_recent_date
      return DayOne::DEFAULT_CYCLE_LENGTH unless previous
      diff = date - previous
      return diff if diff <= cycle_max
      average = day_ones.average(:days)
      modulo = diff % average
      modulo_max = average + modulo
      return (modulo - average).abs < modulo ? modulo : (modulo + average)
    end

    def as_json_v1
      as_json(only: [:id, :email, :period], methods: [:most_recent_date]).merge({
        followees: followees.as_json(only: [:id,], methods: [:first_name])
      })
    end
end
