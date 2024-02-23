class Event < ApplicationRecord
  belongs_to :organizer, class_name: 'User', foreign_key: 'organizer_id'
  has_many :rsvps, dependent: :destroy
  has_many :attendees, through: :rsvps, source: :user, dependent: :destroy
  has_many :roles, through: :rsvps, dependent: :destroy

  validate :event_cannot_be_in_the_past

  private

  def event_cannot_be_in_the_past
    errors.add(:date, "cannot be in the past") if date && date < Date.today
  end
end

