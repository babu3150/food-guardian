import React, {useState} from "react";

function FreshnessPage({ onLogout, onMoveFreshness }) {
    const [food, setFood] = useState('');
    const [answer, setAnswer] = useState('');

    const handleAsk = async () => {
        const response = await fetch('/api/freshness', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({food})
        });

        const data = await response.json();
        setAnswer(data.answer);
    };

    return (
        <div className="freshness-page">
            <header className="header">
                <h2 className="header-title">食材の番人</h2>

                <div className="header-buttons">
                    <button className="ai" onClick={onMoveFreshness}>AI食材相談室</button>
                    <button className="logout" onClick={onLogout}>冷蔵庫の扉を閉める</button>
                </div>
            </header>
            <div>
                <h2>AI鮮度チェック</h2>
                <input type="text" value={food} onChange={(e) => setFood(e.target.value)} placeholder="食材名を入力せよ" />
                <button onClick={handleAsk}>問い合わせる</button>
                <p>{answer}</p>
            </div>
        </div>
    );
}

export default FreshnessPage;