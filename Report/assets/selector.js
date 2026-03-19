function select(element) {
   //console.log(element)

    const previous = document.getElementById('selected');

    if (previous == element) { // check 1
        console.log('ignoring')
        return
    }

    if (previous) previous.removeAttribute('id');
    element.id = 'selected';

    const nav_name = element.textContent
   // console.log(nav_name)

    if (nav_name == "Investigation & Plan") {
        console.log('plan.md')
    }

    if (nav_name == "Design") {
        console.log('design.md')
    }

    if (nav_name == "Implementation & Testing") {
        console.log('testing.md')
    }

    if (nav_name == "Evaluation") {
        console.log('eval.md')
    }

    if (nav_name == "Extra Information") {
        console.log('extras.md')
    }
}
/* should override default id tag when clicked to next */
document.addEventListener("DOMContentLoaded", () => {
    const default_select = document.getElementById("default");
    select(default_select)
});