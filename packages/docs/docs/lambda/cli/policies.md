---
id: policies
sidebar_label: policies
title: "npx remotion lambda policies"
slug: /lambda/cli/policies
---

import {RolePolicy} from '../../../components/lambda/role-permissions.tsx';
import {UserPolicy} from '../../../components/lambda/user-permissions.tsx';

Prints the necessary permissions to be inserted into the AWS console during [setup](/docs/lambda/setup).

:::tip
On macOS, add `| pbcopy` to the end of the command to copy the output.
:::

## role

```
npx remotion lambda policies role
```

<details>
<summary>Show output
</summary>
  <RolePolicy />
</details>

## user

```
npx remotion lambda policies user
```

<details>
<summary>Show output
</summary>
  <UserPolicy />
</details>

## validate

Goes through all user permissions and validates them against the AWS Policy simulator. (Role permissions cannot be validated)

## See also

- [Setup guide](/docs/lambda/setup)