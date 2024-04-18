import {expectError, expectAssignable, expectNotAssignable} from 'tsd';
import {
	execa,
	execaSync,
	type StdinOption,
	type StdinOptionSync,
	type StdoutStderrOption,
	type StdoutStderrOptionSync,
	type StdioOption,
	type StdioOptionSync,
} from '../../../index.js';

const asyncBinaryIterableFunction = async function * () {
	yield new Uint8Array(0);
};

const asyncBinaryIterable = asyncBinaryIterableFunction();

await execa('unicorns', {stdin: asyncBinaryIterable});
expectError(execaSync('unicorns', {stdin: asyncBinaryIterable}));
await execa('unicorns', {stdin: [asyncBinaryIterable]});
expectError(execaSync('unicorns', {stdin: [asyncBinaryIterable]}));

expectError(await execa('unicorns', {stdout: asyncBinaryIterable}));
expectError(execaSync('unicorns', {stdout: asyncBinaryIterable}));
expectError(await execa('unicorns', {stdout: [asyncBinaryIterable]}));
expectError(execaSync('unicorns', {stdout: [asyncBinaryIterable]}));

expectError(await execa('unicorns', {stderr: asyncBinaryIterable}));
expectError(execaSync('unicorns', {stderr: asyncBinaryIterable}));
expectError(await execa('unicorns', {stderr: [asyncBinaryIterable]}));
expectError(execaSync('unicorns', {stderr: [asyncBinaryIterable]}));

expectError(await execa('unicorns', {stdio: asyncBinaryIterable}));
expectError(execaSync('unicorns', {stdio: asyncBinaryIterable}));

await execa('unicorns', {stdio: ['pipe', 'pipe', 'pipe', asyncBinaryIterable]});
expectError(execaSync('unicorns', {stdio: ['pipe', 'pipe', 'pipe', asyncBinaryIterable]}));
await execa('unicorns', {stdio: ['pipe', 'pipe', 'pipe', [asyncBinaryIterable]]});
expectError(execaSync('unicorns', {stdio: ['pipe', 'pipe', 'pipe', [asyncBinaryIterable]]}));

expectAssignable<StdinOption>(asyncBinaryIterable);
expectNotAssignable<StdinOptionSync>(asyncBinaryIterable);
expectAssignable<StdinOption>([asyncBinaryIterable]);
expectNotAssignable<StdinOptionSync>([asyncBinaryIterable]);

expectNotAssignable<StdoutStderrOption>(asyncBinaryIterable);
expectNotAssignable<StdoutStderrOptionSync>(asyncBinaryIterable);
expectNotAssignable<StdoutStderrOption>([asyncBinaryIterable]);
expectNotAssignable<StdoutStderrOptionSync>([asyncBinaryIterable]);

expectAssignable<StdioOption>(asyncBinaryIterable);
expectNotAssignable<StdioOptionSync>(asyncBinaryIterable);
expectAssignable<StdioOption>([asyncBinaryIterable]);
expectNotAssignable<StdioOptionSync>([asyncBinaryIterable]);
