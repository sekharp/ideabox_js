require 'test_helper'

class Api::IdeasControllerTest < ActionController::TestCase
  def setup
    Idea.create(title: "First", body: "First")
    Idea.create(title: "Second", body: "Second")
    Idea.create(title: "Third", body: "Third")
  end

  test '#index returns successful response' do
    get :index, format: :json
    assert_response :success
  end

  test '#index returns an array of records' do
    get :index, format: :json
    assert_kind_of Array, json_response
  end

  test '#show responds to json' do
    get :show, format: :json, id: Idea.first.id
    assert_response :success
  end

  test '#show returns one record' do
    get :show, format: :json, id: Idea.first.id
    assert_kind_of Hash, json_response
  end

  test "#create responds to json" do
    get :create, format: :json, idea: {title: 'title', body: 'body'}
    assert_response :success
  end

  test "#update responds to json" do
    idea = Idea.create(title: 'updated title', body: 'updated body')
    get :update, format: :json, id: idea.id, idea: {title: 'updated title'}
    assert_response :success
  end

  test "#delete responds to json" do
    put :destroy, format: :json, id: Idea.last.id
    assert_response :success
  end
end
