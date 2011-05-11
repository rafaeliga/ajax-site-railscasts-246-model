class Category < ActiveRecord::Base
	attr_accessible :name, :topic, :place
	
	def self.search(search)
    if search
      where('name LIKE ?', "%#{search}%")
    else
      scoped
    end
  end
end
