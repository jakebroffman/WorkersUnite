class Role < ApplicationRecord
    has_many :rsvps
    has_many :users, through: :rsvps
    has_many :events, through: :rsvps

    validates :name, presence: true, uniqueness: { case_sensitive: false }
end
