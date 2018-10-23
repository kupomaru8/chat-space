Rails.application.routes.draw do
  devise_for :users
  root  'groups#index'
  resources :users, only: [:edit, :update, :index]
  resources :groups, only: [:index, :edit, :update, :new, :create] do
    resources :messages, only: [:index, :create]
    collection do
      get 'search'
    end
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
