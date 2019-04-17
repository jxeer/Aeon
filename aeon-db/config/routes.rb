Rails.application.routes.draw do
  # resources :users do
  #   resources :actions
  # end

  resources :actions

  get "/users/verify", to: 'users#verify'
  post "/users/login", to: 'users#login'
end
