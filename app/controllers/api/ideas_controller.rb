class Api::IdeasController < ApplicationController
  respond_to :json

  def index
    respond_with Idea.all
  end

  def show
    respond_with Idea.find_by(idea_params)
  end

  private

  def idea_params
    params.permit(:title, :body, :quality, :created_at, :updated_at)
  end
end
