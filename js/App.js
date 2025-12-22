import { Paragraph } from "./Components/Workout.js";

export const App = () => {
    const userUrlLocation = window.location.pathname;

    switch (userUrlLocation) {
        case "/index.html":
            return Paragraph({ content: "text" });
        default:
            break;
    }
};