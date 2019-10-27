import csv
import re

file = 'datasets/OccupantAddresses.csv'
rows = []

def hasNumbers(inputString):
    return any(char.isdigit() for char in inputString)

def parse_addr(addr):
    # Search for apartment no
    hash_idx = addr.find('#')
    if hash_idx > -1:
        addr = addr[:hash_idx]

    # Search for suite
    suite = re.search('[0-9][a-zA-Z]', addr)
    if suite:
        (suite_idx, _) = suite.span()
        addr = addr[:suite_idx + 1] + addr[suite_idx + 2:]

    # Handle 'PO BOX'
    if 'PO BOX' in addr:
        addr = addr[7:] + ' ' + addr[:7]

    # Handle 'Route'
    if 'ROUTE' in addr:
        addr = addr[6:] + ' ' + addr[:6]

    # Replace first space with |
    if re.search('^[0-9]+', addr):
        addr = '|'.join(addr.split(' ', 1))
    return addr.strip()


i = 0
with open(file, 'r') as f:
    reader = csv.reader(f)
    for row in reader:
        if i%32 == 0:
            tmp = []
            tmp = row.copy()

            if i > 0 and tmp[2]!="" and hasNumbers(tmp[2]):   
                tmp[2] = parse_addr(tmp[2])

            if tmp[2] and hasNumbers(tmp[2]) and '|' in tmp[2]:
                rows.append(tmp)
        i += 1


with open(file, 'w', newline='') as f:
    writer = csv.writer(f)
    for row in rows:
        writer.writerow(row)
