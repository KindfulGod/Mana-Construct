import React, { useState, useEffect } from "react";
import CharacterCreation from "./components/CharacterCreation";
import CharacterList from "./components/CharacterList";
import CharacterEdit from "./components/CharacterEdit";
import CharacterDetails from "./components/CharacterDetails"; // Новый компонент, который нужно создать
import "./App.css";

function App() {
    const [screen, setScreen] = useState("menu");
    const [characters, setCharacters] = useState([]);
    const [currentCharacter, setCurrentCharacter] = useState(null);

    useEffect(() => {
        const savedCharacters = localStorage.getItem('characters');
        if (savedCharacters) {
            setCharacters(JSON.parse(savedCharacters));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('characters', JSON.stringify(characters));
    }, [characters]);

    const handleCreateCharacter = (newCharacter) => {
        setCharacters((prevCharacters) => [
            ...prevCharacters,
            { ...newCharacter, id: Date.now() },
        ]);
        setScreen("characterList");
    };

    const handleUpdateCharacter = (updatedCharacter) => {
        setCharacters((prevCharacters) =>
            prevCharacters.map((char) =>
                char.id === updatedCharacter.id ? updatedCharacter : char
            )
        );
        setScreen("characterList");
    };

    const handleDeleteCharacter = (id) => {
        setCharacters((prevCharacters) =>
            prevCharacters.filter((char) => char.id !== id)
        );
    };

    const handleChooseCharacter = (character) => {
        setCurrentCharacter(character);
        setScreen("characterDetails");
    };

    return (
        <div>
            {screen === "menu" && (
                <div className="centered-screen">
                    <div className="app-container">
                        <h1>Главное меню</h1>
                        <button onClick={() => setScreen("createCharacter")}>
                            Создать персонажа
                        </button>
                        <button
                            onClick={() => setScreen("characterList")}
                            disabled={characters.length === 0}
                        >
                            Выбрать персонажа
                        </button>
                    </div>
                </div>
            )}
            {screen === "createCharacter" && (
                <div className="centered-screen">
                    <CharacterCreation
                        onCreate={handleCreateCharacter}
                        onBack={() => setScreen("menu")}
                    />
                </div>
            )}
            {screen === "characterList" && (
                <div className="centered-screen">
                    <CharacterList
                        characters={characters}
                        onSelect={(char) => {
                            setCurrentCharacter(char);
                            setScreen("editCharacter");
                        }}            
                        onDelete={handleDeleteCharacter}
                        onBack={() => setScreen("menu")}
                        onChoose={handleChooseCharacter}
                    />
                </div>
            )}
            {screen === "editCharacter" && currentCharacter && (
                <div className="centered-screen">
                    <CharacterEdit
                        character={currentCharacter}
                        onSave={handleUpdateCharacter}
                        onBack={() => setScreen("characterList")}
                    />
                </div>
            )}
            {screen === "characterDetails" && currentCharacter && (
                <div className="left-aligned-screen">
                    <CharacterDetails
                        character={currentCharacter}
                        onBack={() => setScreen("characterList")}
                    />
                </div>
            )}
        </div>
    );
    
}

export default App;
