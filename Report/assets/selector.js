// Import marked from the ES module bundle
import { marked } from '../bundles/markdown.js';

const tab_file = {
    "Investigation & Plan": "plan.md",
    "Design": "design.md",
    "Implementation & Testing": "testing.md",
    "Evaluation": "eval.md",
    "Extra Information": "extras.md"
};

async function load_markdown(filename) {
    const contentDiv = document.getElementById('content');

    try {
        const response = await fetch(`pages/${filename}`);
        if (!response.ok) {
            throw new Error(`fail -> ${filename}`);
        }
        const markdown = await response.text();
        contentDiv.innerHTML = marked.parse(markdown);
    } catch (error) {
        console.error(error);
        contentDiv.innerHTML = `<p class="text-red-500">If this is not rendered yet go to: /Reports/backup/index.html for a backup version that doesn't utilise markdown.js</p>`;
    }
}

function select(element) {
    const previous = document.getElementById('selected');

    if (previous == element) { // check 1 - already selected
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
    // Add click handlers to all nav tabs
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.addEventListener('click', () => select(tab));
    });

    const default_select = document.getElementById("default");
    select(default_select);
});