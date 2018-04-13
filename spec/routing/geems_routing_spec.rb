require "rails_helper"

RSpec.describe GeemsController, type: :routing do
  describe "routing" do

    it "routes to #index" do
      expect(:get => "/geems").to route_to("geems#index")
    end

    it "routes to #new" do
      expect(:get => "/geems/new").to route_to("geems#new")
    end

    it "routes to #show" do
      expect(:get => "/geems/1").to route_to("geems#show", :id => "1")
    end

    it "routes to #edit" do
      expect(:get => "/geems/1/edit").to route_to("geems#edit", :id => "1")
    end

    it "routes to #create" do
      expect(:post => "/geems").to route_to("geems#create")
    end

    it "routes to #update via PUT" do
      expect(:put => "/geems/1").to route_to("geems#update", :id => "1")
    end

    it "routes to #update via PATCH" do
      expect(:patch => "/geems/1").to route_to("geems#update", :id => "1")
    end

    it "routes to #destroy" do
      expect(:delete => "/geems/1").to route_to("geems#destroy", :id => "1")
    end

  end
end
