/**
 * CDP-based screenshot script - uses existing Chrome/Edge debug session at port 9222
 * Opens a new tab, navigates to the site, takes screenshots via CDP
 */
import { createRequire } from 'module';
import { writeFileSync, mkdirSync } from 'fs';
import { createConnection } from 'net';
import { randomBytes } from 'crypto';
import http from 'http';

const CDP_HOST = 'localhost';
const CDP_PORT = 9222;
const TARGET_URL = 'http://localhost:3000/brawijaya-esport/';
const OUTPUT_DIR = 'C:\\Users\\LENOVO\\.gemini\\antigravity\\brain\\5c3962cd-f624-4a1a-9871-35e30a066875';

// Ensure output dir exists
try { mkdirSync(OUTPUT_DIR, { recursive: true }); } catch(e) {}

function httpGet(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
      res.on('error', reject);
    }).on('error', reject);
  });
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Minimal WebSocket client for CDP
class CDPClient {
  constructor(wsUrl) {
    this.wsUrl = wsUrl;
    this.ws = null;
    this.msgId = 1;
    this.pending = new Map();
    this.events = new Map();
  }

  connect() {
    return new Promise((resolve, reject) => {
      const url = new URL(this.wsUrl);
      const key = randomBytes(16).toString('base64');
      
      const req = http.request({
        hostname: url.hostname,
        port: url.port,
        path: url.pathname,
        headers: {
          'Connection': 'Upgrade',
          'Upgrade': 'websocket',
          'Sec-WebSocket-Key': key,
          'Sec-WebSocket-Version': '13',
          'Host': `${url.hostname}:${url.port}`,
        },
      });

      req.on('upgrade', (res, socket, head) => {
        this.socket = socket;
        this.buffer = head;
        this._setupSocket(socket);
        resolve();
      });

      req.on('error', reject);
      req.end();
    });
  }

  _setupSocket(socket) {
    socket.on('data', (data) => {
      // Append to buffer
      this.buffer = Buffer.concat([this.buffer, data]);
      this._parseFrames();
    });
  }

  _parseFrames() {
    while (this.buffer.length >= 2) {
      const b0 = this.buffer[0];
      const b1 = this.buffer[1];
      // const fin = (b0 & 0x80) !== 0;
      const opcode = b0 & 0x0f;
      const masked = (b1 & 0x80) !== 0;
      let payloadLen = b1 & 0x7f;
      let offset = 2;

      if (payloadLen === 126) {
        if (this.buffer.length < 4) break;
        payloadLen = this.buffer.readUInt16BE(2);
        offset = 4;
      } else if (payloadLen === 127) {
        if (this.buffer.length < 10) break;
        payloadLen = Number(this.buffer.readBigUInt64BE(2));
        offset = 10;
      }

      if (masked) offset += 4;
      if (this.buffer.length < offset + payloadLen) break;

      const payload = this.buffer.slice(offset, offset + payloadLen);
      this.buffer = this.buffer.slice(offset + payloadLen);

      if (opcode === 1) {
        // Text frame
        const msg = JSON.parse(payload.toString('utf8'));
        if (msg.id && this.pending.has(msg.id)) {
          const { resolve, reject } = this.pending.get(msg.id);
          this.pending.delete(msg.id);
          if (msg.error) reject(new Error(msg.error.message));
          else resolve(msg.result);
        } else if (msg.method) {
          const handler = this.events.get(msg.method);
          if (handler) handler(msg.params);
        }
      }
    }
  }

  _sendFrame(data) {
    const payload = Buffer.from(data, 'utf8');
    const len = payload.length;
    let header;
    if (len < 126) {
      header = Buffer.from([0x81, len]);
    } else if (len < 65536) {
      header = Buffer.allocUnsafe(4);
      header[0] = 0x81; header[1] = 126;
      header.writeUInt16BE(len, 2);
    } else {
      header = Buffer.allocUnsafe(10);
      header[0] = 0x81; header[1] = 127;
      header.writeBigUInt64BE(BigInt(len), 2);
    }
    this.socket.write(Buffer.concat([header, payload]));
  }

  send(method, params = {}) {
    const id = this.msgId++;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this._sendFrame(JSON.stringify({ id, method, params }));
      // Timeout
      setTimeout(() => {
        if (this.pending.has(id)) {
          this.pending.delete(id);
          reject(new Error(`Timeout waiting for ${method}`));
        }
      }, 15000);
    });
  }

  on(event, handler) {
    this.events.set(event, handler);
  }

  close() {
    if (this.socket) this.socket.destroy();
  }
}

async function saveScreenshot(client, filename) {
  const result = await client.send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
  const bytes = Buffer.from(result.data, 'base64');
  const fullPath = `${OUTPUT_DIR}\\${filename}`;
  writeFileSync(fullPath, bytes);
  console.log(`Saved: ${fullPath}`);
  return fullPath;
}

async function main() {
  console.log('Fetching CDP targets...');
  const targets = await httpGet(`http://${CDP_HOST}:${CDP_PORT}/json`);
  console.log('Existing targets:', targets.map(t => t.url).join(', '));

  // Create a new tab
  console.log('Creating new tab...');
  const newTarget = await httpGet(`http://${CDP_HOST}:${CDP_PORT}/json/new?${encodeURIComponent(TARGET_URL)}`);
  console.log('New tab created:', newTarget);

  const wsUrl = newTarget.webSocketDebuggerUrl;
  console.log(`Connecting to WebSocket: ${wsUrl}`);
  
  const client = new CDPClient(wsUrl);
  await client.connect();
  console.log('Connected to CDP!');

  // Enable required domains
  await client.send('Page.enable');
  await client.send('Runtime.enable');
  await client.send('Network.enable');

  // Set viewport
  await client.send('Emulation.setDeviceMetricsOverride', {
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false,
  });
  console.log('Viewport set to 1440x900');

  // Navigate
  console.log(`Navigating to ${TARGET_URL}...`);
  await client.send('Page.navigate', { url: TARGET_URL });
  
  // Wait for page load
  await new Promise((resolve) => {
    client.on('Page.loadEventFired', resolve);
    setTimeout(resolve, 10000); // fallback
  });

  console.log('Page loaded! Waiting 5 seconds for animations...');
  await sleep(5000);

  // Screenshot 1: Hero (top of page)
  await client.send('Runtime.evaluate', { expression: 'window.scrollTo(0, 0)' });
  await sleep(1000);
  const heroPath = await saveScreenshot(client, 'actual_hero.png');

  // Screenshot 2: About section
  await client.send('Runtime.evaluate', {
    expression: `
      const el = document.querySelector('#about') || document.querySelector('[id*="about"]') || document.querySelectorAll('section')[1];
      if (el) el.scrollIntoView({ behavior: 'instant' });
      else window.scrollTo(0, window.innerHeight);
    `
  });
  await sleep(1500);
  const aboutPath = await saveScreenshot(client, 'actual_about.png');

  // Screenshot 3: Events section
  await client.send('Runtime.evaluate', {
    expression: `
      const el = document.querySelector('#events') || document.querySelector('[id*="event"]') || document.querySelectorAll('section')[2];
      if (el) el.scrollIntoView({ behavior: 'instant' });
      else window.scrollTo(0, window.innerHeight * 2);
    `
  });
  await sleep(1500);
  const eventsPath = await saveScreenshot(client, 'actual_events.png');

  // Screenshot 4: Footer
  await client.send('Runtime.evaluate', {
    expression: `
      const el = document.querySelector('footer') || document.querySelector('#contact') || document.querySelector('[id*="footer"]');
      if (el) el.scrollIntoView({ behavior: 'instant' });
      else window.scrollTo(0, document.body.scrollHeight);
    `
  });
  await sleep(1500);
  const footerPath = await saveScreenshot(client, 'actual_footer.png');

  // Close the tab
  await httpGet(`http://${CDP_HOST}:${CDP_PORT}/json/close/${newTarget.id}`).catch(() => {});
  client.close();

  console.log('\n=== All screenshots saved successfully ===');
  console.log(heroPath);
  console.log(aboutPath);
  console.log(eventsPath);
  console.log(footerPath);
}

main().catch(err => {
  console.error('ERROR:', err);
  process.exit(1);
});
