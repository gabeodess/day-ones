class AddPeriodToUsers < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :period, :integer
    reversible do |dir|
      dir.up do
        User.update_all(period: 28)
      end
    end
    change_column_null :users, :period, false
  end
end
