import { JsonRpcUtil } from '@kkito/jsonrpc';

const disp = JsonRpcUtil.getDispatcher();
disp.add('add', (a, b) => a + b);
const result = JsonRpcUtil.handle({
	id: 1,
	method: 'add',
	version: '2.0',
	params: [3, 4],
});

// { jsonrpc: '2.0', id: 1, result: 7 }
console.log(result);

// deal with async
const asyncResult = JsonRpcUtil.asyncHandle({
	id: 1,
	method: 'asyncAdd',
	version: '2.0',
	params: [3, 4],
});
// { jsonrpc: '2.0', id: 1, result: 7 }
asyncResult.then(data => console.log(data));
