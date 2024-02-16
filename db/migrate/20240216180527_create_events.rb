class CreateEvents < ActiveRecord::Migration[6.1]
  def change
    create_table :events do |t|
      t.string :title
      t.date :date
      t.string :location
      t.references :organizer, null: false, foreign_key: true

      t.timestamps
    end
  end
end
