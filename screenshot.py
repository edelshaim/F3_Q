import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()

        # Desktop
        context_desktop = await browser.new_context(viewport={'width': 1280, 'height': 800})
        page_desktop = await context_desktop.new_page()
        await page_desktop.goto("http://localhost:3000/")
        await page_desktop.wait_for_selector(".glass-panel")
        await page_desktop.screenshot(path="desktop.png", full_page=True)
        await context_desktop.close()

        # Mobile
        context_mobile = await browser.new_context(viewport={'width': 375, 'height': 812})
        page_mobile = await context_mobile.new_page()
        await page_mobile.goto("http://localhost:3000/")
        await page_mobile.wait_for_selector(".glass-panel")
        await page_mobile.screenshot(path="mobile.png", full_page=True)
        await context_mobile.close()

        await browser.close()

asyncio.run(main())
