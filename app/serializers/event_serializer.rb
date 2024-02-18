class EventSerializer < ActiveModel::Serializer
  attributes :id, :title, :date, :location, :start_time, :description, :duration
  has_one :organizer
end
