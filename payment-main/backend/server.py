from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import os

app = FastAPI()

# Mount static files
app.mount("/static", StaticFiles(directory="frontend/public"), name="static")

@app.get("/")
async def serve_index():
    """Serve the main tourism packages page"""
    return FileResponse("frontend/public/index.html")

@app.get("/payment")
async def serve_payment():
    """Serve the payment page"""  
    return FileResponse("frontend/public/payment.html")

# API Routes for future backend functionality
@app.get("/api/")
async def root():
    """Health check endpoint"""
    return {"message": "Nagai Tourism API is running!"}

@app.get("/api/packages")
async def get_packages():
    """Get all tourism packages"""
    packages = [
        {
            "id": 1,
            "name": "Temple Heritage Tour",
            "price": 4500,
            "duration": "2 Days",
            "description": "Explore ancient temples and spiritual heritage of Nagapattinam",
            "highlights": ["Nagore Dargah", "Ancient Temples", "Cultural Sites", "Local Guide"]
        },
        {
            "id": 2,
            "name": "Beach and Coastal Retreat", 
            "price": 3500,
            "duration": "1 Day",
            "description": "Relax and rejuvenate at pristine beaches and coastal areas",
            "highlights": ["Beach Activities", "Coastal Views", "Sunset Points", "Local Seafood"]
        },
        {
            "id": 3,
            "name": "Eco-Tourism Adventure",
            "price": 5500,
            "duration": "3 Days", 
            "description": "Experience nature and wildlife in eco-friendly environment",
            "highlights": ["Nature Walks", "Bird Watching", "Eco Resort", "Organic Farming"]
        },
        {
            "id": 4,
            "name": "Cultural Immersion Package",
            "price": 6000,
            "duration": "4 Days",
            "description": "Deep dive into local culture, traditions and lifestyle", 
            "highlights": ["Traditional Arts", "Local Festivals", "Village Stay", "Cultural Shows"]
        },
        {
            "id": 5,
            "name": "Family Fun Tour",
            "price": 4000,
            "duration": "2 Days",
            "description": "Perfect family getaway with activities for all ages",
            "highlights": ["Family Activities", "Kids Zone", "Group Games", "Photography"]
        },
        {
            "id": 6,
            "name": "Nagore Dargah Special",
            "price": 2500,
            "duration": "1 Day",
            "description": "Sacred pilgrimage to the famous Nagore Dargah",
            "highlights": ["Dargah Visit", "Prayer Sessions", "Historical Tour", "Spiritual Guide"]
        }
    ]
    return {"packages": packages}

@app.post("/api/bookings")
async def create_booking(booking_data: dict):
    """Create a new booking (placeholder for future implementation)"""
    # This would typically save to database
    return {"message": "Booking created successfully", "booking_id": "BOOK123456"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)