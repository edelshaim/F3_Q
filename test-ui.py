import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        # Desktop
        page = await browser.new_page(viewport={'width': 1280, 'height': 800})
        await page.goto("http://localhost:3000")
        await page.wait_for_timeout(2000)

        # Click Play button on desktop timer
        desktop_timer = page.locator(".hidden.lg\\:block .glass-panel").first
        await desktop_timer.wait_for(state="visible")
        play_btn = desktop_timer.locator("button").first
        await play_btn.click()
        await page.wait_for_timeout(2000) # Let it run for 2 seconds

        await page.screenshot(path="desktop.png")

        # Resize to mobile
        await page.set_viewport_size({'width': 375, 'height': 812})
        await page.wait_for_timeout(2000)
        await page.screenshot(path="mobile.png")

        await browser.close()

asyncio.run(run())
