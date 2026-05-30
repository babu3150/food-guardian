import React from "react";
import FoodItem from "./FoodItem";

function FoodList({ foods, onDeleteFood, onFreezeFood }) {
  return (
    <div className="food-list">
      {foods.map((food) => (
        <FoodItem
          key={food.id}
          food={food}
          onDelete={() => onDeleteFood(food.id)}
          onFreeze={() => onFreezeFood(food.id)}
        />
      ))}
    </div>
  );
}

export default FoodList;
