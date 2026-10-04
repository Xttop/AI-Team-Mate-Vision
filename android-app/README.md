# Altima ML Vision — Android

Native Android MVP built with React Native + Expo.

## Core product direction

AR/VR glasses are the signature Altima ML Vision interface. The phone app manages the user profile, training plan, camera-based testing, wearable status, workout history and launch/control of the immersive glasses session.

## Working in this MVP

- Home dashboard and AI Sports Assistant overview
- Workout selection and session controls
- Repetition counter and rest timer
- Live phone camera mode with training HUD
- AR/VR glasses experience screen and device connection flow
- Wearable / heart-rate status mock
- Personal profile and personalization controls
- Dark neon visual language matching the presentation

## Next hardware integrations

1. Choose the first target glasses SDK (Meta Quest / Android XR / XREAL / other).
2. Add real glasses pairing/session transport.
3. Add pose estimation and exercise recognition.
4. Integrate Android Health Connect / smartwatch data.
5. Validate in a gym with cameras, glasses and sports wearables.

## Run locally

```bash
cd android-app
npm install
npx expo start
```

For an Android native build:

```bash
npm run build:apk
```

A GitHub Actions workflow in this repository also builds a downloadable debug APK.
