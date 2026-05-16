import React from "react";

// 食材の項目
function FoodItem({ food, onDelete , onFreeze}) {

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
        <div className={`food-item ${food.frozen ? 'frozen' : ''}`}>
            <h3 className="food-name">{food.name}</h3>
            <p className={`food-expiration ${getExpirationClass(food.expiration_date)}`}>期限: {food.expiration_date}</p>
            {/* 冷凍中は文言を表示、こう書かないと0が画面表示される */}
            {food.frozen === 1 && (
                <p className="food-frozen">冷凍中</p>
            )}
            {/* 冷凍後は冷凍ボタンを非表示 */}
            {!food.frozen && (
                <button className="freeze" onClick={onFreeze}>凍ってらっしゃい</button>
            )}
            <button className="delete" onClick={onDelete}>ごちそうさま</button>
        </div>
    );
}

export default FoodItem;