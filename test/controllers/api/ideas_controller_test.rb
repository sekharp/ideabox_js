require 'test_helper'

class Api::IdeasControllerTest < ActionController::TestCase
  test '#index returns successful response' do
    get :index, format: :json
    assert_response :success
  end

  # write for create, destroy and edit tests
end
