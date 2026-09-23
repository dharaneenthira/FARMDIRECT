import datetime
from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, ForeignKey, Text, Enum
from sqlalchemy.orm import relationship
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, index=True, nullable=False)
    phone = Column(String(20), nullable=False)
    hashed_password = Column(String(200), nullable=False)
    role = Column(String(20), nullable=False, default="farmer") # farmer, buyer, admin
    location = Column(String(100), nullable=False)
    status = Column(String(20), default="active") # active, pending, suspended
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    farmer_profile = relationship("FarmerProfile", back_populates="user", uselist=False)
    buyer_profile = relationship("BuyerProfile", back_populates="user", uselist=False)
    notifications = relationship("Notification", back_populates="user")
    sent_messages = relationship("Message", foreign_keys="Message.sender_id", back_populates="sender")
    received_messages = relationship("Message", foreign_keys="Message.receiver_id", back_populates="receiver")

class FarmerProfile(Base):
    __tablename__ = "farmer_profiles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True)
    farm_name = Column(String(100))
    farm_location = Column(String(100))
    farm_size_acres = Column(Float, default=5.0)
    crops_grown = Column(String(255))
    experience_years = Column(Integer, default=5)
    photo_url = Column(String(255))
    rating = Column(Float, default=4.8)
    total_sales = Column(Float, default=0.0)

    user = relationship("User", back_populates="farmer_profile")
    products = relationship("Product", back_populates="farmer")

class BuyerProfile(Base):
    __tablename__ = "buyer_profiles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True)
    business_name = Column(String(100))
    buyer_type = Column(String(50), default="retailer") # retailer, wholesaler, restaurant, consumer
    location = Column(String(100))
    photo_url = Column(String(255))

    user = relationship("User", back_populates="buyer_profile")
    orders = relationship("Order", back_populates="buyer")
    wishlist_items = relationship("Wishlist", back_populates="buyer")
    requirements = relationship("BuyerRequirement", back_populates="buyer")

class Category(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), unique=True, index=True)
    description = Column(String(255))
    image_url = Column(String(255))

    products = relationship("Product", back_populates="category")

class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    farmer_id = Column(Integer, ForeignKey("farmer_profiles.id"))
    category_id = Column(Integer, ForeignKey("categories.id"))
    name = Column(String(100), index=True, nullable=False)
    description = Column(Text)
    image_url = Column(String(255))
    price_per_unit = Column(Float, nullable=False)
    unit = Column(String(20), default="kg") # kg, ton, piece, box, dozen
    available_quantity = Column(Float, nullable=False)
    harvest_date = Column(String(50))
    location = Column(String(100))
    quality_grade = Column(String(20), default="Grade A") # Grade A+, Grade A, Grade B
    status = Column(String(20), default="published") # draft, published, sold_out
    distance_km = Column(Float, default=12.5)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    farmer = relationship("FarmerProfile", back_populates="products")
    category = relationship("Category", back_populates="products")
    order_items = relationship("OrderItem", back_populates="product")
    reviews = relationship("Review", back_populates="product")

class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    order_number = Column(String(50), unique=True, index=True)
    buyer_id = Column(Integer, ForeignKey("buyer_profiles.id"))
    total_amount = Column(Float, nullable=False)
    delivery_fee = Column(Float, default=50.0)
    status = Column(String(50), default="Order Placed") 
    # Order Placed -> Confirmed -> Preparing -> Picked Up -> In Transit -> Out for Delivery -> Delivered
    delivery_address = Column(Text, nullable=False)
    payment_method = Column(String(50), default="UPI") # UPI, Card, Cash on Delivery
    payment_status = Column(String(20), default="Paid") # Paid, Pending, Failed
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    buyer = relationship("BuyerProfile", back_populates="orders")
    items = relationship("OrderItem", back_populates="order")
    payment = relationship("Payment", back_populates="order", uselist=False)
    tracking = relationship("DeliveryTracking", back_populates="order", uselist=False)

class OrderItem(Base):
    __tablename__ = "order_items"

    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id"))
    product_id = Column(Integer, ForeignKey("products.id"))
    quantity = Column(Float, nullable=False)
    unit_price = Column(Float, nullable=False)
    total_price = Column(Float, nullable=False)

    order = relationship("Order", back_populates="items")
    product = relationship("Product", back_populates="order_items")

class Payment(Base):
    __tablename__ = "payments"

    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id"))
    transaction_id = Column(String(100), unique=True)
    payment_method = Column(String(50))
    amount = Column(Float, nullable=False)
    status = Column(String(20), default="Success")
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)

    order = relationship("Order", back_populates="payment")

class DeliveryTracking(Base):
    __tablename__ = "delivery_tracking"

    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id"))
    driver_name = Column(String(100), default="Ramesh Kumar (Agro Express)")
    driver_phone = Column(String(20), default="+91 98765 43210")
    vehicle_number = Column(String(30), default="TN 59 AB 2024")
    current_status = Column(String(50), default="In Transit")
    origin_location = Column(String(100), default="Madurai Farm Hub")
    destination_location = Column(String(100), default="Coimbatore Supermarket")
    progress_percentage = Column(Float, default=65.0)
    estimated_delivery = Column(String(50), default="Today, 5:30 PM")
    updated_at = Column(DateTime, default=datetime.datetime.utcnow)

    order = relationship("Order", back_populates="tracking")

class Message(Base):
    __tablename__ = "messages"

    id = Column(Integer, primary_key=True, index=True)
    sender_id = Column(Integer, ForeignKey("users.id"))
    receiver_id = Column(Integer, ForeignKey("users.id"))
    product_id = Column(Integer, ForeignKey("products.id"), nullable=True)
    text = Column(Text, nullable=False)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)
    is_read = Column(Boolean, default=False)

    sender = relationship("User", foreign_keys=[sender_id], back_populates="sent_messages")
    receiver = relationship("User", foreign_keys=[receiver_id], back_populates="received_messages")

class Notification(Base):
    __tablename__ = "notifications"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    title = Column(String(100), nullable=False)
    message = Column(Text, nullable=False)
    type = Column(String(50), default="info") # order, price, match, delivery, info
    is_read = Column(Boolean, default=False)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)

    user = relationship("User", back_populates="notifications")

class Review(Base):
    __tablename__ = "reviews"

    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id"), nullable=True)
    farmer_id = Column(Integer, ForeignKey("farmer_profiles.id"))
    buyer_id = Column(Integer, ForeignKey("buyer_profiles.id"))
    product_id = Column(Integer, ForeignKey("products.id"))
    rating = Column(Integer, nullable=False)
    comment = Column(Text)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    product = relationship("Product", back_populates="reviews")

class Wishlist(Base):
    __tablename__ = "wishlist"

    id = Column(Integer, primary_key=True, index=True)
    buyer_id = Column(Integer, ForeignKey("buyer_profiles.id"))
    product_id = Column(Integer, ForeignKey("products.id"))
    added_at = Column(DateTime, default=datetime.datetime.utcnow)

    buyer = relationship("BuyerProfile", back_populates="wishlist_items")

class BuyerRequirement(Base):
    __tablename__ = "buyer_requirements"

    id = Column(Integer, primary_key=True, index=True)
    buyer_id = Column(Integer, ForeignKey("buyer_profiles.id"))
    crop_name = Column(String(100), nullable=False)
    required_quantity = Column(Float, nullable=False)
    preferred_price = Column(Float, nullable=False)
    location = Column(String(100), nullable=False)
    max_distance_km = Column(Float, default=50.0)

    buyer = relationship("BuyerProfile", back_populates="requirements")
