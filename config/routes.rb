Rails.application.routes.draw do
  root 'ideas#index'

  namespace :api do
    resources :ideas
  end
end
