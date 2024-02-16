Rails.application.routes.draw do
  resources :users 

  resources :events do
    resources :roles
    resources :rsvps
  end

  resources :roles do
    resources :rsvps
  end

  resources :rsvps

  post '/login', to: 'sessions#login'
  post '/logout', to: 'sessions#logout'
  get '/check-authentication', to: 'users#show'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
