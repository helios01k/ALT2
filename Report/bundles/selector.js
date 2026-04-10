const tab_file = {
    "Investigation & Plan": "plan.md",
    "Design": "design.md",
    "Implementation & Testing": "testing.md",
    "Evaluation": "eval.md",
    "Extra Information": "extras.md"
};

function load_markdown(filename) {
    const contentDiv = document.getElementById('content');

    // get embed
    if (typeof PAGE_CONTENT !== 'undefined' && PAGE_CONTENT[filename]) {
        const markdown = PAGE_CONTENT[filename];
        contentDiv.innerHTML = marked.parse(markdown);
        return;
    }

    // Fallback error if content not found
    contentDiv.innerHTML = `<p class="text-red-500">If you are seeing this text, hence the rendering system for markdown isnt working. Direct yourself to /backup/index.html in the report folder</p>`;
}

function select(element) {
    const previous = document.getElementById('selected');

    if (previous == element) { // check 1 - already selected check
        console.log('ignoring')
        return
    }

    if (previous) previous.removeAttribute('id');
    element.id = 'selected';

    const nav_name = element.textContent;
    const filename = tab_file[nav_name];

    if (filename) {
        console.log(`loading ${filename}`);
        load_markdown(filename);
    }
}

/* should override default id tag when clicked to next */
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.addEventListener('click', () => select(tab));
    });

    const default_select = document.getElementById("default");
    select(default_select);
});