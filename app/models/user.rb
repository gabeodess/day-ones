class User < ApplicationRecord
    has_secure_password

    has_many :day_ones

    before_create do
      self.cycle_min ||= DayOne::DEFAULT_CYCLE_LENGTH - 1
      self.cycle_max ||= DayOne::DEFAULT_CYCLE_LENGTH + 1
    end

    delegate :most_recent_date, to: :day_ones

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
end
