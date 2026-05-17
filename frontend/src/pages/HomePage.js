import React, { useState, useEffect } from "react";
// 食材の一覧リストのコンポーネント
import FoodList from '../components/FoodList';
// 食材追加フォームのコンポーネント
import FoodForm from '../components/FoodForm';

function HomePage({ onLogout, onMoveFreshness }) {
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

    // 食材の冷凍
    const handleFreezeFood = async (id) => {
        const response = await fetch(`/api/foods/${id}/freeze`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            fetchFoods();
        }
    };

    return (
        <div className="home-page">
            <header className="header">
                <h2 className="header-title">食材の番人</h2>
                <button onClick={onMoveFreshness}>AIに問い合わせる</button>
                <button onClick={onLogout}>冷蔵庫の扉を閉める</button>
            </header>
            <div className="food-form">
                <div className="section-title">
                    <h2>食材の護衛を依頼</h2>
                </div>
                <FoodForm onAddFood={handleAddFood} />
            </div>
            <div>
                <div className="section-title">
                    <h2>護衛中の食材</h2>
                </div>
            </div>
            <FoodList foods={foods} onDeleteFood={handleDeleteFood} onFreezeFood={handleFreezeFood} />
        </div>
    );
}

export default HomePage;