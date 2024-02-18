class Event < ApplicationRecord
  belongs_to :organizer, class_name: 'User', foreign_key: 'organizer_id'
  has_many :rsvps, dependent: :destroy
  has_many :attendees, through: :rsvps, source: :user, dependent: :destroy
  has_many :roles, through: :rsvps, dependent: :destroy

  validate :organizer_cannot_rsvp

  private

  def organizer_cannot_rsvp
    errors.add(:base, "Organizer cannot RSVP to their own event") if organizer && organizer.rsvps.find_by(event: self)
  end
end
