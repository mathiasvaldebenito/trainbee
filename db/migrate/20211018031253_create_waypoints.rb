class CreateWaypoints < ActiveRecord::Migration[5.2]
  def change
    create_table :waypoints do |t|
      t.decimal :latitude
      t.decimal :longitude
      t.belongs_to :vehicle, foreign_key: true

      t.timestamps
    end
  end
end
