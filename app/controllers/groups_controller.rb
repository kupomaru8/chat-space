class GroupsController < ApplicationController
  before_action :set_group, only: [:edit, :update]
  def index
    @groups = current_user.groups.order(created_at: :DESC)
  end

  def new
    @group = Group.new
    @group.users << current_user
  end

  def create
    @group = Group.new(group_params)
    @group.users << current_user
    if @group.save
      redirect_to group_messages_path(@group), notice: "グループを作成しました"
    else
      render :new
    end
  end

  def edit
  end

  def update
    if @group.update(group_params)
      redirect_to group_messages_path(@group) , notice: "グループを編集しました"
    else
      render :edit
    end
  end

  def search
    @users = User.where.not(id: current_user.id).where('name LIKE(?)',"#{params[:keyword]}%").limit(20)
    respond_to do |format|
      format.html
      format.json
    end
  end

  private
  def group_params
    # user_ids = params[:group]["user_ids"]
    # user_ids << current_user.id.to_s
    # params.require(:group).permit(:name, user_ids: [])
    params.require(:group).permit(:name, { :user_ids => []})
  end

  def set_group
    @group = Group.find(params[:id])
  end
end
