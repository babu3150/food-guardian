import React, { useState } from "react";

function FoodForm({ onAddFood }) {
    // 食材、期限、数量のステートを定義
    const [name, setName] = useState('');
    const [expiration_date, setExpirationDate] = useState('');
    const [quantity, setQuantity] = useState('');

    // フォーム送信時に実行
    const handleSubmit = (e) => {
        // デフォルトのフォーム送信をキャンセル
        e.preventDefault();
        const newFood = { name, expiration_date, quantity };
        onAddFood(newFood);
        // フォーム送信後に3つの入力欄を空にする
        setName('');
        setExpirationDate('');
        setQuantity('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="食材" required />
            <input type="date" value={expiration_date} onChange={(e) => setExpirationDate(e.target.value)} placeholder="期限" required />
            <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="数量" required />
            <button type="submit">食材の追加</button>
        </form>
    );
}

export default FoodForm;