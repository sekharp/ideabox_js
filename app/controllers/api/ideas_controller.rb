class Api::IdeasController < ApplicationController
  respond_to :json

  def index
    respond_with Idea.all
  end

  def show
    respond_with Idea.find(params[:id])
  end

  def create
    respond_with Idea.create(idea_params), location: nil
  end

  def destroy
    respond_with Idea.destroy(params[:id])
  end

  def update
    @idea = Idea.find(params[:id]).update(idea_params)
    respond_with @idea, json: @idea, location: nil
  end

  private

  def idea_params
    params.require(:idea).permit(:title, :body, :quality)
  end
end
