function* idGenerator(initialId, isUpdating) {
    while (!isUpdating) {
        yield initialId;
        initialId++
    }
};
export class Component {
    constructor(componentFunction) {
        this.componentFunction = componentFunction;
        this.statesMap = new Map();
        this.props = {};
        this.isUpdating = false;
        this.updatingStates = new Map();
        this.array = [];

        this.useState = (initialStateValue) => {
            const stateId = this.isUpdating ? this.array.length : this.statesMap.size;

            if (!this.isUpdating) {
                this.statesMap.set(stateId, initialStateValue);
            }

            const setState = (newStateValue) => {

                console.log(`Updating state ${stateId}`);
                this.updatingStates.set(stateId, newStateValue);
                this.isUpdating = true;
            };

            const currentState = this.statesMap.get(stateId);

            return [currentState, setState];
        };

        this.data = this.init();
        this.nodesMap = new Map();
        this.rootElement = undefined;
    };

    init() {
        return (props) => {
            this.props = props;
            //obecnie stworzyłem uproszczoną wersję w której funkcja komponentu od razu zwraca sparsowany widok tablicy tablic
            //zamiast HTML string
            const nodesConfig = this.componentFunction({ component: { ...this }, ...this.props });
            const nodesConfigMap = new Map(nodesConfig);

            const availableProps = new Map([
                ["onClick", { type: "event", eventName: "click" }],
                ["class", { type: "attribute" }],
            ]);

            const assignProps = (element, props) => {
                props.forEach((propValue, propKey) => {
                    const propData = availableProps.get(propKey);

                    if (propData.type === "event") {

                        const dispatchStateChange = () => {
                            console.log("dispatching state change");

                            //update zaznaczonych stanów i re-render komponentu
                            console.log(this.updatingStates.entries(), this.statesMap.entries());

                            this.updatingStates.forEach((value, key) => {
                                this.statesMap.set(key, value);
                            });
                            console.log("states map after updates:", this.statesMap);

                            this.callComponent();
                            this.updatingStates.clear();
                            this.array = []
                        };

                        const eventHandlerWrapper = () => {
                            return (eventObject) => {
                                propValue(eventObject);

                                if (this.isUpdating) {
                                    dispatchStateChange();
                                }
                            };
                        };

                        element.addEventListener(propData.eventName, eventHandlerWrapper());
                    }
                    else if (propData.type === "attribute") {
                        element.setAttribute(propKey, propValue);
                    }

                });
            };

            const generateNodes = () => {
                //generowanie elementówna podstawie ich danych
                nodesConfigMap.forEach((_, elementKey) => {
                    const elementData = nodesConfigMap.get(elementKey);

                    if (elementData.type === "text") {
                        const textNode = document.createTextNode(elementData.content);
                        this.nodesMap.set(elementKey, textNode);
                        return;
                    }

                    const elementNode = document.createElement(elementData.type);

                    if (elementData.props) {
                        assignProps(elementNode, elementData.props)
                    }

                    this.nodesMap.set(elementKey, elementNode);
                });
            };

            const buildFromRoot = () => {
                nodesConfigMap.forEach((data, key) => {
                    const element = this.nodesMap.get(key);

                    const parentElementKey = data.parent;

                    if (!parentElementKey && data.type !== "text") {
                        this.rootElement = element;
                        return
                    }

                    const parentElement = this.nodesMap.get(parentElementKey);

                    parentElement.append(element);
                })
            };

            generateNodes();
            buildFromRoot();

            return this.rootElement;
        }
    };

    callComponent() {
        console.log("calling component");

        //uzyskanie aktualnego HTML string komponentu po zmianie stanu lub props
        const componentInput = { component: { ...this }, ...this.props };
        const comp = new Map(this.componentFunction(componentInput));
        //zmiana stanu powoduje re-render komponentu i aktualizację jego drzewa, ale póki co zmiany nie są nanoszone na DOM
        //po re-renderze i wygenerowaniu zaktuazlizowanego drzewa musi nastąpić proces diffingu
        //w jaki sposób łatwo porównać ze sobą oba drzewa i znaleźć różnicę?

        console.log("re-call component:", Array.from(comp), "current nodes:", this.nodesMap, this.rootElement.childNodes);
    };
};