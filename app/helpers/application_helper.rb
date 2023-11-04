module ApplicationHelper
    def current_month_class(week, day)
        'current-month'
    end

    def day_of_month(week, day, first_day = Date.today.beginning_of_month.to_date)
        start = first_day.wday
        count = week*7 + day
        (first_day - start + count).strftime('%d')
    end
end
