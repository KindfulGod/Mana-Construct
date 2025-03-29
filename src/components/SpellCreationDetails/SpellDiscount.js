import React, { useState } from 'react';

function SpellDiscount({ onSelectDiscount }) {
    const [discounts, setDiscounts] = useState({
        damage: null,
        save: null,
        range: null,
        duration: null,
        aoe: null,
    });

    const handleSelectDiscount = (type, discount) => {
        setDiscounts({ ...discounts, [type]: discount });
        onSelectDiscount(type, discount);
    };

    return (
        <div>
            <h3>Скидка</h3>
            <div style={{ marginBottom: '10px' }}>
                <input
                    type="checkbox"
                    id="damage-discount"
                    onChange={() => handleSelectDiscount('damage', discounts.damage === null ? 0 : null)}
                />
                <span style={{ marginLeft: '10px' }}>Урон</span>
                {discounts.damage !== null && (
                    <select
                        value={discounts.damage || 0}
                        onChange={(e) => handleSelectDiscount('damage', parseInt(e.target.value))}
                        style={{ marginLeft: '10px' }}
                    >
                        {Array.from({ length: 21 }, (_, i) => i * 5).map((value) => (
                            <option key={value} value={value}>{value}%</option>
                        ))}
                    </select>
                )}
            </div>
            <div style={{ marginBottom: '10px' }}>
                <input
                    type="checkbox"
                    id="save-discount"
                    onChange={() => handleSelectDiscount('save', discounts.save === null ? 0 : null)}
                />
                <span style={{ marginLeft: '10px' }}>Спасбросок</span>
                {discounts.save !== null && (
                    <select
                        value={discounts.save || 0}
                        onChange={(e) => handleSelectDiscount('save', parseInt(e.target.value))}
                        style={{ marginLeft: '10px' }}
                    >
                        {Array.from({ length: 21 }, (_, i) => i * 5).map((value) => (
                            <option key={value} value={value}>{value}%</option>
                        ))}
                    </select>
                )}
            </div>
            <div style={{ marginBottom: '10px' }}>
                <input
                    type="checkbox"
                    id="range-discount"
                    onChange={() => handleSelectDiscount('range', discounts.range === null ? 0 : null)}
                />
                <span style={{ marginLeft: '10px' }}>Расстояние</span>
                {discounts.range !== null && (
                    <select
                        value={discounts.range || 0}
                        onChange={(e) => handleSelectDiscount('range', parseInt(e.target.value))}
                        style={{ marginLeft: '10px' }}
                    >
                        {Array.from({ length: 21 }, (_, i) => i * 5).map((value) => (
                            <option key={value} value={value}>{value}%</option>
                        ))}
                    </select>
                )}
            </div>
            <div style={{ marginBottom: '10px' }}>
                <input
                    type="checkbox"
                    id="duration-discount"
                    onChange={() => handleSelectDiscount('duration', discounts.duration === null ? 0 : null)}
                />
                <span style={{ marginLeft: '10px' }}>Длительность</span>
                {discounts.duration !== null && (
                    <select
                        value={discounts.duration || 0}
                        onChange={(e) => handleSelectDiscount('duration', parseInt(e.target.value))}
                        style={{ marginLeft: '10px' }}
                    >
                        {Array.from({ length: 21 }, (_, i) => i * 5).map((value) => (
                            <option key={value} value={value}>{value}%</option>
                        ))}
                    </select>
                )}
            </div>
            <div style={{ marginBottom: '10px' }}>
                <input
                    type="checkbox"
                    id="aoe-discount"
                    onChange={() => handleSelectDiscount('aoe', discounts.aoe === null ? 0 : null)}
                />
                <span style={{ marginLeft: '10px' }}>Площадь</span>
                {discounts.aoe !== null && (
                    <select
                        value={discounts.aoe || 0}
                        onChange={(e) => handleSelectDiscount('aoe', parseInt(e.target.value))}
                        style={{ marginLeft: '10px' }}
                    >
                        {Array.from({ length: 21 }, (_, i) => i * 5).map((value) => (
                            <option key={value} value={value}>{value}%</option>
                        ))}
                    </select>
                )}
            </div>
        </div>
    );
}

export default SpellDiscount;
