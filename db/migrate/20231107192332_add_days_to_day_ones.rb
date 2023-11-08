class AddDaysToDayOnes < ActiveRecord::Migration[7.1]
  def change
    add_column :day_ones, :days, :integer
    reversible do |dir|
      dir.up do
        DayOne.update_all(days: 28)
      end
    end
    change_column_null :day_ones, :days, false
  end
end
