import React, { useState, useEffect } from 'react';

function SpellAOELine({ onAOEChange, isSelected }) {
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
        const costPer5Units = 200;
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
                        <svg width="24" height="24" viewBox="0 0 24 24">
                            <path 
                                d="
                                    M 4 4 
                                    C 12 4 12 12 20 12
                                    M 20 20 
                                    C 12 20 12 12 4 12
                                " 
                                stroke="#000" 
                                strokeWidth="2" 
                                fill="none"
                                strokeLinecap="round"
                            />
                        </svg>
                    </span>
                </span>
            </div>
            {isSelected && (
                <div style={{ marginLeft: '20px', display: 'flex', alignItems: 'center' }}>
                    <span style={{ marginRight: '10px' }}>Длина линии:</span>
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
                        Текущая: {savedRadius} футов
                    </span>
                    <span style={{ marginLeft: '20px' }}>
                        Стоимость: {calculateAOECost()} маны
                    </span>
                </div>
            )}
        </div>
    );
}

export default SpellAOELine;
