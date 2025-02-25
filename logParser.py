import re
import json
import sys
import csv
from datetime import datetime
import pytz

log_pattern = re.compile(r'(?P<timestamp>\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z) (?P<level>info|error):(?: \((?P<source>.*?)\))? (?P<message>.*)')

def convert_to_bangkok_time(utc_time):
    utc_dt = datetime.strptime(utc_time, "%Y-%m-%dT%H:%M:%S.%fZ").replace(tzinfo=pytz.utc)
    bangkok_dt = utc_dt.astimezone(pytz.timezone("Asia/Bangkok"))
    return bangkok_dt.strftime("%Y-%m-%d %H:%M:%S")

if len(sys.argv) < 2 or sys.argv[1].lower() == "help":
    print("Usage: python logParser.py <fileLocation> [outputCSV]")
    sys.exit(1)

file_path = sys.argv[1]
csv_output = sys.argv[2] if len(sys.argv) > 2 else None

log_entries = []

try:
    with open(file_path, "r", encoding="utf-8") as file:
        log_data = file.readlines()
except FileNotFoundError:
    print(f"Error: File '{file_path}' not found.")
    sys.exit(1)
except UnicodeDecodeError:
    print(f"Error: Unable to decode '{file_path}'. Please ensure it is in UTF-8 format.")
    sys.exit(1)

previous_entry = None

for line in log_data:
    line = line.strip()
    match = log_pattern.match(line)
    if match:
        entry = match.groupdict()
        entry["timestamp"] = convert_to_bangkok_time(entry["timestamp"])
        log_entries.append(entry)
        previous_entry = entry if entry["level"] == "error" else None
    else:
        try:
            log_json = json.loads(line)
            log_json["timestamp"] = convert_to_bangkok_time(log_json["timestamp"])
            if previous_entry:
                previous_entry["error_response"] = log_json
                previous_entry = None
            else:
                log_entries.append(log_json)
        except json.JSONDecodeError:
            pass

if csv_output:
    keys = ["timestamp", "level", "source", "message", "error_response"]
    with open(csv_output, "w", newline="", encoding="utf-8") as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=keys)
        writer.writeheader()
        for entry in log_entries:
            writer.writerow(entry)
    print(f"Logs saved to {csv_output}")
else:
    for entry in log_entries:
        print(entry)
