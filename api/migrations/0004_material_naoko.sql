CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"role" text DEFAULT 'user' NOT NULL,
	"name" text,
	"address" text,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
