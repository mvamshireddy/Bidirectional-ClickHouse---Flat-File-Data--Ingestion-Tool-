CLICKHOUSE_CONFIG = {
    "host": "clickhouse-server",  # Use the Docker container name for 'host' if backend is also in Docker
    "port": 8123,                 # Default HTTP port for ClickHouse
    "user": "default",            # Default ClickHouse user
    "password": "",               # Leave blank if no password is set
    "database": "integration_db"  # Your ClickHouse database name
}