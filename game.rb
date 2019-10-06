def get_answer
  gets.strip
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

    def things
      @things
    end

    def description
      @description
    end
  end

  room = Room.new(
    [
      Thing.new("cat", [Action.new("pet", "Pet the cat.", "The cat purrs."), Action.new("snuggle", "Snuggle the cat.", "The cat claws at your face. Ow!")]),
      Thing.new("chair", [Action.new("nudge", "Nudge the chair with your foot.", "You nudge the chair with your foot. It doesn't respond. It's a chair."), Action.new("kick", "Kick the chair hard with your foot!", "You kick the chair. It doesn't respond. It's a chair.")])
    ],
    "You find yourself on the floor in a dark room. The floor is wet. Eww. You see a black cat staring at you. There's a chair in the corner."
  )

  while true
    if input == 'examine here'
      puts "look - Look around you"
      puts "examine here - Get a list of commands for what you can do."
      puts "quit - Quit the game."

    elsif input == 'look'
      puts room.description

    elsif input.split.length == 2
      thing_name = input.split[1]
      action_name = input.split[0]

      thing = room.things.find do |thing|
        thing.name == thing_name
      end

      if thing
        if action_name == "examine"
          thing.examine
        else
          action = thing.actions.find do |action|
            action.name == action_name
          end

          if action
            action.execute
          else
            puts "Unrecognized command. Try 'examine here'"
          end
        end
      else
        puts "Unrecognized command. Try 'examine here'"
      end

    elsif input == 'quit'
      puts "Bye."
      break

    else
      puts "Unrecognized command. Try 'examine here'"

    end

    input = get_answer
  end


else
  puts "Bye."
end
