# lit-jsx 

Write lit-html template literal with JSX

***

![](https://camo.githubusercontent.com/2b5c48821f22738887c98a07f95852b610fb555b/68747470733a2f2f696d672e736869656c64732e696f2f61706d2f6c2f61746f6d69632d64657369676e2d75692e7376673f)
![https://twitter.com/Shinyaigeek](https://img.shields.io/badge/Follow-Shinyaigeek-lightgrey?logo=twitter&style=social)

***

## Features

* Write template literal in lit-html with JSX
* Developer can receive the benefit of `@types/react`
* Simple API

## Installation

```cli
npm install babel-plugin-lit-jsx
```

or

```cli
yarn add babel-plugin-lit-jsx
```

## Usage

1. Add `babel-plugin-lit-jsx` to plugins in babel configuration file.

```javascript
{
    "presets" : [...],
    // add babel-pplugin-lit-jsx plugin
    "plugins" : [..., "babel-plugin-lit-jsx"]
}
```

2. Write Functional Component which doesn't depend on React.

ex)
```tsx
import { BlogContent } from "./BlogContent";
import { render } from "lit-html";

interface Props {
    title: string;
    author: string;
    date: string;
    content: string;
}

const BlogPost = ({ title, author, date, content }: Props) => {
    return <div className="post"><main>
        <div className="title">{title}</div>
        <div className="author">{author}</div>
        <date className="date">{date}</date>
        <BlogContent content={content} />
    </main></div>
}

render(<BlogPost />, document.getElementById("_app"!))

```