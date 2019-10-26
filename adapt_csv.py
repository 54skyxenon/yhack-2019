import csv
import re

file = 'datasets/OccupantAddresses.csv'
rows = []


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

    if 'PO BOX' in addr:
        addr = addr[7:] + addr[:7]

    # Replace first space with |
    if re.search('[0-9]+', addr):
        addr = '|'.join(addr.split(' ', 1))
    return addr.strip()


i = 0
with open(file, 'r') as f:
    reader = csv.reader(f)
    for row in reader:
        tmp = []
        tmp = row.copy()

        if i > 0:
            tmp[2] = parse_addr(tmp[2])
        rows.append(tmp)
        i += 1


with open(file, 'w', newline='') as f:
    writer = csv.writer(f)
    for row in rows:
        writer.writerow(row)
