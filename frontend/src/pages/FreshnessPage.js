import React, {useState} from "react";

function FreshnessPage({ onLogout, onMoveHome }) {
    const [food, setFood] = useState('');
    const [category, setCategory] = useState('freshness');
    const [loading, setLoading] = useState(false);
    const [answer, setAnswer] = useState('');

    const handleAsk = async () => {

        setLoading(true);

        const response = await fetch('/api/freshness', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({food, category})
        });

        const data = await response.json();
        setAnswer(data.answer);
        // フォーム送信後に入力欄を空にし、ロードアイコンを非表示にする
        setFood('');
        setLoading(false);
    };

    return (
        <div className="freshness-page">
            <header className="header">
                <h2 className="header-title">食材の番人</h2>

                <div className="header-buttons">
                    <button className="home" onClick={onMoveHome}>冷蔵庫の中に戻る</button>
                    <button className="logout" onClick={onLogout}>冷蔵庫の扉を閉める</button>
                </div>
            </header>
            <div className="freshness-content">
                {/* 左部分 */}
                <div className="freshness-form-area">
                    <div className="section-title">
                        <h2>AI食材相談室</h2>
                    </div>

                    <div className="category-tags">
                        <button className={category === 'freshness' ? 'active-tag' : '' } onClick={() => setCategory('freshness')}>🥬鮮度</button>
                        <button className={category === 'nutrition' ? 'active-tag' : '' } onClick={() => setCategory('nutrition')}>💪栄養</button>
                        <button className={category === 'recipe' ? 'active-tag' : '' } onClick={() => setCategory('recipe')}>🍳レシピ</button>
                    </div>

                    <input type="text" value={food} onChange={(e) => setFood(e.target.value)} placeholder="食材名を入力せよ" required/>
                    <button onClick={handleAsk} className="ask">問い合わせる</button>
                        <div className="ai-answer-area">
                            {loading ? (
                                <div className="loading-animation">
                                    <div className="loading-dot"></div>
                                    <div className="loading-dot"></div>
                                    <div className="loading-dot"></div>
                                </div>
                            ):(
                                <p>{answer || '遠慮せず聞きたまえよ'}</p>
                            )}
                        </div>
                </div>

                {/* 右部分 */}
                <div className="freshness-image-area">
                    <img src="/guardian-operator.png" alt="AI番人" className="freshness-image" />
                </div>
            </div>
        </div>
    );
}

export default FreshnessPage;