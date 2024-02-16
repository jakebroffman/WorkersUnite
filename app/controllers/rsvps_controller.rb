class RsvpsController < ApplicationController
    before_action :authenticate_user, only: [:create, :update, :destroy]
    before_action :set_rsvp, only: [:show, :update, :destroy]
  
    def index
      @rsvps = Rsvp.all
      render json: @rsvps
    end
  

    def show
      render json: @rsvp
    end
  

    def create
        @rsvp = Rsvp.create(rsvp_params)
  
        if @rsvp.persisted?
            render json: @rsvp, status: :created
        else
            render json: @rsvp.errors, status: :unprocessable_entity
        end
    end
  

    def update
      if @rsvp.update(rsvp_params)
        render json: @rsvp
      else
        render json: @rsvp.errors, status: :unprocessable_entity
      end
    end
  
  
    def destroy
      @rsvp.destroy
      head :no_content
    end
  
    private
  
    
    def set_rsvp
      @rsvp = Rsvp.find(params[:id])
    end
  
   
    def rsvp_params
      params.require(:rsvp).permit(:user_id, :event_id, :role_id, :comment)
    end
end
  