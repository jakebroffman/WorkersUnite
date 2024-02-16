class EventsController < ApplicationController
    before_action :set_event, only: [:show, :update, :destroy]
    before_action :authenticate_user, only: [:create, :update, :destroy]
  
    def index
      @events = Event.all
      render json: @events
    end
  
    def show
      render json: @event
    end

    def create
        @event = current_user.events.build(event_params)
        @event.organizer_id = current_user.id
      
        if @event.save
          render json: @event, status: :created
        else
          render json: { errors: @event.errors.full_messages }, status: :unprocessable_entity
        end
      end
      

    def update
      if @event.update(event_params)
        render json: @event
      else
        render json: { errors: @event.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def destroy
      @event.destroy
      head :no_content
    end
  
    private
  
    def set_event
      @event = Event.find(params[:id])
    end

    def event_params
      params.require(:event).permit(:name, :date, :location, :start_time, :duration, :description)
    end
  end
  