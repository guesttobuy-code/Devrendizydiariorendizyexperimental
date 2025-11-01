// Teste de encoding Base64

const apiKey = "a5146970";
const apiSecret = "bfcf4daf";

console.log("Testing Base64 encoding...");
console.log(`Input: ${apiKey}:${apiSecret}`);

// Método 1: TextEncoder (implementado no código)
const credentials1 = `${apiKey}:${apiSecret}`;
const encoder = new TextEncoder();
const data = encoder.encode(credentials1);

let base64_1 = '';
const bytes = new Uint8Array(data);
const len = bytes.byteLength;
for (let i = 0; i < len; i++) {
  base64_1 += String.fromCharCode(bytes[i]);
}
base64_1 = btoa(base64_1);

console.log(`Método 1 (atual): ${base64_1}`);

// Método 2: Direto com btoa (simples)
const base64_2 = btoa(`${apiKey}:${apiSecret}`);
console.log(`Método 2 (simples): ${base64_2}`);

// Esperado
const expected = "YTUxNDY5NzA6YmZjZjRkYWY=";
console.log(`Esperado: ${expected}`);

console.log(`\nMétodo 1 correto? ${base64_1 === expected}`);
console.log(`Método 2 correto? ${base64_2 === expected}`);
