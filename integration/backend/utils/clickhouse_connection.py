from clickhouse_driver import Client
from config import CLICKHOUSE_CONFIG

def get_clickhouse_client():
    """
    Establishes a connection to ClickHouse and returns the client.
    """
    try:
        client = Client(
            host=CLICKHOUSE_CONFIG["host"],
            port=CLICKHOUSE_CONFIG["port"],
            user=CLICKHOUSE_CONFIG["user"],
            password=CLICKHOUSE_CONFIG["password"],
            database=CLICKHOUSE_CONFIG["database"]
        )
        return client
    except Exception as e:
        print(f"Error connecting to ClickHouse: {e}")
        raise