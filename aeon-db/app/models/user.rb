class User < ApplicationRecord
  has_many :actions
  has_secure_password

def self.find_from_credentials(name, password)
  user = self.find_by(name: name)
  return nil unless user
  user if user.is_password?(password)
end

def is_password?(password_attempt)
  BCrypt::Password.new(password_digest).is_password?(password_attempt)
  end
end
