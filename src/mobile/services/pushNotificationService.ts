import { Capacitor } from '@capacitor/core';
import { PushNotifications } from '@capacitor/push-notifications';
import { doc, setDoc } from 'firebase/firestore';
import { db, auth } from '../../firebase';

export const initPushNotifications = async () => {
  if (!Capacitor.isNativePlatform()) return;

  // Request permission
  const permStatus = await PushNotifications.requestPermissions();
  if (permStatus.receive !== 'granted') {
    console.warn('Push notification permission not granted');
    return;
  }

  await PushNotifications.register();

  // Save FCM token to Firestore
  PushNotifications.addListener('registration', async (token) => {
    const user = auth.currentUser;
    if (user) {
      await setDoc(
        doc(db, 'fcm-tokens', user.uid),
        { token: token.value, updatedAt: new Date() },
        { merge: true }
      );
    }
    console.log('FCM Token registered:', token.value);
  });

  PushNotifications.addListener('registrationError', (err) => {
    console.error('Push registration error:', err);
  });

  // Handle foreground notifications
  PushNotifications.addListener('pushNotificationReceived', (notification) => {
    console.log('Push received in foreground:', notification);
    // Could update a local state/store with notification badge count
  });

  // Handle tap on notification
  PushNotifications.addListener('pushNotificationActionPerformed', (action) => {
    console.log('Push action performed:', action);
    // Navigate based on notification data
  });
};

export const removePushListeners = async () => {
  if (Capacitor.isNativePlatform()) {
    await PushNotifications.removeAllListeners();
  }
};
