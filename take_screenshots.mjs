import puppeteer from 'puppeteer';
import { promises as fs } from 'fs';
import path from 'path';

const OUTPUT_DIR = 'C:\\Users\\LENOVO\\.gemini\\antigravity\\brain\\5c3962cd-f624-4a1a-9871-35e30a066875';
const BASE_URL = 'http://localhost:3000/brawijaya-esport/';

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();

  // Set viewport to 1440px wide
  await page.setViewport({ width: 1440, height: 900 });

  console.log(`Navigating to ${BASE_URL}...`);
  await page.goto(BASE_URL, { waitUntil: 'networkidle0', timeout: 30000 });

  console.log('Waiting 5 seconds for animations...');
  await sleep(5000);

  // Screenshot 1: Hero section (top of page)
  console.log('Scrolling to top for Hero section...');
  await page.evaluate(() => window.scrollTo(0, 0));
  await sleep(1000);
  const heroPath = path.join(OUTPUT_DIR, 'actual_hero.png');
  await page.screenshot({ path: heroPath, fullPage: false });
  console.log(`Saved: ${heroPath}`);

  // Screenshot 2: About section
  console.log('Scrolling to About section...');
  await page.evaluate(() => {
    const about = document.querySelector('#about') || document.querySelector('[id*="about" i]') || document.querySelector('section:nth-child(2)');
    if (about) {
      about.scrollIntoView({ behavior: 'instant' });
    } else {
      window.scrollTo(0, window.innerHeight);
    }
  });
  await sleep(1500);
  const aboutPath = path.join(OUTPUT_DIR, 'actual_about.png');
  await page.screenshot({ path: aboutPath, fullPage: false });
  console.log(`Saved: ${aboutPath}`);

  // Screenshot 3: Events section
  console.log('Scrolling to Events section...');
  await page.evaluate(() => {
    const events = document.querySelector('#events') || document.querySelector('[id*="event" i]') || document.querySelector('section:nth-child(3)');
    if (events) {
      events.scrollIntoView({ behavior: 'instant' });
    } else {
      window.scrollTo(0, window.innerHeight * 2);
    }
  });
  await sleep(1500);
  const eventsPath = path.join(OUTPUT_DIR, 'actual_events.png');
  await page.screenshot({ path: eventsPath, fullPage: false });
  console.log(`Saved: ${eventsPath}`);

  // Screenshot 4: Footer section
  console.log('Scrolling to Footer...');
  await page.evaluate(() => {
    const footer = document.querySelector('footer') || document.querySelector('[id*="footer" i]') || document.querySelector('#contact');
    if (footer) {
      footer.scrollIntoView({ behavior: 'instant' });
    } else {
      window.scrollTo(0, document.body.scrollHeight);
    }
  });
  await sleep(1500);
  const footerPath = path.join(OUTPUT_DIR, 'actual_footer.png');
  await page.screenshot({ path: footerPath, fullPage: false });
  console.log(`Saved: ${footerPath}`);

  await browser.close();
  console.log('Done! All screenshots saved.');
  
  // Print summary
  console.log('\nSaved files:');
  console.log(heroPath);
  console.log(aboutPath);
  console.log(eventsPath);
  console.log(footerPath);
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
