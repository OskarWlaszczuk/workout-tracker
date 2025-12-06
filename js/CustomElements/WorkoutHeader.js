import { CustomElement } from "../utils/CustomElement.js";

export const WorkoutHeader = ({ children }) => {
    return new CustomElement({
        name: "h1",
        children,
    })
};