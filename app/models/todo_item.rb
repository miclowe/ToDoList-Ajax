class TodoItem < ActiveRecord::Base
  attr_accessible :completed, :name
end
