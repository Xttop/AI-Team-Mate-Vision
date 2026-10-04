# Altima ML Vision — Meta VR Glasses

This project targets **Meta VR Glasses** on Meta Horizon OS using Meta Spatial SDK.

## Why this target

Meta VR Glasses match the Altima ML Vision concept: the AI sports assistant stays in the user's field of view while the user trains in the real world. The glasses provide eye tracking, hand interaction and passthrough mixed reality.

## Current prototype

- Passthrough mixed-reality mode
- Spatial Compose HUD positioned in front of the athlete
- Look + pinch interaction path
- Eye-tracking permission support
- HMD-gaze fallback for testing on hardware without eye tracking
- Rep counter
- Form score and coaching cue
- Heart-rate HUD placeholder
- Session controls
- Device targeting set to `quest3+`, which includes Meta VR Glasses / future devices

## Development path

The phone Android app remains in `android-app/` as the companion application.

This folder is the immersive glasses application:
- phone app = profile, history, setup, wearable pairing
- Meta VR Glasses app = live AI coach, passthrough, gaze/pinch UI, movement feedback

## Testing before Meta VR Glasses ship

Meta recommends using Quest 3 / Quest 3S and supported simulator workflows for early development. Final validation must be performed on Meta VR Glasses hardware.

## Next engineering milestones

1. Connect live workout state between Android phone and Horizon OS glasses app.
2. Add real sports-watch data.
3. Add passthrough camera CV pipeline / pose analysis where supported.
4. Replace the 2D coach placeholder with a spatial 3D trainer/avatar.
5. Add exercise recognition and real-time technique correction.
6. Test gaze + pinch ergonomics in a gym environment.
