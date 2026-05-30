import React, { useState, useEffect } from "react";
// 食材の一覧リストのコンポーネント
import FoodList from '../components/FoodList';
// 食材追加フォームのコンポーネント
import FoodForm from '../components/FoodForm';

function HomePage({ onLogout, onMoveFoodAdvisor }) {
    // 食材管理用ステート
    const [foods, setFoods] = useState([]);
    // メモ管理用ステート
    const [memo, setMemo] = useState('');
    // メモ保存判定用ステート
    const [memoSaved, setMemoSaved] = useState(false);

    // コンポーネントのマウント後に食材の一覧リスト、メモを取得（第2引数を空にすることで初回レンダリング時のみ実行）
    useEffect(() => {
        fetchFoods();
        fetchMemo();
    }, []);

    // 食材の一覧リストを取得
    const fetchFoods = async () => {
        const response = await fetch('/api/foods');
        if (response.ok) {
            const data = await response.json();
            setFoods(data);
        }
    };

    // メモを取得
    const fetchMemo = async () => {
        const response = await fetch('/api/memo');
        if (response.ok) {
            const data = await response.json();
            setMemo(data.memo)
        }
    }

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

    // メモの編集
    const handleChangeMemo = async (e) => {
        const newMemo = e.target.value;
        setMemo(newMemo);
        await fetch('/api/memo', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                memo: newMemo
            })
        });
    };

    // メモの保存
    const handleSaveMemo = async () => {
        const response = await fetch('/api/memo', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                memo
            })
        });

        if (response.ok) {
            setMemoSaved(true);
            setTimeout(() => {
                setMemoSaved(false);
            }, 2500);
        }
    }

    return (
        <div className="home-page">
            <header className="header">
                <h2 className="header-title">食材の番人</h2>
                <div className="header-buttons">
                    <button className="ai" onClick={onMoveFoodAdvisor}>AI食材相談室</button>
                    <button className="logout" onClick={onLogout}>冷蔵庫の扉を閉める</button>
                </div>
            </header>

            <div className="food-form">
                <div className="section-title">
                    <h2>食材の護衛を依頼</h2>
                </div>
                <FoodForm onAddFood={handleAddFood} />
            </div>

            <div className="memo-area">
                <div className="section-title">
                    <h2>備忘録</h2>
                </div>
                <div className="memo-textarea-wrapper">
                    <textarea className="memo-textarea" value={memo} onChange={handleChangeMemo} placeholder="買い足す食材や忘れてはならぬことを書かれよ" />
                    {memoSaved && (
                        <p className="memo-saved-message">保存したぞよ</p>
                    )}
                </div>
                <div className="memo-button-area">
                    <button className="memo-save-button" onClick={handleSaveMemo}>忘れぬよう保存</button>
                </div>
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