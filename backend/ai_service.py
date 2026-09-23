import random
import math

# Baseline market pricing repository for Indian agricultural produce (in INR per Kg)
BASE_PRICES = {
    "Tomato": {"base": 34.0, "volatility": 6.5, "unit": "kg", "category": "Vegetables"},
    "Onion": {"base": 28.5, "volatility": 4.0, "unit": "kg", "category": "Vegetables"},
    "Sona Masoori Rice": {"base": 58.0, "volatility": 3.0, "unit": "kg", "category": "Grains"},
    "Red Onion": {"base": 32.0, "volatility": 5.0, "unit": "kg", "category": "Vegetables"},
    "Alphonso Mango": {"base": 140.0, "volatility": 15.0, "unit": "kg", "category": "Fruits"},
    "Cavendish Banana": {"base": 26.0, "volatility": 2.5, "unit": "kg", "category": "Fruits"},
    "Tender Coconut": {"base": 42.0, "volatility": 3.5, "unit": "piece", "category": "Fruits"},
    "Potato": {"base": 22.0, "volatility": 2.0, "unit": "kg", "category": "Vegetables"},
    "Green Chilli": {"base": 48.0, "volatility": 8.0, "unit": "kg", "category": "Vegetables"},
    "Carrot": {"base": 45.0, "volatility": 5.0, "unit": "kg", "category": "Vegetables"},
}

LOCATION_FACTOR = {
    "Madurai": 1.02,
    "Thanjavur": 0.98,
    "Coimbatore": 1.05,
    "Salem": 1.00,
    "Chennai": 1.12,
    "Trichy": 0.99,
    "Erode": 1.01,
}

SEASON_FACTOR = {
    "Peak Season": 0.92,   # High supply -> lower base price, high volume
    "Off Season": 1.18,    # Low supply -> premium price
    "Monsoon": 1.08,
    "Current": 1.00
}

def predict_crop_price(crop: str, location: str, quantity: float, season: str = "Current"):
    crop_info = BASE_PRICES.get(crop, {"base": 35.0, "volatility": 5.0, "unit": "kg", "category": "Vegetables"})
    base_price = crop_info["base"]
    loc_mult = LOCATION_FACTOR.get(location, 1.0)
    season_mult = SEASON_FACTOR.get(season, 1.0)

    # Quantity volume discount model (larger supply yields slight bulk recommendation)
    qty_discount = 0.98 if quantity > 500 else 1.0

    predicted_price = round(base_price * loc_mult * season_mult * qty_discount, 2)
    recommended_price = round(predicted_price * 1.04, 2)
    current_market_price = round(predicted_price * 0.97, 2)

    min_range = round(predicted_price * 0.90, 2)
    max_range = round(predicted_price * 1.12, 2)

    # Generate historical and future 6-week trend data
    historical_trend = []
    months = ["5 Wks Ago", "4 Wks Ago", "3 Wks Ago", "2 Wks Ago", "Last Wk", "Current Wk", "Next Wk (AI)", "In 2 Wks (AI)", "In 3 Wks (AI)"]
    
    # Deterministic pseudo-random curve based on crop hash
    seed = sum(ord(c) for c in crop)
    for i, m in enumerate(months):
        delta = math.sin(seed + i * 0.7) * crop_info["volatility"]
        val = max(10.0, round(predicted_price + delta, 2))
        historical_trend.append({"period": m, "price": val, "isPrediction": i >= 6})

    trend_direction = "Bullish (Rising)" if historical_trend[-1]["price"] >= historical_trend[5]["price"] else "Stable"

    return {
        "crop": crop,
        "location": location,
        "quantity": quantity,
        "unit": crop_info["unit"],
        "predicted_price": predicted_price,
        "recommended_selling_price": recommended_price,
        "current_market_price": current_market_price,
        "expected_price_range": f"₹{min_range} - ₹{max_range} per {crop_info['unit']}",
        "min_price": min_range,
        "max_price": max_range,
        "price_trend": trend_direction,
        "confidence_score": 94.5,
        "trend_data": historical_trend,
        "insights": [
            f"Direct farmgate sale bypasses 3 middleman layers saving up to 18% in commission.",
            f"Demand in {location} region is expected to rise by 8% over the next 14 days.",
            f"Recommended target buyers: Regional wholesalers & Supermarket chains."
        ]
    }

def forecast_demand(crop: str, location: str, time_period: str = "Next 30 Days"):
    crop_info = BASE_PRICES.get(crop, {"base": 35.0, "volatility": 5.0, "unit": "kg", "category": "Vegetables"})
    
    seed = sum(ord(c) for c in crop) + len(location)
    demand_score = round(70 + (seed % 28), 1) # e.g. 70 - 98
    
    if demand_score >= 85:
        demand_level = "High"
        recommended_qty = 1500
        trend = "Rapidly Increasing"
    elif demand_score >= 72:
        demand_level = "Medium"
        recommended_qty = 800
        trend = "Stable Growth"
    else:
        demand_level = "Low"
        recommended_qty = 400
        trend = "Moderate Demand"

    chart_data = []
    weeks = ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6"]
    for i, w in enumerate(weeks):
        factor = 1.0 + (i * 0.05) if demand_level == "High" else 1.0 + (math.cos(i) * 0.04)
        qty = int(recommended_qty * factor)
        chart_data.append({"week": w, "demand_index": round(demand_score * factor, 1), "expected_sales_kg": qty})

    return {
        "crop": crop,
        "location": location,
        "time_period": time_period,
        "demand_level": demand_level, # High, Medium, Low
        "demand_score": demand_score, # 0 - 100
        "demand_trend": trend,
        "recommended_quantity": f"{recommended_qty} {crop_info['unit']}",
        "market_absorption_rate": "92%",
        "forecast_chart": chart_data,
        "key_buyer_segments": ["Hyperlocal Grocery Networks", "Hotel & Catering Services", "Direct Retail Consumers"]
    }

def match_smart_buyers(crop_name: str, quantity: float, expected_price: float, location: str):
    # Simulated Smart Buyer Repository with heuristic match calculations
    sample_buyers = [
        {
            "id": 101,
            "name": "FreshMart Supermarket Chain",
            "type": "Retail Chain",
            "location": "Madurai Urban",
            "distance_km": 14.2,
            "required_crop": crop_name,
            "required_quantity": quantity * 1.1,
            "preferred_price": round(expected_price * 1.02, 2),
            "phone": "+91 94432 10987",
            "verified": True,
            "rating": 4.9
        },
        {
            "id": 102,
            "name": "Annapoorna Hospitality & Foods",
            "type": "Restaurant Network",
            "location": "Coimbatore Main",
            "distance_km": 38.5,
            "required_crop": crop_name,
            "required_quantity": quantity * 0.9,
            "preferred_price": round(expected_price * 1.05, 2),
            "phone": "+91 98421 88765",
            "verified": True,
            "rating": 4.8
        },
        {
            "id": 103,
            "name": "SouthAgro Wholesalers & Distributors",
            "type": "Wholesaler",
            "location": "Salem Agricultural Market",
            "distance_km": 25.0,
            "required_crop": crop_name,
            "required_quantity": quantity * 2.5,
            "preferred_price": round(expected_price * 0.98, 2),
            "phone": "+91 97890 12345",
            "verified": True,
            "rating": 4.7
        },
        {
            "id": 104,
            "name": "Organic Basket Direct",
            "type": "Direct Consumer Collective",
            "location": "Thanjavur Hub",
            "distance_km": 18.0,
            "required_crop": crop_name,
            "required_quantity": quantity * 0.7,
            "preferred_price": round(expected_price * 1.08, 2),
            "phone": "+91 91234 56789",
            "verified": True,
            "rating": 4.95
        }
    ]

    matches = []
    for b in sample_buyers:
        # Match calculation algorithm
        qty_diff = abs(b["required_quantity"] - quantity) / max(quantity, 1.0)
        price_diff = abs(b["preferred_price"] - expected_price) / max(expected_price, 1.0)
        dist_factor = min(b["distance_km"] / 100.0, 1.0)

        # Match score between 75% and 98%
        match_score = max(75.0, round(98.0 - (qty_diff * 10) - (price_diff * 15) - (dist_factor * 5), 1))

        b_copy = b.copy()
        b_copy["match_percentage"] = match_score
        matches.append(b_copy)

    # Sort descending by match percentage
    matches.sort(key=lambda x: x["match_percentage"], reverse=True)

    return {
        "crop": crop_name,
        "quantity": quantity,
        "expected_price": expected_price,
        "farmer_location": location,
        "total_matches_found": len(matches),
        "recommended_buyers": matches
    }
