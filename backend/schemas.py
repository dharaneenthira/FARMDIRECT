from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime

# User Schemas
class UserRegister(BaseModel):
    name: str
    email: EmailStr
    phone: str
    password: str
    location: str
    role: str # farmer, buyer, admin

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: int
    name: str
    email: str
    phone: str
    role: str
    location: str
    status: str
    created_at: datetime

    class Config:
        from_attributes = True

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse

# Product Schemas
class ProductCreate(BaseModel):
    name: str
    category_id: int
    description: str
    image_url: Optional[str] = None
    price_per_unit: float
    unit: str = "kg"
    available_quantity: float
    harvest_date: str
    location: str
    quality_grade: str = "Grade A"
    status: str = "published"

class ProductResponse(BaseModel):
    id: int
    farmer_id: int
    category_id: int
    name: str
    description: Optional[str]
    image_url: Optional[str]
    price_per_unit: float
    unit: str
    available_quantity: float
    harvest_date: Optional[str]
    location: Optional[str]
    quality_grade: Optional[str]
    status: str
    distance_km: float
    created_at: datetime
    farmer_name: Optional[str] = "Farmer"
    farmer_rating: Optional[float] = 4.8

    class Config:
        from_attributes = True

# Order Schemas
class OrderItemCreate(BaseModel):
    product_id: int
    quantity: float

class OrderCreate(BaseModel):
    items: List[OrderItemCreate]
    delivery_address: str
    payment_method: str = "UPI"

# AI Schemas
class PricePredictionRequest(BaseModel):
    crop: str
    location: str
    quantity: float
    season: Optional[str] = "Current"

class DemandForecastRequest(BaseModel):
    crop: str
    location: str
    time_period: Optional[str] = "Next 30 Days"

class SmartBuyerMatchRequest(BaseModel):
    crop_name: str
    quantity: float
    expected_price: float
    location: str
