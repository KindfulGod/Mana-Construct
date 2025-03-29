// ManaStat.js
const manaValues = {
    sorcerer: { base: 3500, perLevel: 1500, max: 30000 },  
    wizard: { base: 1500, perLevel: 1000, max: 20000 },  
    cleric: { base: 2500, perLevel: 1000, max: 20000 },  
    paladin: { base: 1500, perLevel: 600, max: 12000 },  
    druid: { base: 2000, perLevel: 1000, max: 20000 },  
    bard: { base: 2000, perLevel: 1000, max: 20000 },  
    warlock: { base: 2500, perLevel: 1000, max: 20000 }  
};

// Замораживаем объект, чтобы его случайно не изменили в другом месте
Object.freeze(manaValues);

export function calculateMana(charClass, level) {
    if (!manaValues[charClass]) {
        console.error(`Ошибка: Неизвестный класс '${charClass}'`);
        return 0; // Возвращаем 0, если класс не найден
    }

    const { base, perLevel, max } = manaValues[charClass];

    console.log(' calculateMana -> charClass=${charClass}, level=${level}, base=${base}, perLevel=${perLevel}, max=${max}');

    let mana = base + (perLevel * (level - 1)); 
    return Math.min(mana, max); // Ограничиваем максимальным значением
}