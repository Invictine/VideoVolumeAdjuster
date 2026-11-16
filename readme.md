# Video Volume Adjuster

Give a video editor concrete music and voice level feedback from a simple browser form.

## Try the review workflow

1. From this folder, run `npm install`.
2. Add a local `.env` with `BREVO_API_KEY`, `EMAIL_FROM`, and `EMAIL_TO`. Use a Brevo-approved sender and your own test inbox for an end-to-end test.
3. Supply the files referenced by [the review page](public/index.html) at `public/videos/video.mp4`, `public/audio/music.mp3`, and `public/audio/vocals.mp3`.
4. Run `node server.js`, open [localhost:3000](http://localhost:3000), choose the music and vocal settings, and click **Send Volume Settings**.

The current submission path emails the chosen slider values and mute preference. The checked-in client does not wire the sliders to live playback, and the sample media is external. Treat this as a feedback-form prototype. Run the email endpoint privately while testing.
