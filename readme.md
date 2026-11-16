# Video Volume Adjuster

Give a video editor concrete music and voice level feedback from a simple browser form.

## Try the review workflow

1. From this folder, run `npm install`.
2. Add a local `.env` with `BREVO_API_KEY`, `EMAIL_FROM`, and `EMAIL_TO`. Use a Brevo-approved sender and your own test inbox for an end-to-end test.
3. Supply the files referenced by [the review page](public/index.html) at `public/videos/video.mp4`, `public/audio/music.mp3`, and `public/audio/vocals.mp3`.
4. Run `node server.js`, open [localhost:3000](http://localhost:3000), choose the music and vocal settings, and click **Send Volume Settings**.

The current submission path emails the chosen slider values and mute preference. The checked-in client does not wire the sliders to live playback, and the sample media is external. Treat this as a feedback-form prototype. Run the email endpoint privately while testing.

## Interface preview

![Volume review form in a local browser capture](docs/media/volume-adjuster.png)

Local interface capture; media files and the submission service are not configured.

[Watch the local controls interaction recording](docs/media/volume-controls.webm) (no backend submission or audio playback is shown).

## Request flow

```mermaid
flowchart LR
  Reviewer[Browser form] -->|Volume choices| Express[Express server]
  Express -->|Email payload| Brevo[Brevo API]
  Brevo --> Recipient[Configured review inbox]
```

The repository does not include the media files named above. This version sends review settings; it does not render or export an adjusted video mix.
