from database import SessionLocal, engine, Base
import models
import auth
import datetime

def seed_db():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    # Check if already seeded
    if db.query(models.User).filter_index_by(email="farmer@farmdirect.com").first():
        print("Database already contains seed data.")
        db.close()
        return

    print("Seeding FARMDIRECT database with realistic agricultural data...")

    # Password hash
    pass_hash = auth.hash_password("password123")
    admin_pass = auth.hash_password("admin123")

    # 1. USERS
    user_farmer1 = models.User(
        name="Murugan Agricultural Farm",
        email="farmer@farmdirect.com",
        phone="+91 98430 11223",
        hashed_password=pass_hash,
        role="farmer",
        location="Madurai, Tamil Nadu",
        status="active"
    )
    user_farmer2 = models.User(
        name="Velu Thanjavur Agro",
        email="velu@farmdirect.com",
        phone="+91 97891 44556",
        hashed_password=pass_hash,
        role="farmer",
        location="Thanjavur, Tamil Nadu",
        status="active"
    )
    user_farmer3 = models.User(
        name="Lakshmi Mango Orchards",
        email="lakshmi@farmdirect.com",
        phone="+91 94422 77889",
        hashed_password=pass_hash,
        role="farmer",
        location="Salem, Tamil Nadu",
        status="active"
    )

    user_buyer1 = models.User(
        name="FreshMart Supermarkets",
        email="buyer@farmdirect.com",
        phone="+91 91234 98765",
        hashed_password=pass_hash,
        role="buyer",
        location="Coimbatore, Tamil Nadu",
        status="active"
    )
    user_buyer2 = models.User(
        name="Annapoorna Hotel Chain",
        email="buyer2@farmdirect.com",
        phone="+91 98940 33211",
        hashed_password=pass_hash,
        role="buyer",
        location="Chennai, Tamil Nadu",
        status="active"
    )

    user_admin = models.User(
        name="FarmDirect Portal Administrator",
        email="admin@farmdirect.com",
        phone="+91 90000 00000",
        hashed_password=admin_pass,
        role="admin",
        location="Headquarters, Chennai",
        status="active"
    )

    db.add_all([user_farmer1, user_farmer2, user_farmer3, user_buyer1, user_buyer2, user_admin])
    db.commit()

    # 2. FARMER PROFILES
    f1_profile = models.FarmerProfile(
        user_id=user_farmer1.id,
        farm_name="Green Valley Organic Farms",
        farm_location="Vadipatti, Madurai",
        farm_size_acres=12.5,
        crops_grown="Tomato, Red Onion, Green Chilli",
        experience_years=14,
        photo_url="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=400&q=80",
        rating=4.9,
        total_sales=185000.0
    )
    f2_profile = models.FarmerProfile(
        user_id=user_farmer2.id,
        farm_name="Delta Paddy Fields & Grains",
        farm_location="Kumbakonam, Thanjavur",
        farm_size_acres=25.0,
        crops_grown="Sona Masoori Rice, Ponni Rice",
        experience_years=20,
        photo_url="https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=400&q=80",
        rating=4.8,
        total_sales=420000.0
    )
    f3_profile = models.FarmerProfile(
        user_id=user_farmer3.id,
        farm_name="Royal Salem Orchards",
        farm_location="Yercaud Foothills, Salem",
        farm_size_acres=18.0,
        crops_grown="Alphonso Mango, Tender Coconut, Cavendish Banana",
        experience_years=10,
        photo_url="https://images.unsplash.com/photo-1592417817098-8f3d69286669?auto=format&fit=crop&w=400&q=80",
        rating=4.95,
        total_sales=310000.0
    )

    db.add_all([f1_profile, f2_profile, f3_profile])

    # 3. BUYER PROFILES
    b1_profile = models.BuyerProfile(
        user_id=user_buyer1.id,
        business_name="FreshMart Hyperlocal Stores",
        buyer_type="wholesaler",
        location="RS Puram, Coimbatore",
        photo_url="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80"
    )
    b2_profile = models.BuyerProfile(
        user_id=user_buyer2.id,
        business_name="Annapoorna Gourmet Foods",
        buyer_type="restaurant",
        location="T Nagar, Chennai",
        photo_url="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=400&q=80"
    )

    db.add_all([b1_profile, b2_profile])
    db.commit()

    # 4. CATEGORIES
    c_veg = models.Category(name="Vegetables", description="Fresh farm vegetables harvested daily", image_url="https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=400&q=80")
    c_grain = models.Category(name="Grains & Pulses", description="Naturally processed paddy, rice, and pulses", image_url="https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=400&q=80")
    c_fruits = models.Category(name="Fruits", description="Tree-ripened organic fruits", image_url="https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=400&q=80")
    c_spices = models.Category(name="Spices & Herbs", description="Aromatic fresh herbs and chillies", image_url="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=400&q=80")

    db.add_all([c_veg, c_grain, c_fruits, c_spices])
    db.commit()

    # 5. PRODUCTS
    p1 = models.Product(
        farmer_id=f1_profile.id,
        category_id=c_veg.id,
        name="Fresh Country Tomatoes",
        description="Naturally grown juicy farm-fresh country tomatoes. Harvested straight from Madurai fields without artificial chemical sprays.",
        image_url="https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80",
        price_per_unit=32.0,
        unit="kg",
        available_quantity=850.0,
        harvest_date="Yesterday",
        location="Madurai, TN",
        quality_grade="Grade A+",
        status="published",
        distance_km=12.4
    )
    p2 = models.Product(
        farmer_id=f2_profile.id,
        category_id=c_grain.id,
        name="Organic Sona Masoori Rice",
        description="Premium aged 1-year Sona Masoori raw rice. Unpolished, high nutritional value, directly from Thanjavur paddy farmers.",
        image_url="https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80",
        price_per_unit=58.0,
        unit="kg",
        available_quantity=2400.0,
        harvest_date="This Week",
        location="Thanjavur, TN",
        quality_grade="Grade A+",
        status="published",
        distance_km=45.0
    )
    p3 = models.Product(
        farmer_id=f1_profile.id,
        category_id=c_veg.id,
        name="Salem Small Red Onions (Shallots)",
        description="Crisp and aromatic farm-fresh small red onions. Essential for authentic Indian cooking.",
        image_url="https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=600&q=80",
        price_per_unit=28.0,
        unit="kg",
        available_quantity=1200.0,
        harvest_date="2 Days Ago",
        location="Salem, TN",
        quality_grade="Grade A",
        status="published",
        distance_km=22.0
    )
    p4 = models.Product(
        farmer_id=f3_profile.id,
        category_id=c_fruits.id,
        name="Salem Alphonso Mangoes",
        description="Hand-picked carbide-free sweet Alphonso mangoes from Yercaud foothills. Rich aroma and vibrant golden pulp.",
        image_url="https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=600&q=80",
        price_per_unit=140.0,
        unit="kg",
        available_quantity=450.0,
        harvest_date="Today",
        location="Salem, TN",
        quality_grade="Grade A+",
        status="published",
        distance_km=30.0
    )
    p5 = models.Product(
        farmer_id=f3_profile.id,
        category_id=c_fruits.id,
        name="Fresh Cavendish Bananas",
        description="Naturally ripened yellow Cavendish bananas. Packed with potassium and natural sweetness.",
        image_url="https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=600&q=80",
        price_per_unit=26.0,
        unit="kg",
        available_quantity=950.0,
        harvest_date="Yesterday",
        location="Salem, TN",
        quality_grade="Grade A",
        status="published",
        distance_km=28.0
    )
    p6 = models.Product(
        farmer_id=f3_profile.id,
        category_id=c_fruits.id,
        name="Pollachi Sweet Tender Coconut",
        description="Refreshing green tender coconuts with rich coconut water and tender meat. Sourced from Pollachi groves.",
        image_url="https://images.unsplash.com/photo-1543362906-acfc16c67564?auto=format&fit=crop&w=600&q=80",
        price_per_unit=42.0,
        unit="piece",
        available_quantity=600.0,
        harvest_date="Today",
        location="Coimbatore, TN",
        quality_grade="Grade A+",
        status="published",
        distance_km=18.5
    )

    db.add_all([p1, p2, p3, p4, p5, p6])
    db.commit()

    # 6. ORDERS & ORDER ITEMS
    o1 = models.Order(
        order_number="FD-2026-98401",
        buyer_id=b1_profile.id,
        total_amount=16000.0,
        delivery_fee=350.0,
        status="In Transit",
        delivery_address="FreshMart Hyperlocal Warehouse, RS Puram, Coimbatore - 641002",
        payment_method="UPI Direct",
        payment_status="Paid"
    )
    db.add(o1)
    db.commit()

    oi1 = models.OrderItem(order_id=o1.id, product_id=p1.id, quantity=500.0, unit_price=32.0, total_price=16000.0)
    db.add(oi1)

    # 7. DELIVERY TRACKING
    dt1 = models.DeliveryTracking(
        order_id=o1.id,
        driver_name="Ramesh Kumar (AgroExpress Fleet)",
        driver_phone="+91 98765 43210",
        vehicle_number="TN 59 AB 2024",
        current_status="In Transit (Near Dindigul Toll Plaza)",
        origin_location="Madurai Farm Hub",
        destination_location="Coimbatore FreshMart Store",
        progress_percentage=68.0,
        estimated_delivery="Today, 5:30 PM"
    )
    db.add(dt1)

    # 8. NOTIFICATIONS
    n1 = models.Notification(
        user_id=user_farmer1.id,
        title="New Order Received!",
        message="Buyer FreshMart Supermarkets placed an order for 500 kg Country Tomatoes.",
        type="order"
    )
    n2 = models.Notification(
        user_id=user_farmer1.id,
        title="AI Price Alert",
        message="Market demand for Tomatoes in Coimbatore is predicted to increase by 12% next week.",
        type="price"
    )
    n3 = models.Notification(
        user_id=user_buyer1.id,
        title="Order Dispatch Alert",
        message="Order #FD-2026-98401 has been picked up from Madurai Farm and is now in transit.",
        type="delivery"
    )
    db.add_all([n1, n2, n3])

    # 9. REVIEWS
    r1 = models.Review(
        order_id=o1.id,
        farmer_id=f1_profile.id,
        buyer_id=b1_profile.id,
        product_id=p1.id,
        rating=5,
        comment="Outstanding fresh quality tomatoes delivered directly without damage. Saved 15% compared to wholesale middleman prices!"
    )
    db.add(r1)

    # 10. BUYER REQUIREMENTS FOR SMART MATCHING
    br1 = models.BuyerRequirement(
        buyer_id=b1_profile.id,
        crop_name="Fresh Country Tomatoes",
        required_quantity=600.0,
        preferred_price=34.0,
        location="Coimbatore",
        max_distance_km=60.0
    )
    br2 = models.BuyerRequirement(
        buyer_id=b2_profile.id,
        crop_name="Organic Sona Masoori Rice",
        required_quantity=2000.0,
        preferred_price=56.0,
        location="Chennai",
        max_distance_km=150.0
    )
    db.add_all([br1, br2])

    db.commit()
    print("Database successfully seeded with realistic Indian/Tamil Nadu agricultural data!")
    db.close()

if __name__ == "__main__":
    seed_db()
