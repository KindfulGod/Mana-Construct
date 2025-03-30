import React, { useState, useEffect } from 'react';

function SpellDamage({ onDamageChange }) {
    const [isDamageEnabled, setIsDamageEnabled] = useState(false);
    const [damageValue, setDamageValue] = useState('');
    const [damageDice, setDamageDice] = useState('4');
    const [damageCost, setDamageCost] = useState(0);

    const handleDamageToggle = () => {
        setIsDamageEnabled(!isDamageEnabled);
    };

    const handleDamageValueChange = (e) => {
        const value = e.target.value;
        if (value === '' || !isNaN(value) && parseInt(value) > 0) {
            setDamageValue(value);
        }
    };

    const handleDamageDiceChange = (e) => {
        setDamageDice(e.target.value);
    };

    const getManaCost = (dice) => {
        switch (dice) {
            case '4':
                return 40;
            case '6':
                return 55;
            case '8':
                return 70;
            case '10':
                return 85;
            case '12':
                return 100;
            case '20':
                return 160;
            default:
                return 0;
        }
    };

    const handleDamageCostChange = () => {
        if (isDamageEnabled && damageValue !== '') {
            const newDamageCost = parseInt(damageValue) * getManaCost(damageDice);
            setDamageCost(newDamageCost);
            onDamageChange(newDamageCost);
        } else {
            setDamageCost(0);
            onDamageChange(0);
        }
    };

    useEffect(() => {
        handleDamageCostChange();
    }, [isDamageEnabled, damageValue, damageDice]);

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center'
        }}>
            <input
                type="checkbox"
                checked={isDamageEnabled}
                onChange={handleDamageToggle}
            />
            <span style={{ marginLeft: '10px' }}>Урон</span>
            {isDamageEnabled && (
                <div style={{
                    marginLeft: '20px',
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    <input
                        type="number"
                        value={damageValue}
                        onChange={handleDamageValueChange}
                        style={{
                            width: '50px',
                            marginRight: '5px'
                        }}
                    />
                    <span>k</span>
                    <select
                        value={damageDice}
                        onChange={handleDamageDiceChange}
                        style={{
                            width: '70px',
                            marginLeft: '5px'
                        }}
                    >
                        <option value="4">4</option>
                        <option value="6">6</option>
                        <option value="8">8</option>
                        <option value="10">10</option>
                        <option value="12">12</option>
                        <option value="20">20</option>
                    </select>
                </div>
            )}
            {isDamageEnabled && <p style={{ marginLeft: '20px' }}>Стоимость: {damageCost}</p>}
        </div>
    );
}

export default SpellDamage;
