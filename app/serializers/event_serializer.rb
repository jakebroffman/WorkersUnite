class EventSerializer < ActiveModel::Serializer
  attributes :id, :title, :date, :location
  has_one :organizer
end
