from fastapi import FastAPI, Depends, HTTPException, status, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List, Optional
import datetime

import models
import schemas
import auth
import ai_service
from database import engine, get_db
from seed_data import seed_db

# Initialize DB tables & seed
models.Base.metadata.create_all(bind=engine)
try:
    seed_db()
except Exception as e:
    print(f"Seed info: {e}")

app = FastAPI(
    title="FARMDIRECT API",
    description="AI-Powered Direct Farmer-to-Buyer Platform API (SIH26033)",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {
        "platform": "FARMDIRECT",
        "tagline": "From Farm to Buyer, Directly.",
        "status": "Operational",
        "version": "1.0.0"
    }

# ================= AUTHENTICATION =================
@app.post("/api/auth/register", response_model=schemas.TokenResponse)
def register_user(user_data: schemas.UserRegister, db: Session = Depends(get_db)):
    existing = db.query(models.User).filter(models.User.email == user_data.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_pw = auth.hash_password(user_data.password)
    user = models.User(
        name=user_data.name,
        email=user_data.email,
        phone=user_data.phone,
        hashed_password=hashed_pw,
        role=user_data.role,
        location=user_data.location
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    if user.role == "farmer":
        profile = models.FarmerProfile(
            user_id=user.id,
            farm_name=f"{user.name}'s Farm",
            farm_location=user.location,
            crops_grown="Vegetables & Grains"
        )
        db.add(profile)
    elif user.role == "buyer":
        profile = models.BuyerProfile(
            user_id=user.id,
            business_name=f"{user.name} Procurement",
            location=user.location
        )
        db.add(profile)
    
    db.commit()

    token = auth.create_access_token({"sub": user.email, "id": user.id, "role": user.role})
    return {"access_token": token, "token_type": "bearer", "user": user}

@app.post("/api/auth/login", response_model=schemas.TokenResponse)
def login_user(login_data: schemas.UserLogin, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == login_data.email).first()
    if not user or not auth.verify_password(login_data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    token = auth.create_access_token({"sub": user.email, "id": user.id, "role": user.role})
    return {"access_token": token, "token_type": "bearer", "user": user}

# ================= PRODUCTS & CATEGORIES =================
@app.get("/api/categories")
def get_categories(db: Session = Depends(get_db)):
    return db.query(models.Category).all()

@app.get("/api/products")
def get_products(
    category_id: Optional[int] = None,
    search: Optional[str] = None,
    max_price: Optional[float] = None,
    quality_grade: Optional[str] = None,
    sort_by: Optional[str] = "newest", # price_asc, price_desc, distance, newest
    db: Session = Depends(get_db)
):
    query = db.query(models.Product).filter(models.Product.status == "published")

    if category_id:
        query = query.filter(models.Product.category_id == category_id)
    if search:
        query = query.filter(models.Product.name.ilike(f"%{search}%") | models.Product.description.ilike(f"%{search}%"))
    if max_price:
        query = query.filter(models.Product.price_per_unit <= max_price)
    if quality_grade:
        query = query.filter(models.Product.quality_grade == quality_grade)

    products = query.all()

    # Format result with farmer info
    results = []
    for p in products:
        p_dict = {
            "id": p.id,
            "farmer_id": p.farmer_id,
            "category_id": p.category_id,
            "name": p.name,
            "description": p.description,
            "image_url": p.image_url,
            "price_per_unit": p.price_per_unit,
            "unit": p.unit,
            "available_quantity": p.available_quantity,
            "harvest_date": p.harvest_date,
            "location": p.location,
            "quality_grade": p.quality_grade,
            "status": p.status,
            "distance_km": p.distance_km,
            "created_at": p.created_at,
            "farmer_name": p.farmer.user.name if (p.farmer and p.farmer.user) else "Local Farmer",
            "farmer_rating": p.farmer.rating if p.farmer else 4.8
        }
        results.append(p_dict)

    # Sorting
    if sort_by == "price_asc":
        results.sort(key=lambda x: x["price_per_unit"])
    elif sort_by == "price_desc":
        results.sort(key=lambda x: x["price_per_unit"], reverse=True)
    elif sort_by == "distance":
        results.sort(key=lambda x: x["distance_km"])
    else: # newest
        results.sort(key=lambda x: x["id"], reverse=True)

    return results

@app.get("/api/products/{product_id}")
def get_product_by_id(product_id: int, db: Session = Depends(get_db)):
    p = db.query(models.Product).filter(models.Product.id == product_id).first()
    if not p:
        raise HTTPException(status_code=404, detail="Product not found")

    reviews = db.query(models.Review).filter(models.Review.product_id == product_id).all()
    
    return {
        "id": p.id,
        "farmer_id": p.farmer_id,
        "category_id": p.category_id,
        "name": p.name,
        "description": p.description,
        "image_url": p.image_url,
        "price_per_unit": p.price_per_unit,
        "unit": p.unit,
        "available_quantity": p.available_quantity,
        "harvest_date": p.harvest_date,
        "location": p.location,
        "quality_grade": p.quality_grade,
        "status": p.status,
        "distance_km": p.distance_km,
        "created_at": p.created_at,
        "farmer_name": p.farmer.user.name if (p.farmer and p.farmer.user) else "Local Farmer",
        "farmer_phone": p.farmer.user.phone if (p.farmer and p.farmer.user) else "+91 98430 11223",
        "farmer_rating": p.farmer.rating if p.farmer else 4.8,
        "farmer_experience": p.farmer.experience_years if p.farmer else 5,
        "farm_name": p.farmer.farm_name if p.farmer else "Farm",
        "reviews": [{"id": r.id, "rating": r.rating, "comment": r.comment} for r in reviews]
    }

@app.post("/api/products")
def create_product(product_data: schemas.ProductCreate, db: Session = Depends(get_db)):
    # Default to farmer 1 for demo
    farmer = db.query(models.FarmerProfile).first()
    farmer_id = farmer.id if farmer else 1

    product = models.Product(
        farmer_id=farmer_id,
        category_id=product_data.category_id,
        name=product_data.name,
        description=product_data.description,
        image_url=product_data.image_url or "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=600&q=80",
        price_per_unit=product_data.price_per_unit,
        unit=product_data.unit,
        available_quantity=product_data.available_quantity,
        harvest_date=product_data.harvest_date,
        location=product_data.location,
        quality_grade=product_data.quality_grade,
        status=product_data.status
    )
    db.add(product)
    db.commit()
    db.refresh(product)

    # Trigger Notification for AI Buyer Matching
    notif = models.Notification(
        user_id=1,
        title="Product Published Successfully!",
        message=f"Your listing for {product.name} ({product.available_quantity} {product.unit}) is live. Smart buyer matching initialized!",
        type="match"
    )
    db.add(notif)
    db.commit()

    return product

# ================= ORDERS & CHECKOUT =================
@app.post("/api/orders")
def create_order(order_req: schemas.OrderCreate, db: Session = Depends(get_db)):
    buyer = db.query(models.BuyerProfile).first()
    buyer_id = buyer.id if buyer else 1

    total = 0.0
    items_to_create = []

    for item in order_req.items:
        p = db.query(models.Product).filter(models.Product.id == item.product_id).first()
        if p:
            subtotal = p.price_per_unit * item.quantity
            total += subtotal
            items_to_create.append((p, item.quantity, subtotal))

    order_num = f"FD-{datetime.datetime.now().strftime('%Y')}-{random.randint(10000, 99999)}"
    
    order = models.Order(
        order_number=order_num,
        buyer_id=buyer_id,
        total_amount=total,
        delivery_fee=50.0,
        status="Order Placed",
        delivery_address=order_req.delivery_address,
        payment_method=order_req.payment_method,
        payment_status="Paid"
    )
    db.add(order)
    db.commit()
    db.refresh(order)

    for p, qty, subtotal in items_to_create:
        oi = models.OrderItem(
            order_id=order.id,
            product_id=p.id,
            quantity=qty,
            unit_price=p.price_per_unit,
            total_price=subtotal
        )
        db.add(oi)

    # Simulated Payment record
    pay = models.Payment(
        order_id=order.id,
        transaction_id=f"TXN-{random.randint(1000000, 9999999)}",
        payment_method=order_req.payment_method,
        amount=total + 50.0,
        status="Success"
    )
    db.add(pay)

    # Delivery Tracking setup
    dt = models.DeliveryTracking(
        order_id=order.id,
        driver_name="Senthil Kumar (Agro Express)",
        driver_phone="+91 94440 12345",
        vehicle_number="TN 38 AC 9911",
        current_status="Order Placed - Driver Assigned",
        origin_location="Farmer Hub",
        destination_location=order_req.delivery_address[:30],
        progress_percentage=15.0,
        estimated_delivery="Tomorrow, 4:00 PM"
    )
    db.add(dt)
    db.commit()

    return {
        "order_id": order.id,
        "order_number": order.order_number,
        "total_amount": total + 50.0,
        "status": order.status,
        "message": "Order successfully placed and paid!"
    }

@app.get("/api/orders")
def get_orders(db: Session = Depends(get_db)):
    orders = db.query(models.Order).order_by(models.Order.id.desc()).all()
    results = []
    for o in orders:
        results.append({
            "id": o.id,
            "order_number": o.order_number,
            "total_amount": o.total_amount,
            "delivery_fee": o.delivery_fee,
            "status": o.status,
            "payment_method": o.payment_method,
            "payment_status": o.payment_status,
            "created_at": o.created_at,
            "delivery_address": o.delivery_address,
            "item_count": len(o.items)
        })
    return results

@app.get("/api/orders/{order_id}")
def get_order_details(order_id: int, db: Session = Depends(get_db)):
    order = db.query(models.Order).filter(models.Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    items = []
    for item in order.items:
        items.append({
            "id": item.id,
            "product_name": item.product.name if item.product else "Crop Product",
            "image_url": item.product.image_url if item.product else "",
            "quantity": item.quantity,
            "unit_price": item.unit_price,
            "total_price": item.total_price
        })

    tracking = db.query(models.DeliveryTracking).filter(models.DeliveryTracking.order_id == order_id).first()

    return {
        "id": order.id,
        "order_number": order.order_number,
        "total_amount": order.total_amount,
        "delivery_fee": order.delivery_fee,
        "status": order.status,
        "payment_method": order.payment_method,
        "payment_status": order.payment_status,
        "delivery_address": order.delivery_address,
        "created_at": order.created_at,
        "items": items,
        "tracking": {
            "driver_name": tracking.driver_name if tracking else "Driver",
            "driver_phone": tracking.driver_phone if tracking else "+91 98765 43210",
            "vehicle_number": tracking.vehicle_number if tracking else "TN 59 AB 2024",
            "current_status": tracking.current_status if tracking else order.status,
            "progress_percentage": tracking.progress_percentage if tracking else 50.0,
            "estimated_delivery": tracking.estimated_delivery if tracking else "Today, 5:30 PM"
        } if tracking else None
    }

# ================= AI SERVICES =================
@app.post("/api/ai/price-prediction")
def price_prediction(req: schemas.PricePredictionRequest):
    return ai_service.predict_crop_price(req.crop, req.location, req.quantity, req.season or "Current")

@app.post("/api/ai/demand-forecast")
def demand_forecast(req: schemas.DemandForecastRequest):
    return ai_service.forecast_demand(req.crop, req.location, req.time_period or "Next 30 Days")

@app.post("/api/ai/buyer-matching")
def smart_buyer_matching(req: schemas.SmartBuyerMatchRequest):
    return ai_service.match_smart_buyers(req.crop_name, req.quantity, req.expected_price, req.location)

# ================= ANALYTICS & ADMIN =================
@app.get("/api/analytics")
def get_analytics(db: Session = Depends(get_db)):
    total_farmers = db.query(models.FarmerProfile).count()
    total_buyers = db.query(models.BuyerProfile).count()
    total_products = db.query(models.Product).count()
    total_orders = db.query(models.Order).count()

    return {
        "total_farmers": total_farmers or 3,
        "total_buyers": total_buyers or 2,
        "total_products": total_products or 6,
        "total_orders": total_orders or 1,
        "total_revenue": 185000.0,
        "monthly_orders": [
            {"month": "Jan", "orders": 12, "revenue": 45000},
            {"month": "Feb", "orders": 19, "revenue": 68000},
            {"month": "Mar", "orders": 24, "revenue": 92000},
            {"month": "Apr", "orders": 31, "revenue": 120000},
            {"month": "May", "orders": 45, "revenue": 185000}
        ],
        "crop_distribution": [
            {"name": "Vegetables", "value": 45},
            {"name": "Grains & Rice", "value": 30},
            {"name": "Fruits", "value": 15},
            {"name": "Spices & Herbs", "value": 10}
        ]
    }

@app.get("/api/notifications")
def get_notifications(db: Session = Depends(get_db)):
    return db.query(models.Notification).order_by(models.Notification.id.desc()).all()
