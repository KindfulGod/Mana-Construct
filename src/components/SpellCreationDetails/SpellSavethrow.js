import React, { useState, useEffect } from 'react';

function SpellSavethrow({ onSaveChange }) {
    const [isSaveEnabled, setIsSaveEnabled] = useState(false);
    const [saveValue, setSaveValue] = useState('5');
    const [saveCost, setSaveCost] = useState(0);

    const handleSaveToggle = () => {
        setIsSaveEnabled(!isSaveEnabled);
    };

    const handleSaveValueChange = (e) => {
        setSaveValue(e.target.value);
    };

    const getSaveCost = (value) => {
        switch (value) {
            case '5':
                return 0;
            case '6':
                return 100;
            case '7':
                return 200;
            case '8':
                return 300;
            case '9':
                return 400;
            case '10':
                return 500;
            case '11':
                return 700;
            case '12':
                return 900;
            case '13':
                return 1100;
            case '14':
                return 1300;
            case '15':
                return 1500;
            case '16':
                return 1900;
            case '17':
                return 2300;
            case '18':
                return 2700;
            case '19':
                return 3100;
            case '20':
                return 3500;
            default:
                return 0;
        }
    };

    const handleSaveCostChange = () => {
        if (isSaveEnabled) {
            const newSaveCost = getSaveCost(saveValue);
            setSaveCost(newSaveCost);
            onSaveChange(newSaveCost);
        } else {
            setSaveCost(0);
            onSaveChange(0);
        }
    };

    useEffect(() => {
        handleSaveCostChange();
    }, [isSaveEnabled, saveValue]);

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center'
        }}>
            <input
                type="checkbox"
                checked={isSaveEnabled}
                onChange={handleSaveToggle}
            />
            <span style={{ marginLeft: '10px' }}>Спасбросок</span>
            {isSaveEnabled && (
                <select
                    value={saveValue}
                    onChange={handleSaveValueChange}
                    style={{
                        width: '70px',
                        marginLeft: '20px'
                    }}
                >
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                    <option value="13">13</option>
                    <option value="14">14</option>
                    <option value="15">15</option>
                    <option value="16">16</option>
                    <option value="17">17</option>
                    <option value="18">18</option>
                    <option value="19">19</option>
                    <option value="20">20</option>
                </select>
            )}
            {isSaveEnabled && <p style={{ marginLeft: '20px' }}>Стоимость: {saveCost}</p>}
        </div>
    );
}

export default SpellSavethrow;
