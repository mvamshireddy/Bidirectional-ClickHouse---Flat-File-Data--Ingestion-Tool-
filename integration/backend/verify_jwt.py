import jwt

# Secret key (must match the one used to sign the token)
SECRET_KEY = "your-secret-key"

# Token to verify
token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoidGVzdF91c2VyIiwiZXhwIjoxNzQ0ODI4NTU1fQ.i6IYumbDCl5Qt-RduBNhd5s-RtIPCvgTz_cxORsuKt0"

try:
    # Decode and verify the token
    decoded = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])

    # Print decoded payload
    print("Token is valid!")
    print("Decoded Payload:", decoded)

except jwt.ExpiredSignatureError:
    print("Token has expired!")
except jwt.InvalidTokenError as e:
    print("Invalid token!", e)