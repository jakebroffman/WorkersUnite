class ApplicationController < ActionController::API
  include ActionController::Cookies
  skip_before_action :verify_authenticity_token
  before_action :authenticate_user

    def authenticate_user
      begin
        @current_user ||= User.find(session[:user_id])
      rescue ActiveRecord::RecordNotFound
        render json: { error: 'User not found' }, status: :not_found
      end
  
      unless @current_user
        render json: { error: 'Unauthorized' }, status: :unauthorized
      end
    end
end
