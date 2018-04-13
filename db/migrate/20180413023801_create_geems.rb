class CreateGeems < ActiveRecord::Migration[5.1]
  def change
    create_table :geems do |t|
      t.references :user
      t.string :name
      t.string :use_for
      t.string :url
      t.string :labels
      t.timestamps
    end
  end
end
