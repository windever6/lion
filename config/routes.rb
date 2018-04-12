Rails.application.routes.draw do
  resources :links do
    member do
      get 'confirm'
    end
  end
  resources :commands do
    member do
      get 'confirm'
    end
  end
  
  use_doorkeeper do
    controllers applications: 'oauth/applications',
                authorized_applications: 'oauth/authorized_applications'
  end
  # devise_for :users, path: '', path_names: { sign_in: 'login', sign_out: 'logout', sign_up: 'register', edit: 'settings' }

  devise_for :users, path: 'account', controllers: {
    registrations: :account,
    sessions: :sessions,
    passwords: :passwords,
    omniauth_callbacks: 'auth/omniauth_callbacks'
  }
  # get 'cur_page', to: 'application#page'
  root to: 'application#home'
end
