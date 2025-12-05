import { CustomElement } from "../utils/CustomElement.js";

export const ExerciseListItem = ({ contentText, children }) => {
    return new CustomElement({
        name: "li",
        contentText,
    })
        .addContent(children)
};