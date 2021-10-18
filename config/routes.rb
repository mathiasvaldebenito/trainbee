Rails.application.routes.draw do
  resources :vehicles
  resources :waypoints
  
  root 'welcome#index'
end
