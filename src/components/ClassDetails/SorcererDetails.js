import React, { useState } from "react";

function SorcererDetails({ character, onBack, updateMana, maxMana }) {
    const [showModal, setShowModal] = useState(false); // Состояние модального окна
    const [regenerationTime, setRegenerationTime] = useState({
        seconds: 0,
        minutes: 0,
        hours: 0,
        days: 0
    });

    const [showSecondsMultiplier, setShowSecondsMultiplier] = useState(false);
    const [showMinutesMultiplier, setShowMinutesMultiplier] = useState(false);
    const [showHoursMultiplier, setShowHoursMultiplier] = useState(false);

    const [secondsMultiplier, setSecondsMultiplier] = useState(1);
    const [minutesMultiplier, setMinutesMultiplier] = useState(1);
    const [hoursMultiplier, setHoursMultiplier] = useState(1);

    const handleSecondsMultiplierToggle = () => {
        setShowSecondsMultiplier(!showSecondsMultiplier);
        console.log('Текущее состояние переключателя секунд:', showSecondsMultiplier);
    };

    const handleMinutesMultiplierToggle = () => {
        setShowMinutesMultiplier(!showMinutesMultiplier);
        console.log('Текущее состояние переключателя минут:', showMinutesMultiplier);
    };

    const handleHoursMultiplierToggle = () => {
        setShowHoursMultiplier(!showHoursMultiplier);
        console.log('Текущее состояние переключателя часов:', showHoursMultiplier);
    };

    const handleSecondsMultiplierChange = (e) => {
        setSecondsMultiplier(parseInt(e.target.value));
    };

    const handleMinutesMultiplierChange = (e) => {
        setMinutesMultiplier(parseInt(e.target.value));
    };

    const handleHoursMultiplierChange = (e) => {
        setHoursMultiplier(parseInt(e.target.value));
    };

    const toggleRegenerationTime = (timeType) => {
        if (timeType === 'seconds') {
            setRegenerationTime(prev => ({
                ...prev,
                seconds: prev.seconds === 6 ? 0 : 6
            }));
            console.log('Состояние секунд:', regenerationTime.seconds);
        } else if (timeType === 'minutes') {
            setRegenerationTime(prev => ({
                ...prev,
                minutes: prev.minutes === 1 ? 0 : 1
            }));
            console.log('Состояние минут:', regenerationTime.minutes);
        } else if (timeType === 'hours') {
            setRegenerationTime(prev => ({
                ...prev,
                hours: prev.hours === 1 ? 0 : 1
            }));
            console.log('Состояние часов:', regenerationTime.hours);
        } else if (timeType === 'days') {
            setRegenerationTime(prev => ({
                ...prev,
                days: prev.days === 1 ? 0 : 1
            }));
            console.log('Состояние дней:', regenerationTime.days);
        }
    };

    const handleRegenerateMana = () => {
        console.log('Начало регенерации маны');
        console.log('Текущее состояние времени регенерации:', regenerationTime);

        let totalSeconds = 0;

        if (regenerationTime.seconds > 0) {
            totalSeconds += regenerationTime.seconds * (showSecondsMultiplier ? secondsMultiplier : 1);
        }
        if (regenerationTime.minutes > 0) {
            totalSeconds += regenerationTime.minutes * 60 * (showMinutesMultiplier ? minutesMultiplier : 1);
        }
        if (regenerationTime.hours > 0) {
            totalSeconds += regenerationTime.hours * 3600 * (showHoursMultiplier ? hoursMultiplier : 1);
        }
        totalSeconds += regenerationTime.days * 24 * 3600;

        console.log('Общее время регенерации в секундах:', totalSeconds);

        const manaRegeneration = (totalSeconds / 6) * 0.01 * maxMana;
        console.log('Рассчитанное количество регенерируемой маны:', manaRegeneration);

        updateMana(manaRegeneration);
        console.log('Завершение регенерации маны');
    };

    const renderMultiplierRadios = (multiplierValues, name, currentValue, onChange) => (
        <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center'
        }}>
            {multiplierValues.map((multiplier) => (
                <label key={multiplier} style={{ margin: '5px' }}>
                    <input
                        type="radio"
                        name={name}
                        value={multiplier}
                        checked={currentValue === multiplier}
                        onChange={onChange}
                    />
                    {multiplier}
                </label>
            ))}
        </div>
    );

    return (
        <div>
            <button onClick={() => setShowModal(true)}>Настройка регенерации</button>

            {showModal && (
                <div style={{
                    position: 'fixed',
                    top: "-70px",
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <div style={{
                        backgroundColor: 'white',
                        padding: '40px',
                        borderRadius: '10px',
                        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)'
                    }}>
                        <h3>Настройка регенерации маны</h3>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={regenerationTime.seconds !== 0}
                                        onChange={() => toggleRegenerationTime('seconds')}
                                    />
                                    6 сек
                                </label>
                                <input
                                    type="checkbox"
                                    checked={showSecondsMultiplier}
                                    onChange={handleSecondsMultiplierToggle}
                                />
                                <span>x</span>
                            </div>
                            {showSecondsMultiplier && renderMultiplierRadios(
                                [2, 3, 4, 5, 6, 7, 8, 9],
                                "secondsMultiplier",
                                secondsMultiplier,
                                handleSecondsMultiplierChange
                            )}
                            <div style={{
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={regenerationTime.minutes !== 0}
                                        onChange={() => toggleRegenerationTime('minutes')}
                                    />
                                    1 мин
                                </label>
                                <input
                                    type="checkbox"
                                    checked={showMinutesMultiplier}
                                    onChange={handleMinutesMultiplierToggle}
                                />
                                <span>x</span>
                            </div>
                            {showMinutesMultiplier && renderMultiplierRadios(
                                [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59],
                                "minutesMultiplier",
                                minutesMultiplier,
                                handleMinutesMultiplierChange
                            )}
                            <div style={{
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={regenerationTime.hours !== 0}
                                        onChange={() => toggleRegenerationTime('hours')}
                                    />
                                    1 час
                                </label>
                                <input
                                    type="checkbox"
                                    checked={showHoursMultiplier}
                                    onChange={handleHoursMultiplierToggle}
                                />
                                <span>x</span>
                            </div>
                            {showHoursMultiplier && renderMultiplierRadios(
                                [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
                                "hoursMultiplier",
                                hoursMultiplier,
                                handleHoursMultiplierChange
                            )}
                            <div style={{
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={regenerationTime.days !== 0}
                                        onChange={() => toggleRegenerationTime('days')}
                                    />
                                    1 день
                                </label>
                            </div>
                            <button onClick={handleRegenerateMana}>Регенерировать</button>
                            <button onClick={() => setShowModal(false)}>Закрыть</button>
                        </div>
                    </div>
                </div>
            )}
            <button onClick={onBack}>Назад к списку</button>
        </div>
    );
}

export default SorcererDetails;
