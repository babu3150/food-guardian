import React from "react";
import FoodItem from './FoodItem';

function FoodList({ foods, onDeleteFood }) {
    return (
        <div>
            {foods.map((food) => (
                <FoodItem key={food.id} food={food} onDelete={() => onDeleteFood(food.id)} />
            ))}
        </div>
    );
}

export default FoodList;