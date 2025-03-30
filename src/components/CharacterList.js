import React from 'react';

function CharacterList({ characters, onSelect, onDelete, onBack, onChoose }) {
    return (
        <div>
            <h2>Выбор персонажа</h2>
            {characters.map((char) => (
                <div key={char.id} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc' }}>
                    <p>{char.name} – {char.class || "🚨 Класс не указан"} (Уровень {char.level})</p>
                    <button onClick={() => onSelect(char)}>Редактировать</button>
                    <button onClick={() => onDelete(char.id)}>Удалить</button>
                    <button onClick={() => onChoose(char)}>Выбрать</button>
                </div>
            ))}
            <button onClick={onBack} style={{ position: "absolute", bottom: 10, left: 10 }}>Назад</button>

            <button onClick={() => {
                console.log("🔍 Все персонажи:", characters);
                characters.forEach(c => console.log(`${c.name} - Класс: ${c.class}`));
            }}>
                Проверить классы
            </button>
        </div>
    );
}

export default CharacterList;