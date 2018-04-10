class CreateCommands < ActiveRecord::Migration[5.1]
  def change
    create_table :commands do |t|
      t.references :user
      t.string :content, comment: '指令内容'
      t.string :use_for, comment: '用途'
      t.string :labels, comment: '标签'

      t.timestamps
    end
  end
end
