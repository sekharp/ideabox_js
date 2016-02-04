require 'test_helper'

class Api::IdeasControllerTest < ActionController::TestCase
  test '#index returns successful response' do
    get :index, format: :json
    assert_response :success
  end

  test '#index returns an array of records' do
    get :index, format: :json
    assert_kind_of Array, json_response
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
