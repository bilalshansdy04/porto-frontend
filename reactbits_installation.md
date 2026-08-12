# Installation

> Source: https://reactbits.dev/get-started/installation
> React Bits — an open source collection of animated React components.

Add React Bits components two ways — copy the source by hand, or pull them in with a CLI. Your choice is saved and used across the site.

## Pick the method

_Selected: **Manual**_

## Steps

Copy a component's source straight into your project.

### 1. Pick a component

Browse the library, open a component you like, and switch to its **Code** tab.

### 2. Set your stack

Choose your language and styling below. Every **Code** tab across the site updates to match, and your choice is remembered on this device.

_Selected stack: **JS + CSS**_

### 3. Copy the code

The **Code** tab now shows the full source for your selected stack — copy it into a new file in your project.

### 4. Install dependencies & use it

If a component relies on external libraries, its **Code** tab lists them. Install what it needs:

```bash
npm install gsap
```

Then import and render it like any other component:

```jsx
import SplitText from "./SplitText";

<SplitText text="Hello, you!" delay={100} duration={0.6} />;
```

## That's all!

From here on, it's all about how you integrate the component into your project. The code is yours to play around with — modify styling, functionality, anything goes!
