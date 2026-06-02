# Script: Setup GitHub Secrets untuk Brawijaya Esport Mobile App
# Jalankan SETELAH gh auth login

$REPO = "alpvan/LandingBuatBEST"

Write-Host "🔑 Menambahkan GitHub Secrets untuk $REPO..." -ForegroundColor Yellow

# Firebase Secrets
gh secret set VITE_FIREBASE_API_KEY --body "AIzaSyAQTgLt4rgwQrJXPixTrllGvNyrY3G_IhE" --repo $REPO
gh secret set VITE_FIREBASE_AUTH_DOMAIN --body "best-5d15d.firebaseapp.com" --repo $REPO
gh secret set VITE_FIREBASE_PROJECT_ID --body "best-5d15d" --repo $REPO
gh secret set VITE_FIREBASE_STORAGE_BUCKET --body "best-5d15d.firebasestorage.app" --repo $REPO
gh secret set VITE_FIREBASE_MESSAGING_SENDER_ID --body "556161293825" --repo $REPO
gh secret set VITE_FIREBASE_APP_ID --body "1:556161293825:web:217a3c71af6ebf4ad26a00" --repo $REPO
gh secret set VITE_FIREBASE_DATABASE_URL --body "https://best-5d15d-default-rtdb.firebaseio.com" --repo $REPO

Write-Host "✅ Firebase secrets berhasil ditambahkan!" -ForegroundColor Green
Write-Host ""
Write-Host "⚠️  Masih perlu ditambahkan manual:" -ForegroundColor Yellow
Write-Host "   → GOOGLE_SERVICES_JSON (base64 dari google-services.json)" -ForegroundColor Cyan
Write-Host ""
Write-Host "Cara dapat google-services.json:" -ForegroundColor White
Write-Host "  1. Buka https://console.firebase.google.com" -ForegroundColor Gray
Write-Host "  2. Project best-5d15d → Project Settings (⚙️)" -ForegroundColor Gray
Write-Host "  3. Tab General → Your apps → Add app → Android" -ForegroundColor Gray
Write-Host "  4. Package name: id.ac.brawijaya.esport" -ForegroundColor Gray
Write-Host "  5. Download google-services.json" -ForegroundColor Gray
Write-Host "  6. Jalankan perintah ini untuk encode:" -ForegroundColor Gray
Write-Host '     [Convert]::ToBase64String([IO.File]::ReadAllBytes("C:\path\to\google-services.json")) | Set-Clipboard' -ForegroundColor Cyan
Write-Host "  7. Buka GitHub → Settings → Secrets → GOOGLE_SERVICES_JSON → paste" -ForegroundColor Gray
Write-Host ""
Write-Host "Untuk Push Notification iOS (Opsional):" -ForegroundColor White
Write-Host "  1. Buka Firebase Console → Add app → iOS" -ForegroundColor Gray
Write-Host "  2. Apple bundle ID: id.ac.brawijaya.esport" -ForegroundColor Gray
Write-Host "  3. Download GoogleService-Info.plist" -ForegroundColor Gray
Write-Host "  4. Encode ke Base64 (sama seperti Android) dan simpan sebagai GOOGLE_SERVICE_INFO_PLIST di GitHub Secrets" -ForegroundColor Gray
