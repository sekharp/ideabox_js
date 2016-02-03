class Api::IdeasController < ApplicationController
  respond_to :json

  def index
    respond_with Idea.all
  end

  def create
    respond_with Idea.create(idea_params), location: nil
  end

  def destroy
    respond_with Idea.destroy(params[:id])
  end

  def update
  end

  private

  def idea_params
    params.require(:idea).permit(:title, :body, :quality)
  end
end
