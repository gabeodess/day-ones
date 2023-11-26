class CreateFollows < ActiveRecord::Migration[7.1]
  def change
    create_table :follows do |t|
      t.belongs_to :follower, foreign_key: {to_table: :users}, null: false
      t.belongs_to :followee, foreign_key: {to_table: :users}, null: false

      t.timestamps
    end

    add_index :follows, [:follower_id, :followee_id], unique: true
  end
end
