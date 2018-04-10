require 'rails_helper'

RSpec.describe "commands/show", type: :view do
  before(:each) do
    @command = assign(:command, Command.create!())
  end

  it "renders attributes in <p>" do
    render
  end
end
