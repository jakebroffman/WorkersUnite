class Rsvp < ApplicationRecord
  belongs_to :user
  belongs_to :event
  belongs_to :role, optional: true

  validates_uniqueness_of :role_id, scope: [:event_id, :user_id]
end
