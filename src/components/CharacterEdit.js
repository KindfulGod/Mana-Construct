import React, { useState, useEffect } from "react"; 
import { calculateMana } from "./ManaStat"; // Импортируем функцию расчёта маны

function CharacterEdit({ character, onSave, onBack }) {
    const [level, setLevel] = useState(character.level);
    const [charClass, setCharClass] = useState(character.class); // Добавляем стейт для класса
    const [mana, setMana] = useState(calculateMana(character.class, level)); // Изначальная манa на текущем уровне
    const [maxLevel, setMaxLevel] = useState(20); // Устанавливаем максимальный уровень (по умолчанию 20)

    useEffect(() => {
        const calculatedMana = calculateMana(charClass, level);
        setMana(calculatedMana);
    }, [charClass, level]);

    // При изменении класса меняем максимальный уровень
    useEffect(() => {
        const newMaxLevel = 20; // Можно изменить это условие, чтобы для каждого класса был свой лимит
        setMaxLevel(newMaxLevel); 
        setLevel(1); // Можно сбрасывать уровень на 1, если изменяется класс
    }, [charClass]);

    return (
        <div>
            <h2>Редактирование персонажа</h2>
            <p>Имя: {character.name}</p>

            {/* Добавляем выпадающий список для выбора класса */}
            <label>
                Класс:
                <select 
                    value={charClass} 
                    onChange={(e) => setCharClass(e.target.value)} // Обновляем класс при изменении
                >
                    <option value="sorcerer">Чародей</option>
                    <option value="wizard">Волшебник</option>
                    <option value="cleric">Жрец</option>
                    <option value="paladin">Паладин</option>
                    <option value="druid">Друид</option>
                    <option value="bard">Бард</option>
                    <option value="warlock">Колдун</option>
                </select>
            </label>

            <label>
                Уровень:
                <select 
                    value={level} 
                    onChange={(e) => setLevel(parseInt(e.target.value))}
                >
                    {[...Array(maxLevel)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                    ))}
                </select>
            </label>

            <p>Мана на уровне {level}: {mana}</p> {/* Показываем ману для текущего уровня */}

            <button onClick={() => onSave({ ...character, class: charClass, level, mana })}>Сохранить</button>
            <button onClick={onBack} style={{ position: "absolute", bottom: 10, left: 10 }}>Назад</button>
        </div>
    );
}

export default CharacterEdit;