from flask import Flask, request, jsonify
from clickhouse_client import ClickHouseClient
from flatfile_handler import FlatFileHandler
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Initialize clients
clickhouse_client = ClickHouseClient()
flatfile_handler = FlatFileHandler()

@app.route('/api/connect/clickhouse', methods=['POST'])
def connect_clickhouse():
    data = request.json
    host = data.get('host')
    port = data.get('port')
    database = data.get('database')
    user = data.get('user')
    # jwt_token = data.get('jwt_token') 
###    # Uncomment the line below if you want to use JWT token for authentication
   # try:
   #     clickhouse_client.connect(host, port, database, user, jwt_token)
     #   return jsonify({"message": "Connected to ClickHouse successfully"}), 200
   # except Exception as e:
   #     return jsonify({"error": str(e)}), 500

@app.route('/api/load-columns/clickhouse', methods=['POST'])
def load_columns_clickhouse():
    try:
        columns = clickhouse_client.get_columns()
        return jsonify({"columns": columns}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/ingest/clickhouse-to-file', methods=['POST'])
def ingest_clickhouse_to_file():
    data = request.json
    table_name = data.get('table_name')
    selected_columns = data.get('selected_columns')
    file_path = data.get('file_path')

    try:
        record_count = clickhouse_client.export_to_file(table_name, selected_columns, file_path)
        return jsonify({"message": f"Successfully exported {record_count} records to {file_path}"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/ingest/file-to-clickhouse', methods=['POST'])
def ingest_file_to_clickhouse():
    data = request.json
    file_path = data.get('file_path')
    table_name = data.get('table_name')

    try:
        record_count = flatfile_handler.import_to_clickhouse(file_path, table_name)
        return jsonify({"message": f"Successfully imported {record_count} records to {table_name}"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)