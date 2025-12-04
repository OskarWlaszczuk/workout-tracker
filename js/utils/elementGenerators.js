export const generateExerciseTabContentElement = (exercise) => {
    const elementConfig = {
        name: "span",
        attributes: [],
        children: [],
        contentText: exercise.name,
    };

    const element = generateHtmlElement(elementConfig);

    return element;
};
// powinienem zwracać bezpośrednio element
class CustomEL {
    constructor(name, attributes, children, contentText) {
        //czy tutaj tworzę tylko shape obiektu?
        this.name = name;
        this.attributes = attributes;
        this.children = children;
        this.contentText = contentText;
    }


}


export const generateExerciseTabCoontainerElement = (exercise) => {
    const elementConfig = {
        name: "div",
        attributes: [
            {
                name: "id",
                value: formatToKebabCase([...exercise.name.split(" "), "tab"])
            }
        ],
        children: [
            generateExerciseTabContentElement(exercise),
        ],
        contentText: "",
        //prop z tablicą elementów, które mają zostać dodane, jako zagnieżdżenia?
    };

    const element = generateHtmlElement(elementConfig);

    return element;
};