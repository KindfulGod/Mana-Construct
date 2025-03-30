import React, { useState, useEffect } from "react";
import { calculateMana } from "./ManaStat";

function CharacterCreation({ onCreate, onBack }) {
    const [name, setName] = useState("");
    const [charClass, setCharClass] = useState("");
    const [level, setLevel] = useState(1);
    const [mana, setMana] = useState(0);
    const [error, setError] = useState("");

    useEffect(() => {
        if (charClass) {
            const calculatedMana = calculateMana(charClass, level);
            setMana(calculatedMana);
        }
    }, [charClass, level]);

    const handleCreate = () => {
        if (!name.trim()) {
            setError("Имя персонажа не может быть пустым");
            return;
        }
        if (!charClass) {
            setError("Выберите класс персонажа");
            return;
        }
        
        const characterData = {
            name: name.trim(),
            class: charClass,
            level,
            mana
        };
        setError("");
        onCreate(characterData);
    };

    return (
        <div>
            <h1>Создание персонажа</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="Имя персонажа" 
            />
            <select 
                value={charClass} 
                onChange={(e) => setCharClass(e.target.value)}
            >
                <option value="">Выбери класс</option>
                <option value="wizard">Волшебник</option>
                <option value="sorcerer">Чародей</option>
                <option value="cleric">Жрец</option>
                <option value="paladin">Паладин</option>
                <option value="druid">Друид</option>
                <option value="bard">Бард</option>
                <option value="warlock">Колдун</option>
            </select>
            <input 
                type="number" 
                value={level} 
                onChange={(e) => setLevel(Number(e.target.value))} 
                min={1} 
                max={20} 
                placeholder="Уровень"
            />
            <p>Мана: {mana}</p>
            <button onClick={handleCreate}>Создать персонажа</button>
            <button onClick={onBack}>Назад</button>
        </div>
    );
}

export default CharacterCreation;