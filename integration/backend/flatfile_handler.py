import csv
from clickhouse_client import ClickHouseClient

class FlatFileHandler:
    def __init__(self):
        self.clickhouse_client = ClickHouseClient()

    def import_to_clickhouse(self, file_path, table_name):
        with open(file_path, 'r') as f:
            reader = csv.reader(f)
            headers = next(reader)
            rows = [tuple(row) for row in reader]

        # Create table if not exists
        columns_definition = ", ".join([f"{col} String" for col in headers])
        create_table_query = f"CREATE TABLE IF NOT EXISTS {table_name} ({columns_definition}) ENGINE = MergeTree() ORDER BY tuple()"
        self.clickhouse_client.client.command(create_table_query)

        # Insert data
        insert_query = f"INSERT INTO {table_name} ({', '.join(headers)}) VALUES"
        self.clickhouse_client.client.insert(insert_query, rows)
        return len(rows)