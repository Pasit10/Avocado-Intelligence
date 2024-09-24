import requests
import base64

# Read image and encode it as base64
with open("backend/test_request.py/10_0_0_20170110215927291.jpg.chip.jpg", "rb") as image_file:
    encoded_image = base64.b64encode(image_file.read()).decode('utf-8')

#print(encoded_image)

# Prepare JSON payload
json_data = {
    "customer_img" : encoded_image
}

# Send POST request with image data in JSON
requests.post("http://localhost:8080/customer/addcustomer", json=json_data)

#print(response.json())