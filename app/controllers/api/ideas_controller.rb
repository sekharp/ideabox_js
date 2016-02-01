class Api::IdeaboxController < ApplicationController
  respond_to :json

  def index
    respond_with Idea.all
  end

  def show
    respond_with Idea.find_by(item_params)
  end

  private

  def item_params
    params.permit(:title, :body, :quality, :created_at, :updated_at)
  end
end
