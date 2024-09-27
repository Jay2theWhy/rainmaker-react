# Rainmaker React Component

This React Component generates a rain effect in an html canvas. Check out a demo of it here: [demo](https://jay2thewhy.github.io/rainmaker-demo/)

## How to use

1. Install from npm:

```bash
npm install rainmaker-react
```

2. Import the React Component in your file

```js
import { RainEffect } from "rainmaker-react";
```

3. Use the default React Component for use your customize your own properties

```js
// default
<RainEffect />

// custom
<RainEffect
    className="rain-effect"
    count={COUNT}
    wind={WIND}
    fps={FPS}
    fallSpeed={FALLSPEED}
    jitterX={JITTER}
    dropletLength={LENGTH}
    dropletWidth={WIDTH}
    dropletStyle={STYLE}
    bgStyle={BGSTYLE}
    noBackground={NO_BACKGROUND}
/>
```
