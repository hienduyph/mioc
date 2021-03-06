# mio platforms
An easy way to build the TypeScript/JavaScript application with Dependency Injection

## Installation
Get the latest from `yarn` or `npm`
```bash
$ yarn add miocore
# or using npm
$ npm install miocore --save
```
With inversify we must declare an interface and a unique key to make thing done.

We wrapper the inversify and generate the `token` in the fly. Let's rewrite the inversify example:

### Step 1: Import neccessary libs and define our interfaces
We use abstract class because TypeScript doesn't have interface decorators

```typescript
import "reflect-metadata";
import * as assert from "assert";
import { Injectable, Container } from "miocore";

@Injectable()
abstract class Warrior {
  public abstract fight(): string;
  public abstract sneak(): string;
}

@Injectable()
abstract class Weapon {
  public abstract hit(): string;
}

@Injectable()
abstract class ThrowableWeapon {
  public abstract throw (): string;
}
```

### Step 2: Implements the above abstract classes
Notes: **TypeScript allow us implement the abstract class**
```typescript
@Injectable()
class Katana implements Weapon {
  public hit() {
    return "cut!";
  }
}

@Injectable()
class Shuriken implements ThrowableWeapon {
  public throw () {
    return "hit!";
  }
}

@Injectable()
class Ninja implements Warrior {
  public constructor(
    // we don't need @inject any more, just like the angular way
    private katana: Weapon,
    private shuriken: ThrowableWeapon
  ) {}

  public fight() {
    return this.katana.hit();
  }
  public sneak() {
    return this.shuriken.throw();
  }
}
```
### Step 3: Create container

```typescript 
const myContainer = new Container();
myContainer
  .register({ target: Weapon, implementation: Katana })
  .register({ target: ThrowableWeapon, implementation: Shuriken })
  .register({ target: Warrior, implementation: Ninja });
```
### Step 4: Resolve dependencies

```typescript
const ninja = myContainer.get<Warrior>(Warrior);

assert(ninja.fight() === "cut!"); // true
assert(ninja.sneak() === "hit!"); // true
```

# LICENSE
License under the MIT License (MIT)

Copyright © 2018 Hien Pham
[See more](LICENSE)
