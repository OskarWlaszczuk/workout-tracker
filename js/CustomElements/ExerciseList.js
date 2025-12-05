import { CustomElement } from "../utils/CustomElement.js";
//czy atrybuty powienem przekazywać w parametrze?
//użyć TS. tak, aby CustomElement zwracał w pełni otypowany obiekt
export const ExerciseList = ({ content }) => {
    return new CustomElement({
        name: "ol",
        attributes: [{ name: "type", value: "I" }],
        content
    })
};