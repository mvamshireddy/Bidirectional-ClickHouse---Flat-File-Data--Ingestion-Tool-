from flask import Flask, jsonify
from utils.clickhouse_connection import get_clickhouse_client
from flask import Flask, request, jsonify
from clickhouse_client import ClickHouseClient
from flatfile_handler import FlatFileHandler
from flask_cors import CORS

app = Flask(__name__)

@app.route('/api/connect/clickhouse', methods=['POST'])
def connect_to_clickhouse():
    """
    API endpoint to test the connection to ClickHouse.
    """
    try:
        # Get the ClickHouse client
        client = get_clickhouse_client()

        # Execute a test query
        result = client.execute("SELECT 1")

        # Return success response
        return jsonify({"message": "Connected to ClickHouse successfully!", "result": result}), 200
    except Exception as e:
        # Return error response
        return jsonify({"error": f"Failed to connect to ClickHouse: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')