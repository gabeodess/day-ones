class Follow < ApplicationRecord
  belongs_to :follower, class_name: :User
  belongs_to :followee, class_name: :User

  validates :follower_id, {
    uniqueness: {scope: :followee_id},
    exclusion: {in: ->(follow){[follow.followee_id]}, message: 'cannot be yourself'}
  }

  def email=(val)
    self.follower = User.find_by_email(val)
  end

  def as_json_v1
    as_json(only: [:id], include: {follower: {only: [:email]}})
  end
end
