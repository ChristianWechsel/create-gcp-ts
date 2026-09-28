import { HandleEnv } from "@christian-wechsel/typed-env-handler";

export function createEnv() {
  return new HandleEnv<{
    NODE_ENV: "development" | "production" | "test";
    IS_DOCKER: boolean;
    PORT: number;
    APP_NAME: string;
    GOOGLE_CLIENT_ID: string;
    GOOGLE_PROJECT_ID: string;
    ADMIN_EMAIL: string;
    BUCKET_NAME: string;
  }>(
    {
      NODE_ENV: {
        defaultValue: "development",
        conversion(value) {
          return value as "development" | "production" | "test";
        },
        validation(value) {
          return (["development", "production", "test"] as const).includes(
            value,
          );
        },
      },
      IS_DOCKER: HandleEnv.boolean({ defaultValue: false }),
      PORT: HandleEnv.number({ defaultValue: 80 }),
      APP_NAME: HandleEnv.string({ defaultValue: "app" }),
      GOOGLE_CLIENT_ID: HandleEnv.string(),
      GOOGLE_PROJECT_ID: HandleEnv.string(),
      ADMIN_EMAIL: HandleEnv.string({ defaultValue: "" }),
      BUCKET_NAME: HandleEnv.string(),
    },
    { debugLogs: true, docker: { pathSecrets: "/run/secrets" } },
  );
}
