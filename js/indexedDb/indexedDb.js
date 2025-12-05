// const exerciseSets = [
//     {
//         exerciseId: 2,
//         reps: 10,
//         weightKg: 100,
//         rir: 1,
//     },
//     {
//         exerciseId: 2,
//         reps: 9,
//         weightKg: 100,
//         rir: 1,
//     },
//     {
//         exerciseId: 2,
//         reps: 8,
//         weightKg: 100,
//         rir: 1,
//     },
//     {
//         exerciseId: 3,
//         reps: 10,
//         weightKg: 100,
//         rir: 1,
//     },
//     {
//         exerciseId: 3,
//         reps: 9,
//         weightKg: 100,
//         rir: 1,
//     },
//     {
//         exerciseId: 3,
//         reps: 8,
//         weightKg: 100,
//         rir: 1,
//     },
// ];

const indexedDb = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;

export const openDB = () => {
    return new Promise((resolve, reject) => {
        const request = indexedDb.open("WorkoutSessionExercisesDatabase", 2);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            //tworzenie object store , aby przechowywać dane o ćwiczeniach. Każde ćwiczenie musi mieć id, które będzie ręcznie dodawane
            const exercisesStore = db.createObjectStore("exercises", { keyPath: "id", autoIncrement: false });

            //tworzenie object store , aby przechowywać dane o seriach ćwiczenia. Każde ćwiczenie musi mieć unikatowe id, auto dodawane
            const exerciseSetsStore = db.createObjectStore("exerciseSets", { keyPath: "id", autoIncrement: true });

            //stworzenie indexu exerciseId, aby móc wyszukiwać serię na podstawie ćwiczenia
            exerciseSetsStore.createIndex("exerciseId", "exerciseId", { unique: false });

            exercisesStore.transaction.oncomplete = (event) => {
                // Store values in the newly created objectStore.
                // const exercisesStoreData = db
                //     .transaction("exercises", "readwrite")
                //     .objectStore("exercises");

                // exercises.forEach((exercise) => {
                //     exercisesStoreData.add(exercise);
                // });

                // const exerciseSetsStoreData = db
                //     .transaction("exerciseSets", "readwrite")
                //     .objectStore("exerciseSets");

                // exerciseSets.forEach((set) => {
                //     exerciseSetsStoreData.add(set);
                // });
            };
        };

        request.onerror = (event) => {
            console.error(`Database error: ${event.target.error?.message}`);
            return reject(event.target.error?.message);
        };

        request.onsuccess = (event) => resolve(event.target.result);

    });
};

export const getExerciseSets = async (exerciseId) => {
    const db = await openDB();

    return new Promise((resolve, reject) => {
        const transaction = db.transaction(["exerciseSets"], "readwrite");

        const setsStore = transaction.objectStore("exerciseSets");
        const exerciseIdIndex = setsStore.index("exerciseId");

        const exerciseSetsQuery = exerciseIdIndex.getAll(exerciseId);
        exerciseSetsQuery.onsuccess = () => resolve(exerciseSetsQuery.result);

        transaction.oncomplete = () => {
            //czy zamykać połączenie po udanej transakcji?
            db.close();
        }
    });
};

export const addNewExerciseSet = async (exerciseId, set) => {
    const db = await openDB();

    return new Promise((resolve, reject) => {
        const transaction = db.transaction(["exerciseSets"], "readwrite");

        const exercisesStore = transaction.objectStore("exercises");
        const setsStore = transaction.objectStore("exerciseSets");

        //sprawdzenie, czy ćwiczenie istnieje w exercises store

        const exerciseQuery = exercisesStore.get(exerciseId);

        exerciseQuery.onsuccess = () => {
            const exercise = exerciseQuery.result

            if (!exercise) {
                console.log(`Exercise o id ${exerciseId} nie istnieje IDB, zapisywanie...`);

                //dodać ćwiczenie do exercises store
                exercisesStore.put(exerciseId);
            }


            const newSetQuery = setsStore.put({ exerciseId, ...set });

            newSetQuery.onsuccess = () => {
                const newSetKey = newSetQuery.result;
                const newSet = setsStore.get(newSetKey)
                resolve(newSet.result)
            };
        }

        transaction.oncomplete = () => {
            //czy zamykać połączenie po udanej transakcji?
            db.close();
        }
    });
};

export const updateExercisSet = () => {

};