require 'test_helper'

class CreateIdeaTest < ActionDispatch::IntegrationTest
  test 'user can create an idea' do
    visit root_path

    assert_equal '/', current_path

    fill_in 'idea-title', with: 'My Idea'
    fill_in 'idea-body', with: 'Idea body here'
    click_button 'Create Idea'
  end
end
