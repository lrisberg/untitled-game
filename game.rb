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

  while true
    if input == 'examine here'
      puts "look - Look around the room."
      puts "examine here - Get a list of commands for what you can do."
      puts "quit - Quit the game."

    elsif input == 'look'
      puts "You find yourself on the floor in a dark room. The floor is wet. Eww."

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
