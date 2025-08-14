declare module 'astro:content' {
	interface Render {
		'.md': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[]
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[]
	): Promise<CollectionEntry<C>[]>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"contributors": {
"kejia-zhu.md": {
	id: "kejia-zhu.md";
  slug: "kejia-zhu";
  body: string;
  collection: "contributors";
  data: any
} & { render(): Render[".md"] };
"philip-zhao.md": {
	id: "philip-zhao.md";
  slug: "philip-zhao";
  body: string;
  collection: "contributors";
  data: any
} & { render(): Render[".md"] };
};
"education": {
"nmit.md": {
	id: "nmit.md";
  slug: "nmit";
  body: string;
  collection: "education";
  data: any
} & { render(): Render[".md"] };
"vuw.md": {
	id: "vuw.md";
  slug: "vuw";
  body: string;
  collection: "education";
  data: any
} & { render(): Render[".md"] };
};
"patents": {
"eliciting-user-sharing.md": {
	id: "eliciting-user-sharing.md";
  slug: "eliciting-user-sharing";
  body: string;
  collection: "patents";
  data: any
} & { render(): Render[".md"] };
};
"projects": {
"moneytree-mufg-bank-app.md": {
	id: "moneytree-mufg-bank-app.md";
  slug: "moneytree-mufg-bank-app";
  body: string;
  collection: "projects";
  data: any
} & { render(): Render[".md"] };
"olympic-light-games.md": {
	id: "olympic-light-games.md";
  slug: "olympic-light-games";
  body: string;
  collection: "projects";
  data: any
} & { render(): Render[".md"] };
"origami-pay-bluetooth.md": {
	id: "origami-pay-bluetooth.md";
  slug: "origami-pay-bluetooth";
  body: string;
  collection: "projects";
  data: any
} & { render(): Render[".md"] };
"rainforest-qa-visual-editor.md": {
	id: "rainforest-qa-visual-editor.md";
  slug: "rainforest-qa-visual-editor";
  body: string;
  collection: "projects";
  data: any
} & { render(): Render[".md"] };
"simple-picker.md": {
	id: "simple-picker.md";
  slug: "simple-picker";
  body: string;
  collection: "projects";
  data: any
} & { render(): Render[".md"] };
"xero-me-mobile-app.md": {
	id: "xero-me-mobile-app.md";
  slug: "xero-me-mobile-app";
  body: string;
  collection: "projects";
  data: any
} & { render(): Render[".md"] };
};
"stack": {
"astro.md": {
	id: "astro.md";
  slug: "astro";
  body: string;
  collection: "stack";
  data: any
} & { render(): Render[".md"] };
"figma.md": {
	id: "figma.md";
  slug: "figma";
  body: string;
  collection: "stack";
  data: any
} & { render(): Render[".md"] };
"nodejs.md": {
	id: "nodejs.md";
  slug: "nodejs";
  body: string;
  collection: "stack";
  data: any
} & { render(): Render[".md"] };
"react.md": {
	id: "react.md";
  slug: "react";
  body: string;
  collection: "stack";
  data: any
} & { render(): Render[".md"] };
"tailwindcss.md": {
	id: "tailwindcss.md";
  slug: "tailwindcss";
  body: string;
  collection: "stack";
  data: any
} & { render(): Render[".md"] };
"threejs.md": {
	id: "threejs.md";
  slug: "threejs";
  body: string;
  collection: "stack";
  data: any
} & { render(): Render[".md"] };
"typescript.md": {
	id: "typescript.md";
  slug: "typescript";
  body: string;
  collection: "stack";
  data: any
} & { render(): Render[".md"] };
};
"work": {
"coaching.md": {
	id: "coaching.md";
  slug: "coaching";
  body: string;
  collection: "work";
  data: any
} & { render(): Render[".md"] };
"facebook.md": {
	id: "facebook.md";
  slug: "facebook";
  body: string;
  collection: "work";
  data: any
} & { render(): Render[".md"] };
"ministry-of-awesome.md": {
	id: "ministry-of-awesome.md";
  slug: "ministry-of-awesome";
  body: string;
  collection: "work";
  data: any
} & { render(): Render[".md"] };
"moneytree.md": {
	id: "moneytree.md";
  slug: "moneytree";
  body: string;
  collection: "work";
  data: any
} & { render(): Render[".md"] };
"origami.md": {
	id: "origami.md";
  slug: "origami";
  body: string;
  collection: "work";
  data: any
} & { render(): Render[".md"] };
"parenting-break.md": {
	id: "parenting-break.md";
  slug: "parenting-break";
  body: string;
  collection: "work";
  data: any
} & { render(): Render[".md"] };
"rainforest-qa.md": {
	id: "rainforest-qa.md";
  slug: "rainforest-qa";
  body: string;
  collection: "work";
  data: any
} & { render(): Render[".md"] };
"resn.md": {
	id: "resn.md";
  slug: "resn";
  body: string;
  collection: "work";
  data: any
} & { render(): Render[".md"] };
"starboard-maritime-intelligence.md": {
	id: "starboard-maritime-intelligence.md";
  slug: "starboard-maritime-intelligence";
  body: string;
  collection: "work";
  data: any
} & { render(): Render[".md"] };
"the-alchemist-design.md": {
	id: "the-alchemist-design.md";
  slug: "the-alchemist-design";
  body: string;
  collection: "work";
  data: any
} & { render(): Render[".md"] };
"vuw.md": {
	id: "vuw.md";
  slug: "vuw";
  body: string;
  collection: "work";
  data: any
} & { render(): Render[".md"] };
"xero.md": {
	id: "xero.md";
  slug: "xero";
  body: string;
  collection: "work";
  data: any
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = never;
}
