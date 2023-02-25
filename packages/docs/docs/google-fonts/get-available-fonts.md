---
image: /generated/articles-docs-google-fonts-get-available-fonts.png
title: getAvailableFonts()
crumb: "@remotion/google-fonts"
---

import {AvailableFonts} from '../../components/AvailableFonts'

_Part of the [`@remotion/google-fonts`](/docs/google-fonts) package_

Static array of all available fonts available in `@remotion/google-fonts`.

## Usage

```ts twoslash
import { getAvailableFonts } from "@remotion/google-fonts";

console.log(getAvailableFonts());
```

```json title="JSON structure (shortened)"
[
  {
    "fontFamily": "ABeeZee",
    "importName": "ABeeZee"
  },
  {
    "fontFamily": "Abel",
    "importName": "Abel"
  },
  {
    "fontFamily": "Abhaya Libre",
    "importName": "AbhayaLibre"
  }
]
```

- `fontFamily` is how the name should be referenced in CSS.
- `importName` is the identifier of how the font can be imported: `@remotion/google-fonts/[import-name]`.

## List of available fonts

<AvailableFonts />

## See also

- [Fonts](/docs/fonts)
- [`@remotion/google-fonts`](/docs/google-fonts)
