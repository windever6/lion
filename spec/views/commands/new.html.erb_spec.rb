require 'rails_helper'

RSpec.describe "commands/new", type: :view do
  before(:each) do
    assign(:command, Command.new())
  end

  it "renders new command form" do
    render

    assert_select "form[action=?][method=?]", commands_path, "post" do
    end
  end
end
