require 'rails_helper'

RSpec.describe "commands/edit", type: :view do
  before(:each) do
    @command = assign(:command, Command.create!())
  end

  it "renders the edit command form" do
    render

    assert_select "form[action=?][method=?]", command_path(@command), "post" do
    end
  end
end
