class WelcomeController < ApplicationController
    def index
        @waypoints = Waypoint.all
         @vehicles = Vehicle.all
    end
  end