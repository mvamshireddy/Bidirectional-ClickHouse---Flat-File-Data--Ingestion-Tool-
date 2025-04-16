from flask import Flask, jsonify
import jwt
import datetime

app = Flask(__name__)

# Secret key for signing JWT tokens (use a secure, random key in production)
SECRET_KEY = "your-secret-key"

@app.route('/generate-token', methods=['GET'])
def generate_token():
    try:
        # Create a payload for the token
        payload = {
            'user': 'test_user',  # Example user data
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)  # Token expires in 1 hour
        }

        # Generate JWT token
        token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')

        # Return the token
        return jsonify({'token': token})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)