const { Innertube } = require('youtubei.js');
const fs = require('fs');

async function run() {
  try {
    const yt = await Innertube.create();
    
    // Call decipher with a dummy cipher string to force player load & extraction
    console.log('Triggering deciphering...');
    try {
      await yt.session.player.decipher('https://dummy.googlevideo.com/videoplayback', 'abc', 'sig', new Map());
    } catch (e) {
      // Ignored if it fails during execution, we just want the JS to be loaded and built
      console.log('Decipher error (expected):', e.message);
    }
    
    if (yt.session.player && yt.session.player.data) {
      const code = yt.session.player.data.output;
      fs.writeFileSync('extracted_code.js', code);
      console.log('Successfully saved extracted code to extracted_code.js');
    } else {
      console.log('Player data not populated.');
    }
  } catch (err) {
    console.error('Error:', err);
  }
}

run();
