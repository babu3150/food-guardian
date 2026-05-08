import React from "react";

// 食材の項目
function FoodItem({ food, onDelete }) {
    return (
        <div className="food-item">
            <h3>{food.name}</h3>
            <p>{food.expiration_date}</p>
            <p>{food.quantity}</p>
            <button className="delete" onClick={onDelete}>削除</button>
        </div>
    );
}

export default FoodItem;