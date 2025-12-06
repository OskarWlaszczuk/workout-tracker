import { CustomElement } from "../utils/CustomElement.js";


const ToggleOpenButton = () => {
    return new CustomElement({
        name: "button",
        children: [
            {
                id: "toggleButtonContent",
                element: "Open",
            }
        ],
        // attributes: [
        //     {
        //         name: "id",
        //         value: exercise.name
        //     }
        // ]
    });
};

export const ExerciseListItem = ({ exercise }) => {
    const button = ToggleOpenButton()

    button.element.addEventListener("click", (event) => {
        button.editChildElement("toggleButtonContent", "Close")
    });

    return (
        new CustomElement({
            name: "li",
            children: [
                {
                    id: exercise.name,
                    element: exercise.name,
                },
                {
                    id: "toggleButton",
                    element: button.element,

                },
            ],
            attributes: [
                {
                    name: "id",
                    value: exercise.name
                }
            ]
        })
    );
}