# Trustmark Connect

A Web3-based proof and verification service for secure and shareable activity records.

## 🔐 Core Features
- Wallet signature-based proof
- Public shareable links
- PDF download for Pro users
- Firebase-integrated data layer

## 🚀 Tech Stack
- Next.js (App Router)
- TypeScript
- Firebase (Firestore, Auth, Storage)
- WalletConnect v2, wagmi, viem

## 📦 Installation
```bash
npm install
npm run dev
```

## 🔧 Environment Setup
You must create a `.env.local` file with the following:

```
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
...
```

❗ **Do not upload `.env.local` to GitHub.**

## 📄 License
MIT

## 🌍 Launch Policy
Trustmark Connect is designed for global deployment.  
**Initial supported regions**: 🇺🇸 USA, 🇮🇳 India, 🇵🇭 Philippines, 🇮🇩 Indonesia, 🇳🇬 Nigeria, 🇧🇷 Brazil, 🇲🇽 Mexico  
**Korea entry is deferred** to post-validation stage.
