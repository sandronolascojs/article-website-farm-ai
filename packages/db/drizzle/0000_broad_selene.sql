CREATE TABLE "articles" (
	"article_id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"content" text NOT NULL,
	"summary" text NOT NULL,
	"keywords" text[] NOT NULL,
	"slug" text NOT NULL,
	"image_key" text,
	"author_id" text,
	"category_id" text,
	"website_id" text NOT NULL,
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
	"slug" text NOT NULL,
	"description" text,
	"website_id" text NOT NULL,
	"deleted_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "categories_category_id_unique" UNIQUE("category_id")
);
--> statement-breakpoint
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
CREATE TABLE "authors" (
	"author_id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"website_id" text,
	CONSTRAINT "authors_author_id_unique" UNIQUE("author_id")
);
--> statement-breakpoint
ALTER TABLE "articles" ADD CONSTRAINT "articles_author_id_authors_author_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."authors"("author_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "articles" ADD CONSTRAINT "articles_category_id_categories_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("category_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "articles" ADD CONSTRAINT "articles_website_id_websites_website_id_fk" FOREIGN KEY ("website_id") REFERENCES "public"."websites"("website_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "categories" ADD CONSTRAINT "categories_website_id_websites_website_id_fk" FOREIGN KEY ("website_id") REFERENCES "public"."websites"("website_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "authors" ADD CONSTRAINT "authors_website_id_websites_website_id_fk" FOREIGN KEY ("website_id") REFERENCES "public"."websites"("website_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_article_website_id" ON "articles" USING btree ("website_id");--> statement-breakpoint
CREATE INDEX "idx_article_slug" ON "articles" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "idx_category_website_id" ON "categories" USING btree ("website_id");--> statement-breakpoint
CREATE INDEX "idx_category_slug" ON "categories" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "idx_category_name" ON "categories" USING btree ("name");--> statement-breakpoint
CREATE INDEX "idx_author_website_id" ON "authors" USING btree ("website_id");