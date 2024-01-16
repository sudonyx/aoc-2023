data = File.open('data.txt').read
data.gsub!(/(\r|\n)+/, "\n")
data = data.split("\n")

# Part 2

def sum_gear_ratios(data)
  valid_gear_sum = 0
  find_gear_positions(data).each do |line_index, gear_inds|
    gear_inds.each do |gear_ind|

      nums = []
      # check same line
      arr = check_line(data, line_index, gear_ind)
      arr.each do |i|
        nums.append(i)
      end
      # check previous line
      arr = check_line(data, line_index - 1, gear_ind) unless line_index.zero?
      arr.each do |i|
        nums.append(i)
      end
      # check next line
      arr = check_line(data, line_index + 1, gear_ind) unless line_index == (data.length - 1)
      arr.each do |i|
        nums.append(i)
      end
      next unless nums.length > 1

      valid_gear_sum += (nums[0] * nums[1])
    end
  end

  valid_gear_sum
end

def find_gear_positions(data)
  gear_positions = Hash.new { |h, k| h[k] = [] }

  data.each_with_index do |line, line_ind|
    line.chars.each_with_index do |char, char_ind|
      next if /[^*]/.match(char)

      gear_positions[line_ind] = gear_positions[line_ind].append(char_ind)
    end
  end
  gear_positions
end

def check_line(data, line_index, gear_ind)
  nums = []

  return nums.append(check_point(data, line_index, gear_ind)) if check_point(data, line_index, gear_ind)

  unless gear_ind.zero?
    nums.append(check_point(data, line_index, gear_ind - 1)) if check_point(data, line_index, gear_ind - 1)
  end

  unless gear_ind == (data[line_index].length - 1)
    nums.append(check_point(data, line_index, gear_ind + 1)) if check_point(data, line_index, gear_ind + 1)
  end
  nums
end

def check_point(data, line_index, gear_ind)
  return unless /\d/.match(data[line_index][gear_ind])

  fetch_number(data, line_index, gear_ind)
end

def fetch_number(data, line_index, gear_ind)
  gear_ind -= 1 while /\d/.match(data[line_index][gear_ind - 1])

  num_arr = []
  num_arr << data[line_index][gear_ind] && gear_ind += 1 while /\d/.match(data[line_index][gear_ind])
  num_arr.join.to_i
end

p sum_gear_ratios(data)


=begin

PART 1

def sum_part_numbers(data)
  part_number_total = 0

  data.each_with_index do |line, line_ind|
    num_inds = []
    line.chars.each_with_index do |char, char_ind|
      next if /\D/.match(char)

      if /\d/.match(char)
        num_inds << char_ind
        if /\D/.match(line[char_ind + 1]) || char_ind == 0 || char_ind == 139
          num_inds.each do |num_ind|
            valid_same = check_same_line(data, line_ind, num_ind)
            valid_next = check_next_line(data, line_ind, num_ind) unless line == data[-1]
            valid_prev = check_prev_line(data, line_ind, num_ind) unless line == data[0]

            if valid_same || valid_next || valid_prev
              part_number = []
              num_inds.each do |num_ind|
                part_number << line[num_ind]
              end

              part_number_total += part_number.join.to_i
              break
            end
          end
          num_inds = []
        end
      end
    end
  end

  return part_number_total
end

def check_same_line(data, line_ind, num_ind)
  unless num_ind == 139
    return true if check_right_side(data, line_ind, num_ind)
  end
  unless num_ind.zero?
    return true if check_left_side(data, line_ind, num_ind)
  end
end

def check_next_line(data, line_ind, num_ind)
  return true if /[^\d|.]/.match(data[line_ind + 1][num_ind])

  unless num_ind == 139
    return true if check_right_side(data, line_ind + 1, num_ind)
  end
  unless num_ind.zero?
    return true if check_left_side(data, line_ind + 1, num_ind)
  end
end

def check_prev_line(data, line_ind, num_ind)
  return true if /[^\d|.]/.match(data[line_ind - 1][num_ind])

  unless num_ind == 139
    return true if check_right_side(data, line_ind - 1, num_ind)
  end
  unless num_ind.zero?
    return true if check_left_side(data, line_ind - 1, num_ind)
  end
end

def check_right_side(data, line_ind, num_ind)
  return true if /[^\d|.]/.match(data[line_ind][num_ind + 1])
end

def check_left_side(data, line_ind, num_ind)
  return true if /[^\d|.]/.match(data[line_ind][num_ind - 1])
end

p sum_part_numbers(data)

=end
