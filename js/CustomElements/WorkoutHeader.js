import { CustomElement } from "../utils/CustomElement.js";

export const WorkoutHeader = ({ content }) => {
    return new CustomElement({
        name: "h1",
        content,
    })
};