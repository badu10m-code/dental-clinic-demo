# Security Specification: SmileCraft Dental Studio

## 1. Data Invariants

1. **Default Deny:** All unmapped paths or operations not explicitly granted are rejected by default.
2. **Bootstrapped Admin:** The clinic owner (`sudipta2santra@gmail.com`) with `request.auth.token.email_verified == true` or documents in `/admins/{adminUid}` have administrative privileges.
3. **Public Booking:** Patients can create appointments via the public booking form without requiring pre-registration, but each appointment payload must strictly validate field types, boundary limits (`name.size() <= 100`, `phone.size() <= 25`), required keys, and enum values.
4. **PII Isolation:** The `/patients/` collection contains confidential medical ledger notes and phone numbers. Read and write access is strictly locked to verified administrators (`isAdmin()`).
5. **Content Integrity:** Public visitors can read clinic posts (`/posts`), announcement banners (`/banners`), and global settings (`/settings`), but only authenticated administrators can create, update, or delete them.
6. **Appointment State Safeguards:** Only administrators can mutate appointment statuses (`'new' | 'confirmed' | 'done' | 'cancelled'`) or delete records.

---

## 2. The "Dirty Dozen" Payloads (Must Return PERMISSION_DENIED)

1. **Payload 1 (Unauthenticated Admin Escalation):**
   Unauthenticated write to `/admins/hacker` with `{"email": "hacker@evil.com", "role": "admin"}`.
   *Expected: PERMISSION_DENIED*

2. **Payload 2 (Patient Ledger Snooping):**
   Unauthenticated or non-admin patient read on `/patients/{patientId}`.
   *Expected: PERMISSION_DENIED*

3. **Payload 3 (Appointment Ghost Field Injection):**
   Unauthenticated create on `/appointments/SCD-ATTACK` with extra injected field `{"isVip": true, "billingDiscount": 100}`.
   *Expected: PERMISSION_DENIED* (strict keys check fails)

4. **Payload 4 (Oversized Patient Name Denial-of-Wallet):**
   Create appointment with a 10KB string for `name`.
   *Expected: PERMISSION_DENIED* (`name.size() <= 100` fails)

5. **Payload 5 (Invalid Status Enum on Booking):**
   Patient creates appointment attempting to set `status: "done"`.
   *Expected: PERMISSION_DENIED* (booking must start as `"new"` or valid status)

6. **Payload 6 (Unauthorized Post Deletion):**
   Unauthenticated delete request on `/posts/p-camp`.
   *Expected: PERMISSION_DENIED*

7. **Payload 7 (Settings Hijack):**
   Unauthenticated user modifying `/settings/clinic` to change clinic phone or address.
   *Expected: PERMISSION_DENIED*

8. **Payload 8 (Banner Defacement):**
   Non-admin user creating or modifying a `/banners/b1` document.
   *Expected: PERMISSION_DENIED*

9. **Payload 9 (Unverified Email Spoofing):**
   User authenticated as `sudipta2santra@gmail.com` but with `email_verified: false` attempting admin write.
   *Expected: PERMISSION_DENIED*

10. **Payload 10 (Direct Appointment Tampering):**
    Non-admin user sending an update to alter appointment `status: "cancelled"` or change doctor.
    *Expected: PERMISSION_DENIED*

11. **Payload 11 (Malicious Document ID Injection):**
    Creating an appointment with document ID containing path traversal or illegal symbols `/appointments/../../etc/passwd`.
    *Expected: PERMISSION_DENIED* (`isValidId` check fails)

12. **Payload 12 (Blanket Query Scraping on Ledger):**
    Unauthenticated client attempting to list all `/patients` without admin credentials.
    *Expected: PERMISSION_DENIED*
