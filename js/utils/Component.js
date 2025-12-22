import { render } from "../render.js";
export class Component {
    constructor(componentFunction) {
        this.componentFunction = componentFunction;
        this.states = [];
        this.props = {};
        this.isUpdating = false;
        this.useState = (defaultValue) => {
            //automatyczne stworzenie miejsca w pamięci dla stanu po wywołaniu hooka
            const newState = { id: this.states.length + 1, value: defaultValue };

            //jeżeli flaga isUpdating jest true to znaczy, że funkcja komponentu zostaje ponownie wywołana, aby zaktualizować widok
            //w tej sytuacji useState nie wywołuje się ponownie, aby przydzielić ponownie tych samych stanów
            if (this.isUpdating) {
                return;
            }

            this.states = [...this.states, newState];
            //znajdywanie odpowiedniego stanu, na podstawie kolejności utworzenia stanu (wywołaniu useState)
            //wewnątrz funkcji komponentu

            const currentState = this.states.find(({ id }) => id === newState.id).value;

            const setState = (newStateValue) => {
                //czy odnośnik do konstruktora klasy będzie działał, jeżeli wywołam setState wewnątrz funkcji komponentu?
                this.emitStateChange(newState.id, newStateValue);
            };

            return [currentState, setState];
        };
        this.data = this.init();
        this.elementsMap = new Map();
        this.rootElement = undefined;
    };
    //tutaj generowanie elementów na podstawie mapy obiektów 
    init() {
        console.log("init..");

        return (props) => {
            this.props = props;
            //obecnie stworzyłem uproszczoną wersję w której funkcja komponentu od razu zwraca sparsowany widok tablicy tablic
            //zamiast HTML string
            const parsedElementsObjectMap = this.componentFunction({ component: this, ...props });
            const elementsConfigMap = new Map(parsedElementsObjectMap);


            //generowanie elementówna podstawie ich danych
            elementsConfigMap.forEach((_, elementKey) => {
                const elementData = elementsConfigMap.get(elementKey);

                const element = document.createElement(elementData.type);

                this.elementsMap.set(elementKey, element);
            });

            const buildFromRoot = () => {
                elementsConfigMap.forEach((data, key) => {
                    const element = this.elementsMap.get(key);

                    const parentElementKey = data.parent;

                    if (!parentElementKey) {
                        console.log("Root element found:", data);
                        this.rootElement = element;
                        return
                    }

                    const parentElement = this.elementsMap.get(parentElementKey);

                    parentElement.append(element);
                })
            };

            buildFromRoot();

            return this.rootElement;
        }
    }

    emitStateChange(stateId, newStateValue) {
        //metoda do wywołania, gdy chcę zaktualizować stan
        const changedState = this.states.find(({ id }) => id === stateId);

        //zmiana pojedynczego stanu
        this.states = [
            ...this.states.filter(({ id }) => id !== stateId),
            {
                ...changedState,
                value: newStateValue,
            },
        ];

        //ustawienie isUpdating na true, pozwoli pominąć ponowne wywołania useState wewnątrz funkcji komponentu
        this.isUpdating = true;
        this.callComponent();
    };

    callComponent() {
        //uzyskanie aktualnego HTML string komponentu po zmianie stanu lub props
        this.componentFunction(this);

        //wywołanie funkcji, która odświeży widok strony
        render();
    };
};