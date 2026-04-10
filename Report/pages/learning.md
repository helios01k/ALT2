# Markdown.js (Marked) Rendering Reference

## Headings
# H1 Heading
## H2 Heading
### H3 Heading
#### H4 Heading
##### H5 Heading
###### H6 Heading

---

## Text Formatting
**Bold text**
*Italic text*
***Bold and italic***
~~Strikethrough~~
`Inline code`

---

## Lists

### Unordered List
- Item 1
- Item 2
  - Nested item
  - Another nested item
- Item 3

### Ordered List
1. First item
2. Second item
   1. Nested numbered
   2. Another nested
3. Third item

### Task List (GFM)
- [x] Completed task
- [ ] Incomplete task
- [ ] Another task

---

## Links and Images
[Link text](https://example.com)
[Link with title](https://example.com "Hover title")

![Alt text for image](https://via.placeholder.com/150)

---

## Blockquotes
> This is a blockquote.
> It can span multiple lines.
>
> > Nested blockquotes work too.

---

## Code Blocks

Inline: `const x = 10;`

Fenced code block:
```javascript
function hello() {
    console.log("Hello, world!");
}
```

```python
def greet(name):
    print(f"Hello, {name}!")
```

---

## Tables (GFM)
| Column 1 | Column 2 | Column 3 |
|----------|:--------:|---------:|
| Left     | Center   | Right    |
| Data     | Data     | Data     |
| More     | More     | More     |

---

## Horizontal Rules
Three or more dashes, asterisks, or underscores:

---
***
___

---

## HTML (Raw)
<div style="color: blue;">Raw HTML is supported</div>
<mark>Highlighted text</mark>

---

## Escaping
Use backslash to escape special characters:
\*not italic\*
\# not a heading

---

## Paragraphs
Paragraphs are separated by blank lines.

This is a new paragraph. Lorem ipsum dolor sit amet, consectetur adipiscing elit.

---

## Line Breaks
End a line with two spaces
to create a line break.

Or use a backslash\
for a line break.
