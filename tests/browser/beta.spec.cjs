const {test,expect}=require('@playwright/test');
test.beforeEach(async({page})=>{
 await page.route('**/*',route=>{const u=new URL(route.request().url());if(u.hostname==='127.0.0.1')return route.continue();return route.fulfill({status:200,contentType:'application/json',body:JSON.stringify(u.pathname.includes('highscores')?[]:{})});});
 await page.addInitScript(()=>{localStorage.setItem('stampertjesSeenVersion','2.5-beta');localStorage.setItem('stampertjesNameAsked','1');localStorage.setItem('stampertjesMusic','0');});
});
test('HD menu and existing sections stay available',async({page},info)=>{
 test.setTimeout(90000);const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto('/');await expect(page.locator('#bossPracticeBtn')).toBeVisible();await page.screenshot({path:info.outputPath('menu.png'),fullPage:true});
 for(const [b,s] of [['scoresMenuBtn','scoresSection'],['historyMenuBtn','historySection'],['newsMenuBtn','roadmapSection'],['hallMenuBtn','hallSection'],['merchMenuBtn','merchSection'],['helpMenuBtn','helpSection']]){await page.locator('#'+b).click();await expect(page.locator('#'+s)).toBeVisible();await page.locator('#'+s+' [data-back]').click();}
 expect(errors).toEqual([]);
});
test('all ten HD rooms render, including repaired dungeon',async({page},info)=>{
 test.setTimeout(120000);const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto('/');const stats=await page.evaluate(()=>localStorage.getItem('stampertjesStats'));
 for(let i=0;i<10;i++){await page.locator('#atlasOpenBtn').click();if(i===0)await page.screenshot({path:info.outputPath('atlas.png'),fullPage:true});await page.locator('.atlasRoom').nth(i).click();await expect(page.locator('#overlay')).toBeHidden();await page.waitForTimeout(150);await page.screenshot({path:info.outputPath(`room-${i+1}.png`)});await page.locator('#pauseToggle').click();await page.locator('#devPortalBtn').click();await expect(page.locator('#mainMenu')).toBeVisible();await page.waitForTimeout(260);}
 expect(await page.evaluate(()=>localStorage.getItem('stampertjesStats'))).toBe(stats);expect(errors).toEqual([]);
});
test('tap destination moves the player and follows a ladder',async({page})=>{
 test.setTimeout(60000);await page.goto('/');await page.locator('#atlasOpenBtn').click();await page.locator('.atlasRoom').first().click();if(!await page.locator('body').evaluate(b=>b.classList.contains('tapMovement')))await page.locator('#touchMode').click();
 // Practice fixture removes enemies so this tests routing, not random collisions.
 await page.evaluate(()=>{enemies=[];levelTransitioning=true;player.x=215;player.y=772;});
 const box=await page.locator('#game').boundingBox();await page.locator('#game').click({position:{x:box.width*312/600,y:box.height*610/840}});
 await expect.poll(()=>page.evaluate(()=>({x:Math.round(player.x),y:Math.round(player.y)})),{timeout:15000}).toEqual({x:296,y:597});
 await page.locator('#pauseToggle').click();await expect(page.locator('#pauseOverlay')).toBeVisible();await page.waitForTimeout(220);await page.keyboard.press('Escape');await expect(page.locator('#pauseOverlay')).toBeHidden();
});
test('boss practice plays, pauses and exits without changing normal records',async({page},info)=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto('/');const stats=await page.evaluate(()=>localStorage.getItem('stampertjesStats'));
 await page.locator('#bossPracticeBtn').click();await expect(page.locator('#bossCurtain')).toBeVisible();await page.screenshot({path:info.outputPath('boss-guide.png')});await page.locator('#bossContinue').click();await expect(page.locator('#bossHealth')).toContainText('◆◆◆◆◆');
 await page.screenshot({path:info.outputPath('boss-arena.png')});await page.keyboard.press('Escape');await expect(page.locator('#bossDialogTitle')).toContainText('adem');await page.locator('#bossContinue').click();await expect(page.locator('#bossCurtain')).toBeHidden();await page.locator('#bossPause').click();await page.locator('#bossQuit').click();await expect(page.locator('#mainMenu')).toBeVisible();expect(await page.evaluate(()=>localStorage.getItem('stampertjesStats'))).toBe(stats);expect(errors).toEqual([]);
});
test('boss trap can be built using real pointer input',async({page},info)=>{
 test.setTimeout(60000);await page.goto('/');await page.locator('#bossPracticeBtn').click();await page.locator('#bossContinue').click();const box=await page.locator('#bossCanvas').boundingBox();await page.locator('#bossCanvas').click({position:{x:box.width*250/600,y:box.height*235/800}});await page.waitForTimeout(1050);
 for(let i=0;i<3;i++){await page.locator('#bossStamp').click();await page.waitForTimeout(350);}
 await expect(page.locator('#bossInstruction')).toContainText('VERSUFT',{timeout:15000});await page.screenshot({path:info.outputPath('boss-stunned.png')});
});
test('portrait and landscape keep gameplay and boss controls in view',async({page},info)=>{
 test.setTimeout(90000);
 for(const size of [{width:320,height:700},{width:390,height:844},{width:844,height:390}]){await page.setViewportSize(size);await page.goto('/');await page.locator('#bossPracticeBtn').click();await page.locator('#bossContinue').click();for(const id of ['bossStamp','bossPause','bossCanvas']){const b=await page.locator('#'+id).boundingBox();expect(b.x).toBeGreaterThanOrEqual(0);expect(b.x+b.width).toBeLessThanOrEqual(size.width+1);expect(b.y+b.height).toBeLessThanOrEqual(size.height+1);}await page.screenshot({path:info.outputPath(`boss-${size.width}.png`)});await page.locator('#bossPause').click();await page.locator('#bossQuit').click();await page.locator('#playMenuBtn').click();for(const id of ['pauseToggle','touchMode','game']){const b=await page.locator('#'+id).boundingBox();expect(b.x).toBeGreaterThanOrEqual(0);expect(b.x+b.width).toBeLessThanOrEqual(size.width+1);expect(b.y+b.height).toBeLessThanOrEqual(size.height+1);}await page.screenshot({path:info.outputPath(`play-${size.width}.png`)});}
});
test('offline menu still starts practice and boss',async({page})=>{await page.route('**/rest/**',route=>route.abort());await page.goto('/');await page.locator('#scoresMenuBtn').click();await expect(page.locator('#scoreList')).toContainText('lokale');await page.locator('#scoresSection [data-back]').click();await page.locator('#bossPracticeBtn').click();await page.locator('#bossContinue').click();await expect(page.locator('#bossCanvas')).toBeVisible();});
