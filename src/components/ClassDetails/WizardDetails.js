import React, { useState } from 'react';
import SpellCreation from '../SpellCreation';

function WizardDetails({ character, onBack, onUseSpell }) {
    const [isManaRefundEnabled, setIsManaRefundEnabled] = useState(false);
    const [refundPercentage, setRefundPercentage] = useState('25');

    const handleManaRefundToggle = () => {
        setIsManaRefundEnabled(!isManaRefundEnabled);
    };

    const handleRefundPercentageChange = (e) => {
        setRefundPercentage(e.target.value);
    };

    const handleUseSpell = (spellCost) => {
        let refundAmount = 0;
        if (isManaRefundEnabled) {
            refundAmount = spellCost * (parseInt(refundPercentage) / 100);
        }
        onUseSpell(spellCost, refundAmount);
    };

    return (
        <div>
            <SpellCreation onUseSpell={handleUseSpell} />
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
    );
}

export default WizardDetails;
