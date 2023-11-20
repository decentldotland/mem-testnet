<p align="center">
  <a href="https://decent.land">
    <img src="https://mem-home.vercel.app/icons/mem/mem-logo-v2.svg" height="180">
  </a>
  <h3 align="center"><code>@decentldotland/mem-testnet</code></h3>
  <p align="center">MEM functions simulation testnet</p>
</p>

⚠️ We recommend using the [MEM Carbon Testnet](https://github.com/decentldotland/mem-carbon-testnet) for a smoother, production-like developer experience when testing MEM functions.

## Build & Run

```bash

git pull https://github.com/decentldotland/mem-testnet.git

npm install && npm run build && npm run start

```

## Interact With The Testnet
```js
async function testFunction() {
  try {
    const TESTNET_ENDPOINT = `https://mem-testnet-bfdc8ff3530f.herokuapp.com/`;
    const sc = `
    /**
 *
 * @param state is the current state your application holds
 * @param action is an object containing { input, caller } . Most of the times you will only use \`action.input\` which contains the input passed as a write operation
 * @returns {Promise<{ users: Array<{ username: string}> }>}
 */
export async function handle(state, action) {
    const { username } = action.input;
    state.users.push({ username });
    return { state, result: 'Hello MEM' };
}
    `;

    const input = '{"username": "darwin"}';
    const initState = '{"users": []}';
    const options = {
      contractType: 0,
      initState: initState,
      input: input,
      contractSrc: sc,
    };
    const result = await axios.post(TESTNET_ENDPOINT, options);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

```

## License
This project is licensed under the [MIT License](./LICENSE)




