import { App } from "./App.js";

{
    const renderHtml = () => {
        const htmlString = `
            ${App()}
        `;

        const parsedHtml = Array.from(new DOMParser().parseFromString(htmlString, "text/html").body.children);
        console.log(parsedHtml);

        const bodyElement = document.querySelector(".js-body");
        bodyElement.append(...parsedHtml);
    };

    renderHtml();
};