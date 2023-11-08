class User < ApplicationRecord
    has_secure_password

    has_many :day_ones

    before_create do
        self.period ||= DayOne::DEFAULT_PERIOD
    end

    def most_recent_date
        day_ones.most_recent_date
    end
end
