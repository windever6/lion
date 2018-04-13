require 'rails_helper'

RSpec.describe "geems/index", type: :view do
  before(:each) do
    assign(:geems, [
      Geem.create!(),
      Geem.create!()
    ])
  end

  it "renders a list of geems" do
    render
  end
end
