require 'rails_helper'

RSpec.describe "Geems", type: :request do
  describe "GET /geems" do
    it "works! (now write some real specs)" do
      get geems_path
      expect(response).to have_http_status(200)
    end
  end
end
