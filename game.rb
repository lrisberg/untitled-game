def get_answer
  gets.strip
end


puts 'Would you like to play this game? (yes/no)'

answer = get_answer

if answer == 'yes'
  puts 'Hooray!'
else
  puts 'booo'
end
