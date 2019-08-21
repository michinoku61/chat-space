## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user


## users_テーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|Email|string|null: false|
|password|string|null: false|

### Association
- has_many :comments
- has_many :group_users
- has_many :groups, through: :group_users
 

## group_テーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

### Association
- has_many :messages
- has_many :group_users
- has_many :users, through: :group_users


## message_テーブル
|Column|Type|Options|
|------|----|-------|
|text|text|null: false|
|image|text|
|group_id|integer|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|

### Association
- bilongs_to :user
- belongs_to :group
