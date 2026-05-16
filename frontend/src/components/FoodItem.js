import React from "react";

// 食材の項目
function FoodItem({ food, onDelete }) {

    // 日付を判定
    function getExpirationClass(expirationDate) {
        const today = new Date();
        const expiration = new Date(expirationDate + 'T00:00:00');

        // 時刻は使用しないので削除
        today.setHours(0, 0, 0, 0);

        if (expiration < today) {
            return 'expired';
        }

        if (expiration.getTime() === today.getTime()) {
            return 'today';
        }

        return 'normal';
    }

    return (
        <div className="food-item">
            <h3 className="food-name">{food.name}</h3>
            <p className={`food-expiration ${getExpirationClass(food.expiration_date)}`}>期限: {food.expiration_date}</p>
            <button className="delete" onClick={onDelete}>ごちそうさま</button>
        </div>
    );
}

export default FoodItem;