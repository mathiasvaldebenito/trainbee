class CreateVehicles < ActiveRecord::Migration[5.2]
  def change
    create_table :vehicles do |t|
      t.string :patent

      t.timestamps
    end

    add_index :vehicles, :patent, unique: true

  end
end
