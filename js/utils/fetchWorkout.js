// podzielić fn na mniejsze warstwy odpowiedzialności - fetch/walidacja/error-handling
export const fetchWorkout = async () => {
    try {
        console.log("Fetching workout...");

        const response = await fetch("../../data/workout.json");

        if (!response.ok) {
            throw new Error("Error on workot fetching");
        }
        const workout = await response.json();

        return workout;
    } catch (error) {
        console.log(error);
    }
};