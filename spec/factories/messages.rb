FactoryGirl.define do
  factory :message do
    content Faker::Lorem.sentence
    image "hoge.png"
    user
    group
  end
end
