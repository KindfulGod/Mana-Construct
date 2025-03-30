import React, { useState, useEffect } from 'react';

function SpellDurationL({ onDurationChange, isSelected }) {
    const [durations, setDurations] = useState({
        'Сек': '0',
        'Мин': '0',
        'Час': '0',
        'День': '0',
        'Месяц': '0',
        'Год': '0'
    });

    const durationCosts = {
        'Сек': {
            '6': 600, '12': 750, '18': 900, '24': 1050, '30': 1200,
            '36': 1350, '42': 1500, '48': 1650, '54': 1800
        },
        'Мин': Object.fromEntries(
            Array.from({ length: 59 }, (_, i) => [`${i + 1}`, 1950 + i * 150])
        ),
        'Час': Object.fromEntries(
            Array.from({ length: 23 }, (_, i) => [`${i + 1}`, 10800 + i * 600])
        ),
        'День': Object.fromEntries(
            Array.from({ length: 30 }, (_, i) => [`${i + 1}`, 24000 + i * 1500])
        ),
        'Месяц': Object.fromEntries(
            Array.from({ length: 11 }, (_, i) => [`${i + 1}`, 72000 + i * 12000])
        ),
        'Год': Object.fromEntries(
            Array.from({ length: 10 }, (_, i) => [`${i + 1}`, 210000 + i * 15000])
        )
    };

    const handleDurationToggle = () => {
        if (!isSelected) {
            onDurationChange(calculateDurationCost());
        } else {
            onDurationChange(0);
        }
    };

    const handleDurationChange = (type, value) => {
        const newDurations = { ...durations, [type]: value };
        setDurations(newDurations);
        
        if (isSelected) {
            const cost = calculateDurationCost(newDurations);
            onDurationChange(cost);
        }
    };

    const calculateDurationCost = (currentDurations = durations) => {
        return Object.entries(currentDurations).reduce((totalCost, [type, value]) => {
            const typeCosts = durationCosts[type];
            return totalCost + (typeCosts[value] || 0);
        }, 0);
    };

    const formatDuration = () => {
        return `s:${durations['Сек']} сек, m:${durations['Мин']} мин, h:${durations['Час']} час, d:${durations['День']} дней, m:${durations['Месяц']} мес, y:${durations['Год']} лет`;
    };

    useEffect(() => {
        if (!isSelected) {
            setDurations({
                'Сек': '0',
                'Мин': '0',
                'Час': '0',
                'День': '0',
                'Месяц': '0',
                'Год': '0'
            });
        }
    }, [isSelected]);

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={handleDurationToggle}
                />
                <span style={{ marginLeft: '10px' }}>
                    Длительность 
                    <span 
                        style={{ cursor: 'help' }} 
                        title="Сильный Эффект"
                    >
                        L
                    </span>
                </span>
            </div>
            {isSelected && (
                <div style={{ marginLeft: '20px', display: 'flex', flexDirection: 'column' }}>
                    {Object.keys(durationCosts).map((type) => (
                        <div key={type} style={{ marginTop: '10px', display: 'flex', alignItems: 'center' }}>
                            <label style={{ width: '60px' }}>{type}:</label>
                            <select
                                value={durations[type]}
                                onChange={(e) => handleDurationChange(type, e.target.value)}
                                style={{ marginRight: '10px' }}
                            >
                                <option value="0">0</option>
                                {Object.keys(durationCosts[type]).map((value) => (
                                    <option key={value} value={value}>{value}</option>
                                ))}
                            </select>
                            <span>Стоимость: {durationCosts[type][durations[type]] || 0} маны</span>
                        </div>
                    ))}
                    <p style={{ marginTop: '10px' }}>{formatDuration()}</p>
                </div>
            )}
            {isSelected && <p style={{ marginTop: '10px' }}>Общая стоимость: {calculateDurationCost()} маны</p>}
        </div>
    );
}

export default SpellDurationL;
