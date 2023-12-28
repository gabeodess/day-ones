class CreatePushers < ActiveRecord::Migration[7.1]
  def change
    create_table :pushers do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.string :endpoint, null: false
      t.string :p256dh, null: false
      t.string :auth, null: false

      t.timestamps
    end

    add_index :pushers, :endpoint, unique: true
  end
end
