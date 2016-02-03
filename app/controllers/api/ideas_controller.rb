class Api::IdeasController < ApplicationController
  respond_to :json

  def index
    respond_with Idea.all
  end

  def show
    respond_with Idea.find_by(idea_params)
  end

  def create
    respond_with Idea.create(idea_params), location: nil
  end

  private

  def idea_params
    params.require(:idea).permit(:title, :body, :quality)
  end
end
