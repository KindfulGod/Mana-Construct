import React, { useState, useEffect } from 'react';

function SpellDistance({ onDistanceChange }) {
    const [isRangeEnabled, setIsRangeEnabled] = useState(false);
    const [rangeValue, setRangeValue] = useState('');
    const [savedRangeValue, setSavedRangeValue] = useState(0);
    const [rangeCost, setRangeCost] = useState(0);

    const handleRangeToggle = () => {
        setIsRangeEnabled(!isRangeEnabled);
    };

    const handleRangeValueChange = (e) => {
        const value = e.target.value;
        if (value === '' || !isNaN(value) && parseInt(value) > 0) {
            setRangeValue(value);
        }
    };

    const handleSaveRange = () => {
        const roundedValue = Math.floor(parseInt(rangeValue) / 5) * 5;
        setSavedRangeValue(roundedValue);
        calculateRangeCost(roundedValue);
    };

    const calculateRangeCost = (range) => {
        let cost = 0;
        if (range <= 30) {
            cost = Math.floor(range / 5) * 5;
        } else if (range <= 60) {
            cost = Math.floor(range / 5) * 10;
        } else if (range <= 100) {
            cost = Math.floor(range / 5) * 15;
        } else {
            cost = Math.floor(range / 5) * 20;
        }
        setRangeCost(cost);
        onDistanceChange(range, cost); // Передаём range и cost в родительский компонент
    };

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center'
        }}>
            <input
                type="checkbox"
                checked={isRangeEnabled}
                onChange={handleRangeToggle}
            />
            <span style={{ marginLeft: '10px' }}>Дальность</span>
            {isRangeEnabled && (
                <div style={{
                    marginLeft: '20px',
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    <input
                        type="number"
                        value={rangeValue}
                        onChange={handleRangeValueChange}
                        style={{
                            width: '70px',
                            marginRight: '5px'
                        }}
                    />
                    <button style={{
                        width: 'auto',
                        display: 'block',
                        margin: 'auto',
                        marginLeft: '5px'
                    }} onClick={handleSaveRange}>Сохранить</button>
                </div>
            )}
            {isRangeEnabled && <p style={{ marginLeft: '20px' }}>Стоимость: {rangeCost}</p>}
        </div>
    );
}

export default SpellDistance;
