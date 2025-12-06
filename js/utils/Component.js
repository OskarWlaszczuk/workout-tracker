// komponent jest na najwyższym poziomem logiki aplikacji 

// wywołanie komponentu powoduje 
// I. natychmiastowy render jego elementów w DOMie
// II. wykonanie się określonej logiki komponentu - na przykład, jeżeli wywołam Workout to dopiero wtedy fetchują się plany treningowe, 
// ponieważ tylko w komponencie Workout te plany są używane 

//klasa komponentu powinna zwracać listę jego elementów gotową do renderu

export class Component {
    constructor({ children, parent }) {
        this.children = children;
        this.parent = parent;
    }

    render() {
        const childrenElements = this.children.map(({ element }) => element);
        this.parent.append(...childrenElements)
    }

    deleteChild(childId) {
        delete this.children.find(({ id }) => id === childId)
    }

    updateChild(childId, updatedChild) {
        this[childId] = updatedChild;
        this.render()
    }

    // addNewChild (child){
    // }
}