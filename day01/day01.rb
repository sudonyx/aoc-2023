word_nums = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9
}

data = File.read('data.txt').split

line_digits = []

data.each do |word|
  digits = []

  arr = []
  word.chars.each do |char|
    if /\d/.match(char)
      digits << char.to_i
      arr = []
    else
      arr << char
      word_nums.each do |key, value|
        if arr.join.include?(key.to_s)
          digits << value
          arr = [char]
        end
      end
    end
  end

  line_digits << "#{digits[0]}#{digits[-1]}".to_i
end

sum = 0
line_digits.each do |line|
  sum += line
end
p sum
