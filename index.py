from flask import Flask, render_template, request, redirect
from pymongo import MongoClient

app = Flask(__name__, template_folder='app/templates', static_folder='app/static')

# Connect to MongoDB
client = MongoClient("mongodb://127.0.0.1:27017/")  # Replace with your MongoDB URI if hosted remotely
db = client["gym_booking"]  # Database name
bookings_collection = db["bookings"]  # Collection name

# Home route
@app.route("/")
def home():
    return render_template("index.html")  # Update this with your home HTML file name

# Booking route
@app.route("/book", methods=["POST"])
def book():
    name = request.form.get("name")
    phone = request.form.get("phone")
    category = request.form.get("category")

    # Create a document to insert into MongoDB
    booking = {
        "name": name,
        "phone": phone,
        "category": category,
    }

    # Insert the booking into the MongoDB collection
    bookings_collection.insert_one(booking)

    # Redirect to the confirmation page
    return redirect("/confirmation")

# Confirmation route
@app.route("/confirmation")
def confirmation():
    return render_template("confirmation.html")  # Render the confirmation template

if __name__ == "__main__":
    app.run(debug=True)
