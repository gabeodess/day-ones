class CreateDayOnes < ActiveRecord::Migration[7.1]
  def change
    create_table :day_ones do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.date :date, null: false

      t.timestamps
    end
  end
end
