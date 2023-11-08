class DayOne < ApplicationRecord
  DEFAULT_PERIOD = 28.days
  VARIATION = 8.days
  MIN_PERIOD = DEFAULT_PERIOD - VARIATION
  MAX_PERIOD = DEFAULT_PERIOD + VARIATION

  def self.most_recent_date
    order(date: :desc).pick(:date)
  end

  belongs_to :user

  validates :date, {
    uniqueness: {scope: :user_id},
    comparison: {less_than_or_equal_to: -> {Date.today}, message: "cannot be in the future"}
  }
  validates :date, { 
    comparison:{
      greater_than_or_equal_to: ->(day_one){ day_one.user.day_ones.most_recent_date + MIN_PERIOD }, 
      allow_blank: true,
      message: ->(day_one, foo){"cannot be less than 20 days from last day one (#{day_one.user.day_ones.most_recent_date})"}, 
      if: -> { user.day_ones.exists? }
    }
  }

  before_save do
    previous = user.day_ones.where(date: ...date).most_recent_date
    if previous
      diff = date - previous
      self.days = diff > MAX_PERIOD ? diff/user.period : diff
    else
      self.days = user.period
    end
  end

  def as_json_v1
    as_json(only: [:id, :date, :days])
  end
end
