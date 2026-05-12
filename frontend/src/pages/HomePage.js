import React, { useState, useEffect } from "react";
// 食材の一覧リストのコンポーネント
import FoodList from '../components/FoodList';
// 食材追加フォームのコンポーネント
import FoodForm from '../components/FoodForm';

function HomePage({ onLogout }) {
    // 食材管理用ステート
    const [foods, setFoods] = useState([]);

    // コンポーネントのマウント後に食材の一覧リストを取得（第2引数を空にすることで初回レンダリング時のみ実行）
    useEffect(() => {
        fetchFoods();
    }, []);

    // 食材の一覧リストを取得
    const fetchFoods = async () => {
        const response = await fetch('/api/foods');
        if (response.ok) {
            const data = await response.json();
            setFoods(data);
        }
    };

    // 食材の追加
    const handleAddFood = async (food) => {
        const response = await fetch('/api/foods', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(food)
        });

        if (response.ok) {
            fetchFoods();
        }
    };

    // 食材の削除
    const handleDeleteFood = async (id) => {
        const response = await fetch(`/api/foods/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            // 削除した食材は一覧リストから除外
            setFoods(foods.filter(food => food.id !== id));
        }
    };

    return (
        <div className="home-page">
            <h2>食材の番人</h2>
            <button className="logout" onClick={onLogout}>冷蔵庫の扉を閉める</button>
            <hr />
            <h3>食材の護衛を依頼</h3>
            <FoodForm onAddFood={handleAddFood} />
            <hr />
            <h3>護衛中の食材</h3>
            <FoodList foods={foods} onDeleteFood={handleDeleteFood} />
        </div>
    );
}

export default HomePage;