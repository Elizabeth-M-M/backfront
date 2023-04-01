class User < ApplicationRecord
  has_secure_password
  validates :username, :password_digest, :email, presence: true
  validates :password, length: {minimum:6}
  validates :username, :email, uniqueness: true
end
