console.log("MODULE template");

class Template {

    // returns a function that can be used to get a copy of the template.
    static new(template_string) {
        const template = document.createElement('template');
        template.innerHTML = template_string;

        return () => template.content.cloneNode(true);
    }
}

export { Template };
