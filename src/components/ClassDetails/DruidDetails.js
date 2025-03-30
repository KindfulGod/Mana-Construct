import React, { useState, useEffect } from "react";

function DruidDetails({ character, onBack, updateMana, maxMana }) {
    const [showModal, setShowModal] = useState(false); // Состояние модального окна
    const [sliderValue, setSliderValue] = useState(50); // Начальное значение ползунка

    // Обработчик открытия модального окна
    const handleOpenModal = () => {
        setShowModal(true);
    };

    // Обработчик закрытия модального окна
    const handleCloseModal = () => {
        setShowModal(false);
    };

    // Обработчик изменения значения ползунка
    const handleSliderChange = (e) => {
        const newValue = parseInt(e.target.value);
        setSliderValue(newValue);
    };

    // Состояние регенерации
    const [showRegeneration, setShowRegeneration] = useState(false);
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

    const handleRegenerationToggle = () => {
        setShowRegeneration(!showRegeneration);
    };

    const handleSecondsMultiplierToggle = () => {
        setShowSecondsMultiplier(!showSecondsMultiplier);
    };

    const handleMinutesMultiplierToggle = () => {
        setShowMinutesMultiplier(!showMinutesMultiplier);
    };

    const handleHoursMultiplierToggle = () => {
        setShowHoursMultiplier(!showHoursMultiplier);
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

    const handleRegenerateMana = () => {
        console.log('Начало регенерации маны');
        console.log('Уровень связи с природой:', sliderValue);
        console.log('Максимальный запас маны:', maxMana);

        let totalSeconds = (regenerationTime.seconds * secondsMultiplier) +
            (regenerationTime.minutes * minutesMultiplier * 60) +
            (regenerationTime.hours * hoursMultiplier * 3600) +
            (regenerationTime.days * 24 * 3600);

        console.log('Общее время регенерации в секундах:', totalSeconds);

        const manaRegeneration = (sliderValue / 100) * 0.4 * (totalSeconds / 6) * maxMana;
        console.log('Рассчитанное количество регенерируемой маны:', manaRegeneration);

        updateMana(manaRegeneration);
        console.log('Завершение регенерации маны');
    };

    const toggleRegenerationTime = (timeType) => {
        if (timeType === 'seconds') {
            setRegenerationTime(prev => ({
                ...prev,
                seconds: prev.seconds === 6 ? 0 : 6
            }));
        } else if (timeType === 'minutes') {
            setRegenerationTime(prev => ({
                ...prev,
                minutes: prev.minutes === 1 ? 0 : 1
            }));
        } else if (timeType === 'hours') {
            setRegenerationTime(prev => ({
                ...prev,
                hours: prev.hours === 1 ? 0 : 1
            }));
        } else if (timeType === 'days') {
            setRegenerationTime(prev => ({
                ...prev,
                days: prev.days === 1 ? 0 : 1
            }));
        }
    };

    useEffect(() => {
        console.log('Текущее состояние времени регенерации:', regenerationTime);
    }, [regenerationTime]);

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
            <button onClick={handleOpenModal}>Открыть шкалу</button>

            {showModal && (
                <div style={{
                    position: 'fixed',
                    top: 0,
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
                        <h3>Уровень Связи с Природой</h3>
                        <div style={{
                            position: "relative",
                            width: "320px",
                            margin: "100px auto"
                        }}>
                            {/* Контейнер для полоски с отметками */}
                            <div style={{
                                position: "relative",
                                width: "271px", // Ширина полоски с отметками
                                height: "0px", // Высота полоски с отметками
                                margin: "0 auto" // Выравнивание по центру
                            }}>
                                {/* Полоска с отметками */}
                                <div style={{
                                    position: "absolute",
                                    top: "50%",
                                    left: "-10px",
                                    right: 0,
                                    height: "2px",
                                    backgroundColor: "#ccc",
                                    transform: "translateY(-50%)",
                                }} />
                                {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((mark) => (
                                    <div
                                        key={mark}
                                        style={{
                                            position: "absolute",
                                            left: `${mark}%`,
                                            transform: "translateX(-50%)",
                                            textAlign: "center",
                                            top: "50%",
                                            transform: "translateY(-50%) translateX(-50%)",
                                        }}
                                    >
                                        {/* Вертикальная линия отметки */}
                                        <div
                                            style={{
                                                width: "2px",
                                                height: mark % 10 === 0 ? "10px" : "5px", // Основные отметки длиннее
                                                backgroundColor: "#000",
                                                marginBottom: "0px",
                                            }}
                                        />
                                        {/* Подпись отметки */}
                                        {mark % 10 === 0 && (
                                            <span style={{ fontSize: "11px", color: "#000" }}>{mark}%</span>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Ползунок */}
                            <input
                                type="range"
                                min="0"
                                max="100"
                                step="5"
                                value={sliderValue}
                                onChange={handleSliderChange}
                                style={{
                                    width: "280px", // Ширина ползунка должна совпадать с шириной полоски
                                    marginTop: "0px",
                                    appearance: "none",
                                    backgroundColor: "transparent",
                                    position: "relative",
                                    top: "-25px",
                                }}
                            />

                            {/* Стилизация ползунка */}
                            <style>
                                {`
                                    input[type="range"]::-webkit-slider-thumb {
                                        -webkit-appearance: none;
                                        appearance: none;
                                        width: 15px;
                                        height: 15px;
                                        border-radius: 50%;
                                        background-color: #00ff00;
                                        cursor: pointer;
                                    }

                                    input[type="range"]::-moz-range-thumb {
                                        width: 15px;
                                        height: 15px;
                                        border-radius: 50%;
                                        background-color: #00ff00;
                                        cursor: pointer;
                                    }

                                    input[type="range"]::-ms-thumb {
                                        width: 15px;
                                        height: 15px;
                                        border-radius: 50%;
                                        background-color: #00ff00;
                                        cursor: pointer;
                                    }
                                `}
                            </style>

                            {/* Текущее значение ползунка */}
                            <p style={{ marginTop: "20px" }}>Уровень связи с природой: {sliderValue}%</p>
                        </div>
                        <button onClick={handleCloseModal}>Закрыть</button>
                    </div>
                </div>
            )}
            {showRegeneration && (
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
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
                    </div>
                    <button onClick={handleRegenerateMana}>Регенерировать</button>
                </div>
            )}
            <button onClick={handleRegenerationToggle}>Регенерация</button>
        </div>
    );
}

export default DruidDetails;
