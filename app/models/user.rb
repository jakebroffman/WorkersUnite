class User < ApplicationRecord
    has_secure_password
    has_many :organized_events, class_name: 'Event', foreign_key: 'organizer_id'
    has_many :rsvps
    has_many :attended_events, through: :rsvps, source: :event
    has_many :roles, through: :rsvps 
    
    validates :email, presence: true, uniqueness: { case_sensitive: false, scope: :id, message: "Email is already taken" }, format: { with: URI::MailTo::EMAIL_REGEXP }, on: :create
    validates :username, presence: true
    validates :password, presence: true, length: { minimum: 6 }, on: :create
end
