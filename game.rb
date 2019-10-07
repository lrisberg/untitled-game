def get_answer
  gets.strip
end

class Thing
  def initialize(name, actions)
    @name = name
    @actions = actions
  end

  def examine
    @actions.map do |action|
      puts "#{action.name} - #{action.description}"
    end
  end

  def name
    @name
  end

  def actions
    @actions
  end

  def has_action?(action_name)
    if action_name == 'examine'
      return true
    end

    action = @actions.find do |a|
      a.name == action_name
    end

    !action.nil?
  end

  def do_action(action_name)
    if action_name == 'examine'
      self.examine
    else
      action = @actions.find do |a|
        a.name == action_name
      end

      action.execute
    end
  end
end

class Action
  def initialize(name, description, outcome)
    @name = name
    @description = description
    @outcome = outcome
  end

  def name
    @name
  end

  def description
    @description
  end

  def execute
    puts @outcome
  end
end

class Room
  def initialize(things, description)
    @things = things
    @description = description
  end

  def examine
    puts "look - Look around you"
    puts "examine here - Get a list of commands for what you can do."
    puts "quit - Quit the game."
  end

  def look
    puts @description
  end

  def get_thing(thing_name)
    @things.find do |t|
      t.name == thing_name
    end
  end

  def has_thing?(thing_name)
    !get_thing(thing_name).nil?
  end
end


puts "Would you like to play this game? (yes/no)"

answer = get_answer

if ["yes", "y"].include?(answer)
  puts "Enter your character's name."

  name = get_answer

  while name == ""
    puts "Name cannot be blank. Try again."

    name = get_answer
  end

  puts "Your name is #{name}."

  puts "You find yourself on the floor in a dark room. The floor is wet. Eww."

  puts "Type 'examine here' for a list of things you can do in this room."

  input = get_answer

  room1 = Room.new(
    [
      Thing.new("cat", [Action.new("pet", "Pet the cat.", "The cat purrs."), Action.new("snuggle", "Snuggle the cat.", "The cat claws at your face. Ow!")]),
      Thing.new("chair", [Action.new("nudge", "Nudge the chair with your foot.", "You nudge the chair with your foot. It doesn't respond. It's a chair."), Action.new("kick", "Kick the chair hard with your foot!", "You kick the chair. It doesn't respond. It's a chair.")])
    ],
    "You find yourself on the floor in a dark room. The floor is wet. Eww. You see a black cat staring at you. There's a chair in the corner. There's a door to the east."
  )

  room2 = Room.new(
    [

    ],
    "This room is full of mirrors. You see yourself everywhere! There's a door to the west."
  )

  current_room = room1

  while true
    if input == 'examine here'
      current_room.examine

    elsif input == 'look'
      current_room.look

    elsif input == 'quit'
      puts "Bye."
      break

    elsif input == 'north'
      puts "There's no door to the north."

    elsif input == 'east'
      if (current_room == room1)
        puts "You make your way east."
        current_room = room2
        current_room.look
      else
        puts "There's no door to the east."
      end

    elsif input == 'south'
      puts "There's no door to the south."

    elsif input == 'west'
      if (current_room == room2)
        puts "You make your way west."
        current_room = room1
        current_room.look
      else
        puts "There's no door to the west."
      end

    elsif input.split.length == 2
      thing_name = input.split[1]
      action_name = input.split[0]

      if current_room.has_thing?(thing_name)
        thing = current_room.get_thing(thing_name)
        if thing.has_action?(action_name)
          thing.do_action(action_name)
        else
          puts "You can't #{action_name} this #{thing_name}. Try 'examine #{thing_name}'."
        end

      else
        puts "There's no #{thing_name} here. Try 'look' to see what's around you."
      end

    else
      puts "Invalid command. Try 'examine here'"

    end

    input = get_answer
  end

else
  puts "Bye."
end
