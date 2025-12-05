import { CustomElement } from "../utils/CustomElement.js";

export const WorkoutHeader = ({ contentText, children }) => {
    return new CustomElement({
        name: "h1",
        contentText,
    })
        .addContent(children)
};