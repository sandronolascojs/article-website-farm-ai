CREATE TABLE "websites" (
	"website_id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"url" text NOT NULL,
	"description" text,
	"banner" text,
	"logo" text,
	"favicon" text,
	"language" text DEFAULT 'en-US' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "websites_website_id_unique" UNIQUE("website_id")
);
--> statement-breakpoint
ALTER TABLE "articles" ADD COLUMN "website_id" text;--> statement-breakpoint
ALTER TABLE "categories" ADD COLUMN "slug" text NOT NULL;--> statement-breakpoint
ALTER TABLE "categories" ADD COLUMN "description" text;--> statement-breakpoint
ALTER TABLE "categories" ADD COLUMN "website_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "articles" ADD CONSTRAINT "articles_website_id_websites_website_id_fk" FOREIGN KEY ("website_id") REFERENCES "public"."websites"("website_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "categories" ADD CONSTRAINT "categories_website_id_websites_website_id_fk" FOREIGN KEY ("website_id") REFERENCES "public"."websites"("website_id") ON DELETE no action ON UPDATE no action;