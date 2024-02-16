class CreateRoles < ActiveRecord::Migration[6.1]
  def change
    create_table :roles do |t|
      t.string :title
      t.string :responsibilities
      t.boolean :paid
      t.references :user, foreign_key: true
      t.references :event, foreign_key: true
      t.references :rsvp, foreign_key: true

      t.timestamps
    end
  end
end
