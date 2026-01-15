const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'n0b3tc1-3cz4n3-s3cr3t-k3y-2024!';

function getKeyBytes(): ArrayBuffer {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(ENCRYPTION_KEY);
  const key = new Uint8Array(32);
  for (let i = 0; i < 32; i++) {
    key[i] = keyData[i % keyData.length];
  }
  return key.buffer.slice(0) as ArrayBuffer;
}

function generateIV(): ArrayBuffer {
  const iv = new Uint8Array(12);
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    crypto.getRandomValues(iv);
  } else {
    for (let i = 0; i < 12; i++) {
      iv[i] = Math.floor(Math.random() * 256);
    }
  }
  return iv.buffer.slice(0) as ArrayBuffer;
}

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer.slice(0) as ArrayBuffer;
}

export async function encryptData(data: unknown): Promise<string> {
  const jsonStr = JSON.stringify(data);
  const encoder = new TextEncoder();
  const dataBytes = encoder.encode(jsonStr);
  
  const keyBuffer = getKeyBytes();
  const ivBuffer = generateIV();
  const ivArray = new Uint8Array(ivBuffer);
  
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    keyBuffer,
    { name: 'AES-GCM' },
    false,
    ['encrypt']
  );
  
  const encrypted = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv: ivBuffer },
    cryptoKey,
    dataBytes
  );
  
  const encryptedArray = new Uint8Array(encrypted);
  const combined = new Uint8Array(ivArray.length + encryptedArray.length);
  combined.set(ivArray, 0);
  combined.set(encryptedArray, ivArray.length);
  
  return arrayBufferToBase64(combined.buffer.slice(0) as ArrayBuffer);
}

export async function decryptData<T = unknown>(encryptedBase64: string): Promise<T> {
  if (!encryptedBase64 || typeof encryptedBase64 !== 'string') {
    throw new Error('Invalid encrypted data');
  }
  
  try {
    const combinedBuffer = base64ToArrayBuffer(encryptedBase64);
    const combined = new Uint8Array(combinedBuffer);
    
    if (combined.length < 13) {
      throw new Error('Encrypted data too short');
    }
    
    const ivBuffer = combined.slice(0, 12).buffer.slice(0) as ArrayBuffer;
    const encryptedBuffer = combined.slice(12).buffer.slice(0) as ArrayBuffer;
    
    const keyBuffer = getKeyBytes();
    
    const cryptoKey = await crypto.subtle.importKey(
      'raw',
      keyBuffer,
      { name: 'AES-GCM' },
      false,
      ['decrypt']
    );
    
    const decrypted = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: ivBuffer },
      cryptoKey,
      encryptedBuffer
    );
    
    const decoder = new TextDecoder();
    const jsonStr = decoder.decode(decrypted);
    
    return JSON.parse(jsonStr);
  } catch {
    throw new Error('Decryption failed');
  }
}

export function isEncryptedResponse(data: unknown): data is { _e: string } {
  return typeof data === 'object' && data !== null && '_e' in data && typeof (data as { _e: unknown })._e === 'string';
}
