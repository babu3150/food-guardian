import React from "react";

// 食材の項目
function FoodItem({ food, onDelete }) {
    return (
        <div className="food-item">
            <h3 className="food-name">{food.name}</h3>
            <p className="food-expiration">期限: {food.expiration_date}</p>
            <button className="delete" onClick={onDelete}>ごちそうさま</button>
        </div>
    );
}

export default FoodItem;