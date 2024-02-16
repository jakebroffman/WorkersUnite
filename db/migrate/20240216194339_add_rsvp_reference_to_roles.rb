class AddRsvpReferenceToRoles < ActiveRecord::Migration[6.1]
  def change
    add_reference :roles, :rsvp, foreign_key: true
  end
end
