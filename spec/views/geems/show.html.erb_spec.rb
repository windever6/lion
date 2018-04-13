require 'rails_helper'

RSpec.describe "geems/show", type: :view do
  before(:each) do
    @geem = assign(:geem, Geem.create!())
  end

  it "renders attributes in <p>" do
    render
  end
end
