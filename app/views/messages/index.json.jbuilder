if @new_messages.present?
    json.messages @new_messages.each do |message|
    json.name  message.user.name
    json.date  message.created_at
    json.content  message.content
    json.image  message.image
    json.id  message.id
  end
end

