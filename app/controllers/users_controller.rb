class UsersController < ApplicationController
    skip_before_action :authenticate_user, only: [:create]
    before_action :set_user, only: [:update, :destroy]
   
    def show
      render json: @current_user
    end
  
    def create
      @user = User.new(user_params)
      if @user.save
        render json: @user, status: :created
      else
        render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
      end
    end
  
    def update
      if user_params_empty?
        render json: { errors: ['All fields must be filled'] }, status: :unprocessable_entity
        return
      end
    
      if @user.update(user_params)
        render json: @user
      else
        puts "Update failed. Errors: #{user.errors.full_messages.join(', ')}"
        render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
      end
    end
  
    def destroy
      @user.destroy
      head :no_content
    end
  
    private
  
  
    def set_user
      @user = User.find_by(id: session[:user_id])
    end
  
    def user_params_empty?
      user_params.values.all?(&:blank?)
    end
  
    def user_params
      permitted_params = [:username, :name, :local_chapter, :city, :state, :email, :profile_photo_url]
      permitted_params << :password if params[:user][:password].present?
      params.require(:user).permit(permitted_params)
    end
    
  end
  