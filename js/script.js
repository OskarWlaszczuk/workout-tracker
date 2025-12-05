import { Workout } from "./Components/Workout.js";
//   // const toggleOpenButtonElement = dynaminToggleOpenButtonElement(buttonIndex);
//         console.log(toggleOpenButton);

//         const clickedExercise = exercises.find((_, index) => index === buttonIndex);

//         const isOpen = toggleOpenButton.textContent === "Close";

//         //dynamiczne pobranie elementu z dokumentu HTML
//         //pobranie całego elementu exercise
//         const ClickedExerciseItemElement = document.getElementById(formatToKebabCase([...clickedExercise.name.split(" ")]));

//         //sprawdzenie, czy zakładka exercise znajduje się w DOMie, przy użyciu id zakładki
//         const exerciseTab = document.getElementById(formatToKebabCase([...clickedExercise.name.split(" "), "tab"]));

//         if (isOpen) {
//             //ukrycie zakładki na stronie, ale nie jej usunięcie z DOMu, aby można było zakładkę łatwo wyświetlić
//             console.log("tab is open");

//             // exerciseTab.style.display = "none";
//             toggleOpenButton.textContent = "Open";

//         } else {
//             // console.log(toggleOpenButton);

//             toggleOpenButton.textContent = "Close";
//             // if (exerciseTab) {
//             //     //jeżeli tab istnieje to znaczy, że był wcześniej wyświetlany i jest tylko ukryty 
//             //     exerciseTab.style.display = "block"
//             // } 
//             // else {
//             //     // jeżeli tab nie istnieje to znaczy, że jest wyświetlany pierwszy raz i trzba go dopiero wstrzyknąć do DOMu wewnątrz elementu ćwiczenia
//             //     ClickedExerciseItemElement.innerHTML = `
//             //         ${ClickedExerciseItemElement.innerHTML}
//             //         ${ExerciseTabElement(clickedExercise)}
//             //     `
//             // }

//             // const toggleExerciseOpenButtons = Array.from(document.querySelectorAll(".js-toggleExerciseOpenButton"));
//             // const clickedButton = toggleExerciseOpenButtons.find((_, index) => index === buttonIndex);
//             // console.log(clickedButton);

//             // clickedButton.textContent = "Close";
//             // console.log(ClickedExerciseItemElement.innerHTML);
//         }



{
//     const dynaminToggleOpenButtonElement = (buttonIndex) => {
//         const toggleOpenButtonElements = Array.from(document.querySelectorAll(".js-toggleExerciseOpenButton"));
//         const toggleOpenButtonElement = toggleOpenButtonElements.find((_, index) => index === buttonIndex);

//         return toggleOpenButtonElement;
//     };

//     //rozdzielić funkcje renderujące na warstwy - HTML tag (template strings, dodawanie danych dynamicznych) -> render (dodanie tagu do DOM)

//     const toggleExerciseOpen = (
//         // toggleOpenButton,
//         // buttonIndex,
//         exercises
//     ) => {
//         return (event => {
//             console.log(exercises, event.target);
//             const clickedButton = event.target;
//             const isClosed = clickedButton.textContent === "Open";
//             const clickedExercise = exercises.find((_, index) => index === buttonIndex);


//             const exerciseTab = document.getElementById(formatToKebabCase([...clickedExercise.name.split(" "), "tab"]));

//             if (isClosed) {
//                 //wyświetlenie exercise tab
//                 //jeśli istnieje to znaczy, że było wcześniej wyświetlane i jest tylko ukryte - trzeba wyciągnąć ten element dynamicznie z DOMu
//                 //jeśli nie to znaczy, że user otwiera pierwszy raz zakładkę i trzeba stworzyć statyczny string HTML i dodać go do DOMu
//             }
//         });
//     };

//     const toggleExerciseOpen2 = (
//         // toggleOpenButton,
//         // buttonIndex,
//         exercises,
//         buttonIndex
//     ) => {
//         return (event => {
//             console.log(exercises, event.target);

//             const clickedButton = event.target;
//             const isClosed = clickedButton.textContent === "Open";
//             const clickedExercise = exercises.find((_, index) => index === buttonIndex);

//             console.log(document.createElement("a"));

//             // const exerciseTab = document.getElementById(formatToKebabCase([...clickedExercise.name.split(" "), "tab"]));

//             if (isClosed) {
//                 //wyświetlenie exercise tab
//                 //jeśli istnieje to znaczy, że było wcześniej wyświetlane i jest tylko ukryte - trzeba wyciągnąć ten element dynamicznie z DOMu
//                 //jeśli nie to znaczy, że user otwiera pierwszy raz zakładkę i trzeba stworzyć statyczny string HTML i dodać go do DOMu

//                 // if (exerciseTab) {
//                 //     exerciseTab.style.display = "block"
//                 // } else {


//                 // }
//             }


//         });
//     };

//     const bindToggleExerciseOpenEvents = (exercises) => {
//         // const exerciseList = document.querySelector(".js-workout-exercises");
//         // exerciseList.addEventListener("click", toggleExerciseOpen(exercises))


//         const buttons = document.querySelectorAll(".js-toggleExerciseOpenButton");

//         buttons.forEach((button, buttonIndex) => {
//             button.addEventListener("click", toggleExerciseOpen2(exercises, buttonIndex));
//         });
//     };

//     //funkcje renderujące - manipulacja DOMem
//     const renderWorkoutExercisesElement = (exercises) => {
//         //użyć appendChild - praca na nodes
//         document.querySelector(".js-workout-exercises").innerHTML = ExercisesListElement(exercises);
//     };

//     const renderWorkoutNameElement = (name) => {
//         //czy warto dodawać warstwę walidacji, która będzie sprawdzać istnienie pojedynczych fetchowanych danych?
//         // na wypadedk, gdyby pojedyncze własćiwości odpowiedzi nie były dostępne w response?
//         //czy może wystarczy sprawdzenie tylko obiektu i statusu odpowiedzi?
//         if (!name) {
//             document.querySelector(".js-workout-name").innerHTML = WorkoutNameElement("Name does not provided");
//         }

//         //dodawanie elementu do HTML, przy użyciu querySelector w bardziej immutability sposób?
//         document.querySelector(".js-workout-name").innerHTML = WorkoutNameElement(name);
//     };


    const init = async () => {
        const userUrlLocation = window.location.pathname;

        switch (userUrlLocation) {
            case "/index.html":
                return Workout();
            default:
                break;
        }

        // const workout = await fetchWorkout();
        // ExerciseTab()
        // renderWorkoutNameElement(workout.name);
        // renderWorkoutExercisesElement(workout.exercises);
        // // workout.exercises.forEach(ex => {
        // //     console.log(ExerciseTab(ex));
        // // })
        // bindToggleExerciseOpenEvents(workout.exercises);
    };

    init();
}