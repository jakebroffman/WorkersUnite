class Rsvp < ApplicationRecord
  belongs_to :user
  belongs_to :event
  belongs_to :role
end
