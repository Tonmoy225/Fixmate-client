import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

// skip for new connection or stop new connection
const client = globalThis._mongoClient || new MongoClient(process.env.MONGODB_URI);
if (process.env.NODE_ENV !== "production") {
  globalThis._mongoClient = client;
}
const db = client.db(process.env.DB_NAME);

// Google credentials থাকলেই provider চালু হবে, না থাকলে email/password আগের মতোই কাজ করবে
const googleProvider =
  process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
    ? {
        google: {
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        },
      }
    : {};

export const auth = betterAuth({
  database: mongodbAdapter(db, { client }),
    // production domain এখানে যোগ হয় (কমা দিয়ে একাধিক দেওয়া যায়)
  trustedOrigins: (process.env.TRUSTED_ORIGINS || "")
    .split(",")
    .map((url) => url.trim())
    .filter(Boolean),

  socialProviders: googleProvider,

  // একই email দিয়ে আগে email/password দিয়ে sign up করা user-ও Google দিয়ে ঢুকতে পারবে
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google"],
    },
  },

  emailAndPassword: {
    enabled: true,
  },

  user: {
    additionalFields: {
      role: { type: "string", required: false, defaultValue: "customer" },
      phone: { type: "string", required: false },
      area: { type: "string", required: false },
      bio: { type: "string", required: false },
    },
  },

  databaseHooks: {
    user: {
      create: {
        // server-detect 
        before: async (user) => {
          const role = user.role === "technician" ? "technician" : "customer";
          return { data: { ...user, role } };
        },
      },
      update: {
        // client to stop change any role 
        before: async (data) => {
          if (data.role !== undefined) return false;
        },
      },
    },
  },
});