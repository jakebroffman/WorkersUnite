class RsvpSerializer < ActiveModel::Serializer
  attributes :id, :attending
  has_one :user
  has_one :event
  has_one :role
end
