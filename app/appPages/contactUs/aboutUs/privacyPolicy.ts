const privacyPolicy: string = `
Privacy Policy
Effective Date: 08/04/2025
App Name: Mini Moments
Developer: The Mini Moments Team
Contact: privacy@minimomentsapp.com

Your privacy is important to us. This Privacy Policy explains how we collect, use, store, and protect the information you provide when using Mini Moments.

1. Information We Store
    1.1 Personal Information
        - Parent or caregiver name and email address
        - Baby’s name, date of birth, gender, and other profile details
        - Health records, feeding logs, sleep patterns, diaper changes, milestones, and notes: all data provided in the diaries

    1.2 Device Information
        - Device type, operating system, unique device identifiers
        - Usage data, including app interactions and crash reports (anonymized)
        - IP address and approximate location for troubleshooting and analytics.

    1.3 Other People’s Data
        - If you add information about other individuals (e.g., caregivers, emergency contacts, family), you are responsible for ensuring you have appropriate consent to share their data.

2. How We Use the Information
    - To provide core functionality (tracking baby’s growth and activities, storing the diaries you provide).

3. Data Storage and Security
    - All data is securely stored in our cloud database hosted on MongoDB.
    - We use AES-256 encryption for data at rest.
    - Access to your data is restricted to authorized personnel only.
    - We conduct regular security audits and vulnerability assessments to ensure the ongoing protection of your information.
    - In app all data that is to be accessed must be done with a valid token generated only with a valid login

4. Sharing of Information
    - We do NOT sell or rent your data. We may share data only:
        - With your explicit consent.
        - With service providers, including AWS for cloud hosting, and Google Analytics for app usage analysis, under strict confidentiality agreements. These service providers access only the data necessary to perform their specific functions.
        - If required by law or to protect our rights.

5. Data About Other Individuals
    - If you input data about others (e.g., co-parents, babysitters, doctors), you confirm you have their consent. We protect this data just like any other user data.

6. Data Retention
    - We retain your account data for as long as your account is active.
    - Health records and other baby-related data are retained until you delete your account or specific data entries.
    - You can request the deletion of your data at any time by contacting us at privacy@minimomentsapp.com.

7. Your Rights
    - You may:
        - Access your data.
        - Update or correct information.
        - Delete your account and data.
        - Export your data in a JSON format.
    - To exercise these rights, contact: privacy@minimomentsapp.com.

8. International Data Transfers
    - Your data may be transferred to and processed in countries outside of your own.
    - We use Standard Contractual Clauses approved by the European Commission to ensure adequate protection of your data during international transfers.
    - All data protection is compliant with GDRP and the Data Protection Act

9. Children’s Privacy
    - This app is for parents and caregivers. We do not knowingly collect data from children under 13.

10. Changes to This Policy
    - We may update this policy and will notify you in the app or by email when we do.`;

export const policy = privacyPolicy;
