class AddCycleMaxMinToUsers < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :cycle_max, :integer, default: 29, null: false
    add_column :users, :cycle_min, :integer, default: 27, null: false
    remove_column :users, :period, :integer, null: false
    User.update_all(
      <<-SQL
        cycle_max = (SELECT COALESCE(MAX(days), cycle_max) FROM day_ones WHERE day_ones.user_id = id)
      SQL
    )
    User.update_all(
      <<-SQL
        cycle_min = (SELECT COALESCE(MIN(days), cycle_min) FROM day_ones WHERE day_ones.user_id = id)
      SQL
    )
  end
end
