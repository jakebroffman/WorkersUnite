class EventSerializer < ActiveModel::Serializer
  attributes :id, :title, :date, :location, :start_time, :description, :duration
  has_one :organizer
  has_many :attendees
  has_many :rsvps
end
