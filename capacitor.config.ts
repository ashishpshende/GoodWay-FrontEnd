import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.googway.app',
  appName: 'Goodway',
  webDir: 'www',
  bundledWebRuntime: false,
  server: {
    androidScheme: 'http',
    cleartext: true,
    allowNavigation: [
      "http://ec2-54-227-88-161.compute-1.amazonaws.com/api/*"
    ]
  }
};

export default config;
