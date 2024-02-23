class Rsvp < ApplicationRecord
  belongs_to :user
  belongs_to :event
  belongs_to :role, optional: true

  validate :unique_user_rsvp, on: :create
  validates_uniqueness_of :role_id, scope: [:event_id, :user_id], allow_nil: true
  validate :role_uniqueness_within_event
  validate :organizer_cannot_rsvp_to_own_event
  validates :comment, presence: true
  validates :attending, inclusion: { in: [true, false] }

  private

  def unique_user_rsvp
   if Rsvp.where(user_id: user_id, event_id: event_id).exists?
    errors.add(:base, "You have already RSVP'ed to this event!")
    end
  end

  def organizer_cannot_rsvp_to_own_event
    if user_id.to_i == event&.organizer&.id.to_i
      errors.add(:base, "Organizer cannot RSVP to their own event")
    end
  end

  def role_uniqueness_within_event
    if role_id.present? && event.rsvps.exists?(role_id: role_id)
      errors.add(:base, "This role has already been RSVPed for this event")
    end
  end
end
