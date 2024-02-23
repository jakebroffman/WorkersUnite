class CreateRsvps < ActiveRecord::Migration[6.1]
  def change
    create_table :rsvps do |t|
      t.references :user, null: false, foreign_key: true
      t.references :event, null: false, foreign_key: true
      t.references :role, null: false, foreign_key: true, null: true
      t.string :comment
      t.boolean :attending, default: false

      t.timestamps
    end
  end
end
