import React, { useState, useEffect } from 'react';

function SpellDurationS({ onDurationChange, isSelected }) {
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
            '6': 100, '12': 125, '18': 150, '24': 175, '30': 200,
            '36': 225, '42': 250, '48': 275, '54': 300
        },
        'Мин': Object.fromEntries(
            Array.from({ length: 59 }, (_, i) => [`${i + 1}`, 325 + i * 25])
        ),
        'Час': Object.fromEntries(
            Array.from({ length: 23 }, (_, i) => [`${i + 1}`, 1800 + i * 100])
        ),
        'День': Object.fromEntries(
            Array.from({ length: 30 }, (_, i) => [`${i + 1}`, 4000 + i * 250])
        ),
        'Месяц': Object.fromEntries(
            Array.from({ length: 11 }, (_, i) => [`${i + 1}`, 12000 + i * 2000])
        ),
        'Год': Object.fromEntries(
            Array.from({ length: 10 }, (_, i) => [`${i + 1}`, 35000 + i * 2500])
        )
    };

    const handleDurationToggle = () => {
        if (!isSelected) {
            // При активации передаем текущую стоимость
            onDurationChange(calculateDurationCost());
        } else {
            // При деактивации передаем 0
            onDurationChange(0);
        }
    };

    const handleDurationChange = (type, value) => {
        const newDurations = { ...durations, [type]: value };
        setDurations(newDurations);
        
        if (isSelected) {
            // Обновляем стоимость только если компонент активен
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
            // Сбрасываем значения при деактивации
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
                        title="Слабый Эффект"
                    >
                        С
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

export default SpellDurationS;
