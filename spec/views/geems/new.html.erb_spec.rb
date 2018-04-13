require 'rails_helper'

RSpec.describe "geems/new", type: :view do
  before(:each) do
    assign(:geem, Geem.new())
  end

  it "renders new geem form" do
    render

    assert_select "form[action=?][method=?]", geems_path, "post" do
    end
  end
end
