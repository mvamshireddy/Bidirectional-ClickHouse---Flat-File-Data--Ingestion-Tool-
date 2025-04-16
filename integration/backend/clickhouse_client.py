import clickhouse_connect

class ClickHouseClient:
    def __init__(self):
        self.client = None

    def connect(self, host, port, database, user, jwt_token):
        self.client = clickhouse_connect.get_client(
            host=host,
            port=port,
            username=user,
            password=jwt_token,
            database=database
        )

    def get_columns(self):
        tables = self.client.query('SHOW TABLES').result_rows
        columns = {}
        for table in tables:
            table_name = table[0]
            query = f"DESCRIBE TABLE {table_name}"
            columns[table_name] = [row[0] for row in self.client.query(query).result_rows]
        return columns

    def export_to_file(self, table_name, selected_columns, file_path):
        columns_str = ", ".join(selected_columns)
        query = f"SELECT {columns_str} FROM {table_name}"
        result = self.client.query(query)
        with open(file_path, 'w') as f:
            f.write(",".join(selected_columns) + "\n")
            for row in result.result_rows:
                f.write(",".join(map(str, row)) + "\n")
        return len(result.result_rows)