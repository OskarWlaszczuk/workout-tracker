import { CustomElement } from "../utils/CustomElement.js";

export const ExerciseList = ({ children }) => {
    return new CustomElement({
        name: "ol",
        attributes: [{ name: "type", value: "I" }],
    })
        .addContent(children)
};