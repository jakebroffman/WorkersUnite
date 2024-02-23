class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :local_chapter

  has_many :organized_events
  has_many :attended_events
  has_many :roles
  has_many :rsvps
end
