import React, { useState, useCallback } from 'react';
import SpellDamage from './SpellCreationDetails/SpellDamage';
import SpellSavethrow from './SpellCreationDetails/SpellSavethrow';
import SpellDistance from './SpellCreationDetails/SpellDistance';
import SpellDurationS from './SpellCreationDetails/SpellDurationS';
import SpellDurationM from './SpellCreationDetails/SpellDurationM';
import SpellDurationL from './SpellCreationDetails/SpellDurationL';
import SpellAOECircle from './SpellCreationDetails/Spell_AOE_Circle';
import SpellAOESquare from './SpellCreationDetails/Spell_AOE_Square';
import SpellAOETriangle from './SpellCreationDetails/Spell_AOE_Triangle';
import SpellAOELine from './SpellCreationDetails/Spell_AOE_Line';
import SpellAOEWidthOfLine from './SpellCreationDetails/Spell_AOE_WidthOfLine';

function SpellCreation({ onUseSpell, manaCost, onSelectDiscount }) {
    const [damageCost, setDamageCost] = useState(0);
    const [saveCost, setSaveCost] = useState(0);
    const [rangeCost, setRangeCost] = useState(0);

    // Состояние для выбранной длительности
    const [selectedDuration, setSelectedDuration] = useState({ type: null, cost: 0 });

    // Состояние для выбранной площади
    const [selectedAOE, setSelectedAOE] = useState({ type: null, cost: 0 });

    const handleDamageChange = useCallback((cost) => setDamageCost(cost), []);
    const handleSaveChange = useCallback((cost) => setSaveCost(cost), []);
    const handleDistanceChange = useCallback((range, cost) => setRangeCost(cost), []);

    const handleDurationChange = useCallback((type, cost) => {
        setSelectedDuration(prev => {
            if (prev.type === type && prev.cost === cost) {
                return { type: null, cost: 0 };
            }
            return { type, cost };
        });
    }, []);

    const handleAOEChange = useCallback((type, cost) => {
        setSelectedAOE(prev => {
            if (prev.type === type && prev.cost === cost) {
                return { type: null, cost: 0 };
            }
            return { type, cost };
        });
    }, []);

    const applyDiscounts = useCallback((costs, discounts) => {
        const discountedCosts = { ...costs };
        for (const type in discounts) {
            if (discounts[type] !== null) {
                discountedCosts[type] = discountedCosts[type] * (1 - discounts[type] / 100);
            }
        }
        return discountedCosts;
    }, []);

    const calculateTotalCost = useCallback((discounts) => {
        const spellCosts = {
            damage: damageCost,
            save: saveCost,
            range: rangeCost,
            duration: selectedDuration.cost,
            aoe: selectedAOE.cost,
        };

        const discountedCosts = applyDiscounts(spellCosts, discounts);
        let totalCost = Object.values(discountedCosts).reduce((sum, cost) => sum + cost, 0);
        totalCost += totalCost * manaCost;

        return totalCost;
    }, [damageCost, saveCost, rangeCost, selectedDuration, selectedAOE, manaCost]);

    const handleUseSpell = useCallback((discounts) => {
        const spellCosts = {
            damage: damageCost,
            save: saveCost,
            range: rangeCost,
            duration: selectedDuration.cost,
            aoe: selectedAOE.cost,
        };

        const discountedCosts = applyDiscounts(spellCosts, discounts);
        const totalCost = Object.values(discountedCosts).reduce((sum, cost) => sum + cost, 0);

        onUseSpell(totalCost, discounts);
    }, [damageCost, saveCost, rangeCost, selectedDuration, selectedAOE, applyDiscounts, onUseSpell]);

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'flex-start'
        }}>
            <div style={{
                width: '40%',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <h2>Создание Заклинания</h2>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <SpellDamage onDamageChange={handleDamageChange} />
                    <SpellSavethrow onSaveChange={handleSaveChange} />
                    <SpellDistance onDistanceChange={handleDistanceChange} />

                    {/* Компоненты длительности */}
                    <SpellDurationS
                        onDurationChange={(cost) => handleDurationChange('S', cost)}
                        isSelected={selectedDuration.type === 'S'}
                    />
                    <SpellDurationM
                        onDurationChange={(cost) => handleDurationChange('M', cost)}
                        isSelected={selectedDuration.type === 'M'}
                    />
                    <SpellDurationL
                        onDurationChange={(cost) => handleDurationChange('L', cost)}
                        isSelected={selectedDuration.type === 'L'}
                    />

                    {/* Компоненты площадей */}
                    <SpellAOECircle
                        onAOEChange={(cost) => handleAOEChange('circle', cost)}
                        isSelected={selectedAOE.type === 'circle'}
                    />
                    <SpellAOESquare
                        onAOEChange={(cost) => handleAOEChange('square', cost)}
                        isSelected={selectedAOE.type === 'square'}
                    />
                    <SpellAOETriangle
                        onAOEChange={(cost) => handleAOEChange('triangle', cost)}
                        isSelected={selectedAOE.type === 'triangle'}
                    />
                    <SpellAOELine
                        onAOEChange={(cost) => handleAOEChange('line', cost)}
                        isSelected={selectedAOE.type === 'line'}
                    />
                    <SpellAOEWidthOfLine
                        onAOEChange={(cost) => handleAOEChange('widthOfLine', cost)}
                        isSelected={selectedAOE.type === 'widthOfLine'}
                    />

                    <button
                        style={{ width: 'auto', display: 'block', margin: 'auto', marginTop: '20px' }}
                        onClick={() => handleUseSpell({})}
                    >
                        Использовать Заклинание
                    </button>

                    {/* Предварительный просмотр общей стоимости */}
                    <div style={{ textAlign: 'center' }}>
                        <p>Общая стоимость заклинания: {calculateTotalCost({})}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SpellCreation;
