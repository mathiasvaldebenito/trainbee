class WaypointsController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :set_waypoint, only: %i[ show edit update destroy ]

  # GET /waypoints or /waypoints.json
  def index
    @waypoints = Waypoint.all
    @vehicles = Vehicle.all
  end

  # GET /waypoints/1 or /waypoints/1.json
  def show
  end

  # GET /waypoints/new
  def new
    @waypoint = Waypoint.new
  end

  # GET /waypoints/1/edit
  def edit
  end

  # POST /waypoints or /waypoints.json
  def create
    puts waypoint_params
    # @vehicle_id = Vehicle.where(patent: waypoint_params.patent).id
    @waypoint = Waypoint.new(waypoint_params)

    respond_to do |format|
      if @waypoint.save
        msg = {id: @waypoint.id,  latitude: @waypoint.latitude, 
              longitude: @waypoint.longitude, patent: @waypoint.vehicle.patent}
        format.json  { render :json => msg }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @waypoint.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /waypoints/1 or /waypoints/1.json
  def update
    respond_to do |format|
      if @waypoint.update(waypoint_params)
        format.html { redirect_to @waypoint, notice: "Waypoint was successfully updated." }
        format.json { render :show, status: :ok, location: @waypoint }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @waypoint.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /waypoints/1 or /waypoints/1.json
  def destroy
    @waypoint.destroy
    respond_to do |format|
      format.html { redirect_to waypoints_url, notice: "Waypoint was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_waypoint
      @waypoint = Waypoint.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def waypoint_params
      params.require(:waypoint).permit(:vehicle_id, :latitude, :longitude)
    end
end
