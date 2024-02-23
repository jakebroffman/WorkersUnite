class RsvpSerializer < ActiveModel::Serializer
  attributes :id, :attending, :comment, :user, :event, :role
  has_one :user
  has_one :event
  has_one :role
end
