require 'rails_helper'

RSpec.describe "geems/edit", type: :view do
  before(:each) do
    @geem = assign(:geem, Geem.create!())
  end

  it "renders the edit geem form" do
    render

    assert_select "form[action=?][method=?]", geem_path(@geem), "post" do
    end
  end
end
