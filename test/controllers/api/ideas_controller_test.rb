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

  # test '#create returns successful response' do
  #   get :index, format: :json
  #   assert_response :success
  # end
  #
  # test '#delete returns successful response' do
  #   get :index, format: :json
  #   assert_response :success
  # end
  #
  # test '#update returns successful response' do
  #   get :index, format: :json
  #   assert_response :success
  # end
end
