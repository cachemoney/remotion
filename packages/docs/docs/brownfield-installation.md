---
image: /generated/articles-docs-brownfield-installation.png
id: brownfield
title: Installing Remotion in an existing project
sidebar_label: Installation in existing project
crumb: "Brownfield integration"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Remotion can be installed into any Node.JS based project, such as Create React App, Next.JS apps as well as server-only projects such as an Express API. Get started by adding the following packages:

<Tabs
defaultValue="npm"
values={[
{ label: 'npm', value: 'npm', },
{ label: 'yarn', value: 'yarn', },
{ label: 'pnpm', value: 'pnpm', },
]
}>
<TabItem value="npm">

```bash
npm i @remotion/cli remotion
```

  </TabItem>
  <TabItem value="pnpm">

```bash
pnpm i @remotion/cli remotion
```

  </TabItem>

  <TabItem value="yarn">

```bash
yarn add @remotion/cli remotion
```

  </TabItem>

</Tabs>

- If you'd like to embed a Remotion video in your existing React app, install [`@remotion/player`](/docs/player/installation) as well.
- If you'd like to render a video using the Node.JS APIs, install [`@remotion/renderer`](/docs/renderer) as well.
- If you'd like to trigger a render on Remotion Lambda, install [`@remotion/lambda`](/docs/lambda/setup) as well.

## Setting up the folder structure

Create a new folder for the Remotion files. It can be anywhere and assume any name, in this example we name it `remotion` and put it in the root of our project. Inside the folder you created, create 3 files:

```tsx twoslash title="remotion/Composition.tsx"
export const MyComposition = () => {
  return null;
};
```

```tsx twoslash title="remotion/Root.tsx"
// @filename: Composition.tsx
export const MyComposition: React.FC = () => {
  return null;
};
// @filename: Root.tsx
// ---cut---
import React from "react";
import { Composition } from "remotion";
import { MyComposition } from "./Composition";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Empty"
        component={MyComposition}
        durationInFrames={60}
        fps={30}
        width={1280}
        height={720}
      />
    </>
  );
};
```

```ts twoslash title="remotion/index.ts"
// @filename: Composition.tsx
export const MyComposition: React.FC = () => {
  return null;
};
// @filename: Root.tsx
import React from "react";
import { Composition } from "remotion";
import { MyComposition } from "./Composition";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MyComp"
        component={MyComposition}
        durationInFrames={60}
        fps={30}
        width={1280}
        height={720}
      />
    </>
  );
};
// @filename: index.ts
// ---cut---
import { registerRoot } from "remotion";
import { RemotionRoot } from "./Root";

registerRoot(RemotionRoot);
```

The file that calls [`registerRoot()`](/docs/register-root) is now your Remotion **entrypoint**.

## Starting the preview

Start the preview server using the following command:

```
npx remotion preview remotion/index.ts
```

Replace `remotion/index.ts` with your entrypoint if necessary.

## Render a video

Render our a video using

```
npx remotion render remotion/index.ts MyComp out.mp4
```

Replace the entrypoint, composition name and output filename with the values that correspond to your usecase.

## Install the ESLint Plugin

Remotion has an ESLint plugin that warns about improper usage of Remotion APIs. To add it to your existing project, install it:

<Tabs
defaultValue="npm"
values={[
{ label: 'npm', value: 'npm', },
{ label: 'yarn', value: 'yarn', },
{ label: 'pnpm', value: 'pnpm', },
]
}>
<TabItem value="npm">

```bash
npm i @remotion/eslint-plugin
```

  </TabItem>

  <TabItem value="yarn">

```bash
yarn add @remotion/eslint-plugin
```

  </TabItem>

  <TabItem value="pnpm">

```bash
pnpm i @remotion/eslint-plugin
```

  </TabItem>
</Tabs>

This snippet will enable the recommended rules only for the Remotion files:

```json title=".eslintrc"
{
  "overrides": [
    {
      "files": ["remotion/*.{ts,tsx}"],
      "extends": ["plugin:@remotion/recommended"]
    }
  ]
}
```

## Embed a Remotion video into your React app

You can use the `<Player>` component to display a Remotion video in your React project. Read the [separate page](/docs/player/integration) about it for instructions.
