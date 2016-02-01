Rails.application.routes.draw do
  root 'ideas#index'

  namespace :api do
    resource :ideas
  end
end
