import { ExerciseList } from "../CustomElements/ExerciseList.js";
import { ExerciseListItem } from "../CustomElements/ExerciseListItem.js";
import { WorkoutHeader } from "../customElements/WorkoutHeader.js";
import { fetchWorkout } from "../utils/fetchWorkout.js";

const renderComponent = ({ parent, children }) => {
    children.forEach(child => {
        parent.appendChild(child)
    });
};

// komponent jest na najwyższym poziomem logiki aplikacji 

// wywołanie komponentu powoduje 
// I. natychmiastowy render jego elementów w DOMie
// II. wykonanie się określonej logiki komponentu - na przykład, jeżeli wywołam Workout to dopiero wtedy fetchują się plany treningowe, 
// ponieważ tylko w komponencie Workout te plany są używane 

//klasa komponentu powinna zwracać listę jego elementów gotową do renderu
export class Component {
    constructor({ children }) {
        children.forEach((child) => {
            this[child.id] = child.element
        })
    }

    deleteChild(childId) {
        delete this[childId]
    }

    // updateChild(childId) {
    //     this[childId] = 
    // }

    // addNewChild (child){
    // }
}



// zamienić na klasę, którą będą mógł reużywać w wielu miejscach, łatwo i szybko
// dane takie jak: 
// - skąd biorą się dane planu, 
// - gdzie komponent powinienm być renderowany (jaki parent)

// nie powinny obchodzić komponentu - komponent zajmuje się jedynie:
// a) dostaniem elementów, jakie ma wygenerować i ich strukturą (relacje parent-children)
// b) bezpośrednią manipulacją domem

export const Workout = async (workout) => {
    const workoutData = await fetchWorkout();

    const BodyElement = document.querySelector(".js-body");

    const ExerciseListItems = workoutData.exercises.map(({ name }) => (
        ExerciseListItem({ content: [name] })
    ));

    const workoutComponentConfig = {
        parent: BodyElement,
        children: [
            //komponentu nie obchodzi jakie children dostaje tylko oczekuje, że je dostanie i je wygeneruje
            //jedna warstwa zagnieżdzenia elementów - sliblings
            WorkoutHeader({ content: workoutData.name }),
            ExerciseList({ content: [...ExerciseListItems] })
        ],
    };

    renderComponent(workoutComponentConfig);
};