//funkcje generujące szablony HTML na podstawie parametru
//zwracają szablony, które są gotowe do wstrzyknięcia do DOMu
//używane do !pierwszego! renderu HTML
//posiadają default dane HTML, jakakolwiek zmiana na nich nie zachowa się po odświeżeniu strony
//nie używać przy re-renderze HTMLa, ponieważ nie są dynamiczne, a statyczne co oznacza, że nie są aktualizowane na bieżąco 

import { generateExerciseTabContainerElement } from "./utils/elementGenerators.js";
import { formatToKebabCase } from "./utils/formatToKebabCase.js";
import { generateHtmlElement } from "./utils/generateHtmlElement.js";

export const ExerciseTab = (exercise) => {
    const exerciseTabContainer = generateExerciseTabContainerElement(exercise);
    return exerciseTabContainer
};

const generateExerciseTabButton = ()=> {
    
}


export const generateExerciseListItemElement = (exercise) => {
    const elementConfig = {
        name: "li",
        attributes: [
            {
                name: "id",
                value: formatToKebabCase([...exercise.name.split(" ")])
            },
            {
                name: "class", 
                value: ["exercise_item js-workout-exercise"].join(" "),
            },
        ],
        children: [
            // generateExerciseTabContentElement(exercise),
        ],
        contentText: exercise.name,
        //prop z tablicą elementów, które mają zostać dodane, jako zagnieżdżenia?
    };

    const element = generateHtmlElement(elementConfig);

    return element;
};

export const ExerciseItemElement = (exercise) => (
    `
                <li 
                    id="${formatToKebabCase([...exercise.name.split(" ")])}" 
                    class="exercise_item js-workout-exercise"
                >
                    ${exercise.name}
                    <button class="js-toggleExerciseOpenButton">Open</button>
                </li>
        `
);

export const WorkoutNameElement = (name) => (
    `
     <h1 class="workout_name" >${name}</h1>
    `
);

export const ExercisesListElement = (exercises) => (
    exercises.map((exercise) => (
        ExerciseItemElement(exercise)
    )).join(" ")
);