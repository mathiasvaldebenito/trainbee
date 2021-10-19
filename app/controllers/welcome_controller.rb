class WelcomeController < ApplicationController
    def index
        @vehicles = Vehicle.all
    end
  end