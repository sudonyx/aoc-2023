## CHALLENGE #2

power_sum = 0

File.foreach('data.txt') do |line|
  game = line.split(': ')
  game_id = /\d+/.match(game[0])[0].to_i

  colors = {
    red: 0,
    green: 0,
    blue: 0
  }

  attempts = game[1].split('; ')
  attempts.each do |attempt|
    num_cols = attempt.split(', ')
    num_cols.each do |num_col|
      num = /\d+/.match(num_col)[0].to_i
      col = /[a-z]+/.match(num_col)[0].to_sym

      colors[col] = num if num > colors[col]
    end
  end
  power = 1
  colors.each do |key, value|
    power *= value
  end
  power_sum += power
end

p power_sum

=begin

CHALLENGE #1

colors = {
  red: 12,
  green: 13,
  blue: 14
}

game_id_sum = 0

File.foreach('data.txt') do |line|
  game = line.split(': ')
  game_id = /\d+/.match(game[0])[0].to_i
  game_possible = true

  attempts = game[1].split('; ')
  attempts.each do |attempt|
    num_cols = attempt.split(', ')
    num_cols.each do |num_col|
      num = /\d+/.match(num_col)
      col = /[a-z]+/.match(num_col)
      game_possible = false if colors[col[0].to_sym] < num[0].to_i
      break if game_possible == false
    end
    break if game_possible == false
  end

  game_id_sum += game_id if game_possible
end

p game_id_sum

=end
