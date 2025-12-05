import { CustomElement } from "../utils/CustomElement.js";

export const ExerciseListItem = ({ content }) => {
    return new CustomElement({
        name: "li",
        content
    })
};