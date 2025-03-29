import React, { useState, useEffect, useCallback } from 'react';
import { calculateMana } from "./ManaStat";
import DruidDetails from './ClassDetails/DruidDetails';
import SorcererDetails from './ClassDetails/SorcererDetails';
import SpellCreation from './SpellCreation';
import SpellDiscount from './SpellCreationDetails/SpellDiscount';

const manaColors = {
    'sorcerer': '#660099',
    'wizard': 'blue',
    'cleric': 'gold',
    'paladin': 'silver',
    'druid': '#00ff00',
    'bard': '#ff34ff',
    'warlock': '#B00000'
};

function CharacterDetails({ character, onBack }) {
    const maxLevel = 20;
    const [currentMana, setCurrentMana] = useState(0);
    const [currentLevel, setCurrentLevel] = useState(character.level);
    const [maxMana, setMaxMana] = useState(calculateMana(character.class, character.level));
    const [manaPercentage, setManaPercentage] = useState(0);
    const [syncMana, setSyncMana] = useState(false);
    const [isManaRefundEnabled, setIsManaRefundEnabled] = useState(false);
    const [refundPercentage, setRefundPercentage] = useState('25');
    const [spellList, setSpellList] = useState([]);
    const [discounts, setDiscounts] = useState({
        damage: null,
        save: null,
        range: null,
        duration: null,
        aoe: null
    });
    const [manaCostPercentage, setManaCostPercentage] = useState(0);

    const manaColor = manaColors[character.class] || 'blue';

    const updateMana = useCallback((regenerationAmount) => {
        setCurrentMana((prevMana) => Math.min(maxMana, prevMana + regenerationAmount));
    }, [maxMana]);

    const handleManaChange = useCallback((e) => {
        const newMana = parseInt(e.target.value);
        if (isNaN(newMana)) {
            setCurrentMana(0);
        } else {
            setCurrentMana(Math.max(0, Math.min(newMana, maxMana)));
        }
    }, [maxMana]);

    const handleLevelChange = useCallback((e) => {
        const input = e.target;
        let newLevel = parseInt(input.value);

        if (isNaN(newLevel) || newLevel < 1) {
            newLevel = 1;
        } else if (newLevel > maxLevel) {
            newLevel = maxLevel;
        }

        setCurrentLevel(newLevel);
        setMaxMana(calculateMana(character.class, newLevel));
    }, [character.class]);

    const handleSyncManaChange = useCallback(() => {
        setSyncMana(prevSyncMana => !prevSyncMana);
    }, []);

    const handleManaRefundToggle = useCallback(() => {
        setIsManaRefundEnabled(prevIsManaRefundEnabled => !prevIsManaRefundEnabled);
    }, []);

    const handleRefundPercentageChange = useCallback((e) => {
        setRefundPercentage(e.target.value);
    }, []);

    const handleUseSpell = useCallback((spellCost, discounts) => {
        console.log('CharacterDetails: Получена стоимость без маны:', spellCost);

        let refundAmount = 0;
        let totalCost = spellCost; // Начальная стоимость

        if (character.class === 'wizard' && isManaRefundEnabled) {
            refundAmount = spellCost * (parseInt(refundPercentage) / 100);
            totalCost = spellCost + refundAmount; // Увеличиваем стоимость только если включен параметр "Мана"
            console.log('CharacterDetails: Добавлена стоимость маны:', refundAmount);
        }

        console.log('CharacterDetails: Общая стоимость с маной:', totalCost);

        setCurrentMana((prevMana) => Math.max(0, prevMana - totalCost));

        const newSpell = {
            id: Date.now(),
            spellCost: spellCost,
            refundAmount: refundAmount,
            totalCost: totalCost,
            discounts: discounts
        };

        setSpellList(prevSpellList => [...prevSpellList, newSpell]);
    }, [character.class, isManaRefundEnabled, refundPercentage]);

    const handleRefundMana = useCallback((id) => {
        const spellToRefund = spellList.find(spell => spell.id === id);

        if (spellToRefund && character.class === 'wizard') {
            const refundAmount = spellToRefund.refundAmount;
            setCurrentMana((prevMana) => Math.min(maxMana, prevMana + refundAmount));

            setSpellList(prevSpellList => prevSpellList.filter(spell => spell.id !== id));
        }
    }, [character.class, maxMana, spellList]);

    const handleFailSpell = useCallback((id) => {
        setSpellList(prevSpellList => prevSpellList.filter(spell => spell.id !== id));
    }, []);

    const handleSelectDiscount = useCallback((type, discount) => {
        setDiscounts(prevDiscounts => ({ ...prevDiscounts, [type]: discount }));
    }, []);

    useEffect(() => {
        setManaPercentage((currentMana / maxMana) * 100);
    }, [currentMana, maxMana]);

    useEffect(() => {
        if (syncMana) {
            setCurrentMana(maxMana);
        }
    }, [syncMana, maxMana]);

    useEffect(() => {
        if (['paladin', 'cleric', 'warlock', 'bard', 'druid'].includes(character.class)) {
            setCurrentMana(0);
        } else {
            setCurrentMana(character.mana);
        }
        setMaxMana(calculateMana(character.class, character.level));
    }, [character.class, character.level, character.mana]);

    useEffect(() => {
        if (character.class === 'wizard' && isManaRefundEnabled) {
            setManaCostPercentage(parseInt(refundPercentage) / 100);
        } else {
            setManaCostPercentage(0);
        }
    }, [character.class, isManaRefundEnabled, refundPercentage]);

    const renderClassDetails = () => {
        switch (character.class) {
            case 'druid':
                return <DruidDetails character={character} onBack={onBack} updateMana={updateMana} maxMana={maxMana} />;
            case 'sorcerer':
                return <SorcererDetails character={character} onBack={onBack} updateMana={updateMana} maxMana={maxMana} />;
            default:
                return null;
        }
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center'
        }}>
            <div style={{
                width: '60%',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <h2>Детали персонажа</h2>
                <p>Имя: {character.name}</p>
                <p>Класс: {character.class}</p>
                <p>Уровень:
                    <input
                        type="number"
                        value={currentLevel}
                        onInput={handleLevelChange}
                        min={1}
                        max={maxLevel}
                    />
                </p>
                <p>
                    Синхронизировать ману с уровнем:
                    <input
                        type="checkbox"
                        checked={syncMana}
                        onChange={handleSyncManaChange}
                    />
                </p>
                {renderClassDetails()}
                <div style={{
                    position: 'relative',
                    width: '300px',
                    height: '40px',
                    backgroundColor: 'black',
                    borderRadius: '10px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: 'hidden'
                }}>
                    <div style={{
                        width: `${manaPercentage}%`,
                        backgroundColor: manaColor,
                        height: '100%',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        borderRadius: '10px 0 0 10px'
                    }} />
                    <span style={{ zIndex: 1 }}>
                        <input
                            type="text"
                            value={currentMana}
                            onChange={handleManaChange}
                            style={{
                                width: '60px',
                                border: 'none',
                                backgroundColor: 'transparent',
                                color: 'white',
                                fontSize: '18px',
                                textAlign: 'right',
                                padding: '0 5px',
                                boxShadow: 'none',
                                outline: 'none'
                            }}
                        />
                        <span style={{
                            color: 'white',
                            fontSize: '18px',
                            padding: '0 5px'
                        }}>
                            / {maxMana}
                        </span>
                    </span>
                </div>
                {spellList.length > 0 && (
                    <div style={{ marginTop: '20px' }}>
                        <h3>Последнее Заклинание:</h3>
                        <p>
                            Общая стоимость: {spellList[spellList.length - 1].totalCost}
                        </p>
                    </div>
                )}
                {spellList.map((spell, index) => (
                    <div key={spell.id} style={{ marginTop: '10px' }}>
                        {index + 1}. Сумма возврата: {character.class === 'wizard' && isManaRefundEnabled ? spell.refundAmount : 0}
                        <button
                            style={{
                                padding: '5px 10px',
                                backgroundColor: '#4CAF50',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                marginLeft: '10px'
                            }}
                            onClick={() => handleRefundMana(spell.id)}
                        >
                            Возврат
                        </button>
                        <button
                            style={{
                                padding: '5px 10px',
                                backgroundColor: '#f44336',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                marginLeft: '10px'
                            }}
                            onClick={() => handleFailSpell(spell.id)}
                        >
                            Неудача
                        </button>
                    </div>
                ))}
                <button style={{
                    width: 'auto',
                    display: 'block',
                    margin: 'auto'
                }} onClick={onBack}>Назад к списку</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start'
                }}>
                    <SpellCreation
                        onUseSpell={(spellCost, discounts) => handleUseSpell(spellCost, discounts)}
                        manaCost={manaCostPercentage}
                        onSelectDiscount={handleSelectDiscount}
                    />
                    <SpellDiscount onSelectDiscount={handleSelectDiscount} />
                </div>
                {character.class === 'wizard' && (
                    <div style={{ marginTop: '10px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                            <input
                                type="checkbox"
                                checked={isManaRefundEnabled}
                                onChange={handleManaRefundToggle}
                            />
                            <span style={{ marginLeft: '10px' }}>
                                Мана
                            </span>
                        </div>
                        {isManaRefundEnabled && (
                            <div style={{ marginLeft: '20px', display: 'flex', alignItems: 'center' }}>
                                <label htmlFor="refundPercentage" style={{ marginRight: '10px' }}>Процент возврата:</label>
                                <select
                                    id="refundPercentage"
                                    value={refundPercentage}
                                    onChange={handleRefundPercentageChange}
                                    style={{ marginRight: '10px' }}
                                >
                                    <option value="25">25%</option>
                                    <option value="50">50%</option>
                                    <option value="75">75%</option>
                                </select>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default CharacterDetails;
