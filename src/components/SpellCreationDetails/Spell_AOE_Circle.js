import React, { useState, useEffect } from 'react';

function SpellAOECircle({ onAOEChange, isSelected }) {
    const [radiusValue, setRadiusValue] = useState('');
    const [savedRadius, setSavedRadius] = useState(0);
    const [aoeCost, setAoeCost] = useState(0);

    const handleAOEToggle = () => {
        if (!isSelected) {
            onAOEChange(calculateAOECost());
        } else {
            onAOEChange(0);
        }
    };

    const handleRadiusChange = (e) => {
        const value = e.target.value.replace(/\D/g, '');
        setRadiusValue(value);
    };

    const handleSaveRadius = () => {
        const numericValue = parseInt(radiusValue) || 0;
        const roundedValue = Math.round(numericValue / 5) * 5;
        setSavedRadius(roundedValue);
        setRadiusValue(roundedValue.toString());
        
        if (isSelected) {
            const cost = calculateAOECost(roundedValue);
            onAOEChange(cost);
        }
    };

    const calculateAOECost = (radius = savedRadius) => {
        const baseCost = 0;
        const costPer5Units = 100;
        return baseCost + (radius / 5) * costPer5Units;
    };

    useEffect(() => {
        if (!isSelected) {
            setRadiusValue('');
            setSavedRadius(0);
        }
    }, [isSelected]);

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={handleAOEToggle}
                />
                <span style={{ marginLeft: '10px' }}>
                    Площадь 
                    <span style={{ cursor: 'pointer' }}>
                        <svg width="20" height="20" viewBox="0 0 20 20">
                            <circle cx="10" cy="10" r="9" stroke="#000" strokeWidth="2" fill="#fff" />
                        </svg>
                    </span>
                </span>
            </div>
            {isSelected && (
                <div style={{ marginLeft: '20px', display: 'flex', alignItems: 'center' }}>
                    <span style={{ marginRight: '10px' }}>Радиус:</span>
                    <input
                        type="text"
                        value={radiusValue}
                        onChange={handleRadiusChange}
                        style={{ width: '60px', marginRight: '10px', padding: '5px' }}
                        placeholder="0"
                    />
                    <button 
                        onClick={handleSaveRadius}
                        style={{
                            padding: '5px 10px',
                            backgroundColor: '#4CAF50',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Сохранить
                    </button>
                    <span style={{ marginLeft: '10px' }}>
                        Текущий: {savedRadius} футов
                    </span>
                    <span style={{ marginLeft: '20px' }}>
                        Стоимость: {calculateAOECost()} маны
                    </span>
                </div>
            )}
        </div>
    );
}

export default SpellAOECircle;
