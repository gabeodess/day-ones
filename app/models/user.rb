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

    def most_recent_date
      @most_recent_date ||= day_ones.most_recent_date
    end

    def average
      @average ||= day_ones.average(:days)
    end

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
      as_json(only: [:id, :email, :period], methods: [:calendar]).merge({
        followees: followees.as_json(only: [:id,], methods: [:first_name, :calendar])
      })
    end

    def calendar
      day_one = most_recent_date
      return unless day_one
      sperm_lifespan = 5
      egg_lifespan = 1
      day_11 = day_one + 10
      day_14 = day_one + 13
      day_20 = day_one + 19
      {
        day_one: most_recent_date,
        low_chance_start: day_11 - sperm_lifespan,
        high_chance_start: day_14 - sperm_lifespan,
        ovulation: day_14,
        high_chance_end: day_14 + egg_lifespan,
        low_chance_end: day_20 + egg_lifespan,
        next_day_one: day_one + 28,
      }
    end
end
