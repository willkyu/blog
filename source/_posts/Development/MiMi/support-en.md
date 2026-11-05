---
title: MiMi Support
author: willkyu
hidden: true
date: 2026-5-28 10:37:16
categories:
  - Development
tags:
  - Development
  - MiMi
---

# MiMi Support

 [中文版本](/Development/MiMi/support/)

This support page is prepared for TestFlight and App Store metadata.

## Contact

- Email: willkyu@qq.com
- Response target: within 3 business days during early testing
- Include your MiMi Trainer ID when asking for account or sync help

## Common Help Topics

### Sign In

MiMi uses Apple Sign In. If sign-in fails, confirm that the app is installed from the expected TestFlight or development build and that network access to the MiMi API is available.

### Collection Sync

Cloud sync is user-initiated. If the cloud has no data, uploading from the current device creates the first cloud snapshot. If both local and cloud data changed, MiMi shows a conflict flow so you can keep local data, pull cloud data, or upload local data intentionally.

### Photos and Media

Catalog images are served by the backend using delivery URLs. User-uploaded photos are stored through the configured media provider. Avoid uploading sensitive personal information.

### Backups

Use the in-app export flow to create a local collection backup before major changes. Importing a backup shows a preview before replacing local collection data.

### MiMi Points Purchases

MiMi Points are optional consumable in-app purchases. If a purchase succeeds but points do not appear after reopening the app, contact support with your MiMi Trainer ID, approximate purchase time, and App Store receipt or transaction details available from Apple.

### Account Deletion

Signed-in users can delete server-side cloud account data from Profile. This removes profile data, cloud collection snapshots, and user media manifest records. Local device data remains on the device unless you remove it separately.

## Operator Checklist for Support Requests

- Confirm the user's Trainer ID.
- Ask whether the issue is local-only, cloud sync, media, or catalog contribution related.
- Run `/ops/status` before diagnosing backend issues.
- For deletion requests, follow `docs/operations/account-data-deletion.md`.

Privacy Policy Page: [/MiMi/privacy-policy/](/Development/MiMi/privacy-policy-en/)
