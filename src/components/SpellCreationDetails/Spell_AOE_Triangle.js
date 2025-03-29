import React, { useState, useEffect } from 'react';

function SpellAOETriangle({ onAOEChange, isSelected }) {
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
            <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={handleAOEToggle}
                />
                <span style={{ marginLeft: '10px', display: 'flex', alignItems: 'center' }}>
                    Площадь 
                    <span style={{
    position: 'relative',
    display: 'inline-block'
}}>
    <span style={{
        position: 'absolute',
        top: '-4px',
        left: '-4px',
        width: '0',
        height: '0',
        borderLeft: '16px solid transparent',
        borderRight: '16px solid transparent',
        borderBottom: '32px solid #000', // Увеличена толщина и длина нижней стороны
        display: 'inline-block',
        zIndex: '0'
    }} />
    <span style={{
        cursor: 'pointer',
        width: '0',
        height: '0',
        borderLeft: '12px solid transparent',
        borderRight: '12px solid transparent',
        borderBottom: '24px solid #fff', // Белый треугольник остается прежним
        display: 'inline-block',
        position: 'relative',
        zIndex: '1'
    }} />
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

export default SpellAOETriangle;
