data = File.open('data.txt').read
data = data.split("\n")

def total_cards(data)
  cards = create_hash(data)

  data.each do |e|
    card = e.split(': ')
    card_id = /\d+/.match(card[0])[0].to_i
    p card_id

    win_nums = card[1].split(' | ')[0].split(' ')
    have_nums = card[1].split(' | ')[1].split(' ')

    cards[card_id].times do
      x = 1
      (have_nums.length - (have_nums - win_nums).length).times do
        cards[card_id + x] += 1
        x += 1
      end
    end
  end

  total = 0
  cards.each_value { |v| total += v }
  total
end

def create_hash(data)
  cards = Hash.new(1)

  x = 0
  data.length.times do
    x += 1
    cards[x] = 1
  end

  cards
end

p total_cards(data)

=begin

def total_points(data)
  total = 0
  data.each do |e|
    card = e.split(': ')

    win_nums = card[1].split(' | ')[0]
    have_nums = card[1].split(' | ')[1]

    win_nums = win_nums.split(' ')
    have_nums = have_nums.split(' ')

    total += (2**(have_nums.length - (have_nums - win_nums).length)) / 2
  end
  total
end

p total_points(data)

=end
