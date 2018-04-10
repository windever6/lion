require 'rails_helper'

RSpec.describe "commands/index", type: :view do
  before(:each) do
    assign(:commands, [
      Command.create!(),
      Command.create!()
    ])
  end

  it "renders a list of commands" do
    render
  end
end
