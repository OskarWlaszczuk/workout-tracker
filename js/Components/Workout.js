import { ExerciseList } from "../CustomElements/ExerciseList.js";
import { ExerciseListItem } from "../CustomElements/ExerciseListItem.js";
import { WorkoutHeader } from "../customElements/WorkoutHeader.js";
import { fetchWorkout } from "../utils/fetchWorkout.js";

const renderComponent = ({ parent, props, children }) => {
    children.forEach(child => {
        parent.appendChild(child)
    });
};

//komponent jest na najwyższym poziomem logiki aplikacji 
//zastanowić się, co powinna zwracać 
// class Component {
//     constructor({ children, parent, props }) {
//         this.children = children;
//         this.parent = parent;
//         this.props = props;
//     }
// }

// zamienić na klasę, którą będą mógł reużywać w wielu miejscach, łatwo i szybko
export const Workout = async (workout) => {
    //wynieść logikę fetchowania planu
    const workout = await fetchWorkout();

    const BodyElement = document.querySelector(".js-body");

    const ExerciseListItems = workout.exercises.map(({ name }) => (
        ExerciseListItem({ contentText: name, children: [] }).element
    ));

    const workoutComponentConfig = {
        parent: BodyElement,
        props: { workout },
        children: [
            //komponentu nie obchodzi jakie children dostaje tylko oczekuje, że je dostanie i je wygeneruje
            //jedna warstwa zagnieżdzenia elementów - sliblings
            WorkoutHeader({ contentText: workout.name, children: [] }).element,
            ExerciseList({ children: ExerciseListItems }).element
        ],
    };

    renderComponent(workoutComponentConfig);
};