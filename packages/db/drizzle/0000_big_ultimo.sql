CREATE TABLE "articles" (
	"article_id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"content" text[] NOT NULL,
	"summary" text NOT NULL,
	"keywords" text[] NOT NULL,
	"slug" text NOT NULL,
	"image_url" text,
	"category_id" text,
	"processed_at" timestamp,
	"deleted_at" timestamp,
	"published_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "articles_article_id_unique" UNIQUE("article_id")
);
--> statement-breakpoint
CREATE TABLE "categories" (
	"category_id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"deleted_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "categories_category_id_unique" UNIQUE("category_id")
);
--> statement-breakpoint
ALTER TABLE "articles" ADD CONSTRAINT "articles_category_id_categories_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("category_id") ON DELETE no action ON UPDATE no action;