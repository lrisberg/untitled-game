def get_answer
  gets.strip
end


puts "Would you like to play this game? (yes/no)"

answer = get_answer

if answer == "yes"
  puts "Enter your character's name."

  name = get_answer

  while name == ""
    puts "Name cannot be blank. Try again."

    name = get_answer
  end

  puts "Your name is #{name}."
else
  puts "Bye."
end
