data = File.open('data.txt')
data = File.read(data).split(/[\r\n]+/)

instructions = []
data[0].split('').each do |e|
  instructions << 0 if e == 'L'
  instructions << 1 if e == 'R'
end

network = {}

data[1..data.length].each do |n|
  match = n.scan(/([A-Z]{3})/).map { |e| e = e[0] }
  network[match[0]] = [match[1], match[2]]
end

loc = 'AAA'

steps = 0
i = 0
loop do
  i = 0 if i >= (instructions.length)

  loc = network[loc][instructions[i]]

  steps += 1
  i += 1
  break if loc == 'ZZZ'
end

puts "final count: #{steps}"
