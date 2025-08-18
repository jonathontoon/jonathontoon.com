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
		"awards": {
"academic-achievement.md": {
	id: "academic-achievement.md";
  slug: "academic-achievement";
  body: string;
  collection: "awards";
  data: any
} & { render(): Render[".md"] };
"student-achievement.md": {
	id: "student-achievement.md";
  slug: "student-achievement";
  body: string;
  collection: "awards";
  data: any
} & { render(): Render[".md"] };
};
"colleagues": {
"aaron-carambula.md": {
	id: "aaron-carambula.md";
  slug: "aaron-carambula";
  body: string;
  collection: "colleagues";
  data: any
} & { render(): Render[".md"] };
"akihiro-ome.md": {
	id: "akihiro-ome.md";
  slug: "akihiro-ome";
  body: string;
  collection: "colleagues";
  data: any
} & { render(): Render[".md"] };
"alex-kyo.md": {
	id: "alex-kyo.md";
  slug: "alex-kyo";
  body: string;
  collection: "colleagues";
  data: any
} & { render(): Render[".md"] };
"alexander-auld.md": {
	id: "alexander-auld.md";
  slug: "alexander-auld";
  body: string;
  collection: "colleagues";
  data: any
} & { render(): Render[".md"] };
"andy-chung.md": {
	id: "andy-chung.md";
  slug: "andy-chung";
  body: string;
  collection: "colleagues";
  data: any
} & { render(): Render[".md"] };
"andy-hovey.md": {
	id: "andy-hovey.md";
  slug: "andy-hovey";
  body: string;
  collection: "colleagues";
  data: any
} & { render(): Render[".md"] };
"antony-brown.md": {
	id: "antony-brown.md";
  slug: "antony-brown";
  body: string;
  collection: "colleagues";
  data: any
} & { render(): Render[".md"] };
"arata-yanase.md": {
	id: "arata-yanase.md";
  slug: "arata-yanase";
  body: string;
  collection: "colleagues";
  data: any
} & { render(): Render[".md"] };
"austin-bales.md": {
	id: "austin-bales.md";
  slug: "austin-bales";
  body: string;
  collection: "colleagues";
  data: any
} & { render(): Render[".md"] };
"barton-smith.md": {
	id: "barton-smith.md";
  slug: "barton-smith";
  body: string;
  collection: "colleagues";
  data: any
} & { render(): Render[".md"] };
"ben-kelly.md": {
	id: "ben-kelly.md";
  slug: "ben-kelly";
  body: string;
  collection: "colleagues";
  data: any
} & { render(): Render[".md"] };
"bhupendra-singh.md": {
	id: "bhupendra-singh.md";
  slug: "bhupendra-singh";
  body: string;
  collection: "colleagues";
  data: any
} & { render(): Render[".md"] };
"billy-roh.md": {
	id: "billy-roh.md";
  slug: "billy-roh";
  body: string;
  collection: "colleagues";
  data: any
} & { render(): Render[".md"] };
"bob-baldwin.md": {
	id: "bob-baldwin.md";
  slug: "bob-baldwin";
  body: string;
  collection: "colleagues";
  data: any
} & { render(): Render[".md"] };
"brian-boarini.md": {
	id: "brian-boarini.md";
  slug: "brian-boarini";
  body: string;
  collection: "colleagues";
  data: any
} & { render(): Render[".md"] };
"camy-tsukamoto.md": {
	id: "camy-tsukamoto.md";
  slug: "camy-tsukamoto";
  body: string;
  collection: "colleagues";
  data: any
} & { render(): Render[".md"] };
"charlie-deets.md": {
	id: "charlie-deets.md";
  slug: "charlie-deets";
  body: string;
  collection: "colleagues";
  data: any
} & { render(): Render[".md"] };
"chris-kalani.md": {
	id: "chris-kalani.md";
  slug: "chris-kalani";
  body: string;
  collection: "colleagues";
  data: any
} & { render(): Render[".md"] };
"christophe-tauziet.md": {
	id: "christophe-tauziet.md";
  slug: "christophe-tauziet";
  body: string;
  collection: "colleagues";
  data: any
} & { render(): Render[".md"] };
"christopher-chedeau.md": {
	id: "christopher-chedeau.md";
  slug: "christopher-chedeau";
  body: string;
  collection: "colleagues";
  data: any
} & { render(): Render[".md"] };
"colin-dunn.md": {
	id: "colin-dunn.md";
  slug: "colin-dunn";
  body: string;
  collection: "colleagues";
  data: any
} & { render(): Render[".md"] };
"dan-barak.md": {
	id: "dan-barak.md";
  slug: "dan-barak";
  body: string;
  collection: "colleagues";
  data: any
} & { render(): Render[".md"] };
"dan-cowell.md": {
	id: "dan-cowell.md";
  slug: "dan-cowell";
  body: string;
  collection: "colleagues";
  data: any
} & { render(): Render[".md"] };
"dan-newman.md": {
	id: "dan-newman.md";
  slug: "dan-newman";
  body: string;
  collection: "colleagues";
  data: any
} & { render(): Render[".md"] };
"dineth-mapa.md": {
	id: "dineth-mapa.md";
  slug: "dineth-mapa";
  body: string;
  collection: "colleagues";
  data: any
} & { render(): Render[".md"] };
"dongri-jin.md": {
	id: "dongri-jin.md";
  slug: "dongri-jin";
  body: string;
  collection: "colleagues";
  data: any
} & { render(): Render[".md"] };
"emlyn-hughes.md": {
	id: "emlyn-hughes.md";
  slug: "emlyn-hughes";
  body: string;
  collection: "colleagues";
  data: any
} & { render(): Render[".md"] };
"fiid-williams.md": {
	id: "fiid-williams.md";
  slug: "fiid-williams";
  body: string;
  collection: "colleagues";
  data: any
} & { render(): Render[".md"] };
"george-hajian.md": {
	id: "george-hajian.md";
  slug: "george-hajian";
  body: string;
  collection: "colleagues";
  data: any
} & { render(): Render[".md"] };
"gosha-tcherednitchenko.md": {
	id: "gosha-tcherednitchenko.md";
  slug: "gosha-tcherednitchenko";
  body: string;
  collection: "colleagues";
  data: any
} & { render(): Render[".md"] };
"hayoung-shin.md": {
	id: "hayoung-shin.md";
  slug: "hayoung-shin";
  body: string;
  collection: "colleagues";
  data: any
} & { render(): Render[".md"] };
"hiro-noguchi.md": {
	id: "hiro-noguchi.md";
  slug: "hiro-noguchi";
  body: string;
  collection: "colleagues";
  data: any
} & { render(): Render[".md"] };
"isaac-minogue.md": {
	id: "isaac-minogue.md";
  slug: "isaac-minogue";
  body: string;
  collection: "colleagues";
  data: any
} & { render(): Render[".md"] };
"james-simpson.md": {
	id: "james-simpson.md";
  slug: "james-simpson";
  body: string;
  collection: "colleagues";
  data: any
} & { render(): Render[".md"] };
"jan-grodowski.md": {
	id: "jan-grodowski.md";
  slug: "jan-grodowski";
  body: string;
  collection: "colleagues";
  data: any
} & { render(): Render[".md"] };
"jason-cashdollar.md": {
	id: "jason-cashdollar.md";
  slug: "jason-cashdollar";
  body: string;
  collection: "colleagues";
  data: any
} & { render(): Render[".md"] };
"jasper-r-hauser.md": {
	id: "jasper-r-hauser.md";
  slug: "jasper-r-hauser";
  body: string;
  collection: "colleagues";
  data: any
} & { render(): Render[".md"] };
"jeremy-bank.md": {
	id: "jeremy-bank.md";
  slug: "jeremy-bank";
  body: string;
  collection: "colleagues";
  data: any
} & { render(): Render[".md"] };
"jitachi-garcia.md": {
	id: "jitachi-garcia.md";
  slug: "jitachi-garcia";
  body: string;
  collection: "colleagues";
  data: any
} & { render(): Render[".md"] };
"jonathan-arena.md": {
	id: "jonathan-arena.md";
  slug: "jonathan-arena";
  body: string;
  collection: "colleagues";
  data: any
} & { render(): Render[".md"] };
"jonathan-barber.md": {
	id: "jonathan-barber.md";
  slug: "jonathan-barber";
  body: string;
  collection: "colleagues";
  data: any
} & { render(): Render[".md"] };
"jonathan-hawke.md": {
	id: "jonathan-hawke.md";
  slug: "jonathan-hawke";
  body: string;
  collection: "colleagues";
  data: any
} & { render(): Render[".md"] };
"josh-wilburne.md": {
	id: "josh-wilburne.md";
  slug: "josh-wilburne";
  body: string;
  collection: "colleagues";
  data: any
} & { render(): Render[".md"] };
"jp-ren.md": {
	id: "jp-ren.md";
  slug: "jp-ren";
  body: string;
  collection: "colleagues";
  data: any
} & { render(): Render[".md"] };
"jt-trollman.md": {
	id: "jt-trollman.md";
  slug: "jt-trollman";
  body: string;
  collection: "colleagues";
  data: any
} & { render(): Render[".md"] };
"juan-arreguin.md": {
	id: "juan-arreguin.md";
  slug: "juan-arreguin";
  body: string;
  collection: "colleagues";
  data: any
} & { render(): Render[".md"] };
"kayla-sommer.md": {
	id: "kayla-sommer.md";
  slug: "kayla-sommer";
  body: string;
  collection: "colleagues";
  data: any
} & { render(): Render[".md"] };
"keegan-jones.md": {
	id: "keegan-jones.md";
  slug: "keegan-jones";
  body: string;
  collection: "colleagues";
  data: any
} & { render(): Render[".md"] };
"keita-suzuki.md": {
	id: "keita-suzuki.md";
  slug: "keita-suzuki";
  body: string;
  collection: "colleagues";
  data: any
} & { render(): Render[".md"] };
"kejia-zhu.md": {
	id: "kejia-zhu.md";
  slug: "kejia-zhu";
  body: string;
  collection: "colleagues";
  data: any
} & { render(): Render[".md"] };
"kelly-rummins.md": {
	id: "kelly-rummins.md";
  slug: "kelly-rummins";
  body: string;
  collection: "colleagues";
  data: any
} & { render(): Render[".md"] };
"kris-hermansson.md": {
	id: "kris-hermansson.md";
  slug: "kris-hermansson";
  body: string;
  collection: "colleagues";
  data: any
} & { render(): Render[".md"] };
"kyle-meyer.md": {
	id: "kyle-meyer.md";
  slug: "kyle-meyer";
  body: string;
  collection: "colleagues";
  data: any
} & { render(): Render[".md"] };
"laura-javier.md": {
	id: "laura-javier.md";
  slug: "laura-javier";
  body: string;
  collection: "colleagues";
  data: any
} & { render(): Render[".md"] };
"lavinia-petrache.md": {
	id: "lavinia-petrache.md";
  slug: "lavinia-petrache";
  body: string;
  collection: "colleagues";
  data: any
} & { render(): Render[".md"] };
"lee-gibson.md": {
	id: "lee-gibson.md";
  slug: "lee-gibson";
  body: string;
  collection: "colleagues";
  data: any
} & { render(): Render[".md"] };
"livio-canonica.md": {
	id: "livio-canonica.md";
  slug: "livio-canonica";
  body: string;
  collection: "colleagues";
  data: any
} & { render(): Render[".md"] };
"luke-smith.md": {
	id: "luke-smith.md";
  slug: "luke-smith";
  body: string;
  collection: "colleagues";
  data: any
} & { render(): Render[".md"] };
"maciej-gryka.md": {
	id: "maciej-gryka.md";
  slug: "maciej-gryka";
  body: string;
  collection: "colleagues";
  data: any
} & { render(): Render[".md"] };
"makito-ninomiya.md": {
	id: "makito-ninomiya.md";
  slug: "makito-ninomiya";
  body: string;
  collection: "colleagues";
  data: any
} & { render(): Render[".md"] };
"marcus-brown.md": {
	id: "marcus-brown.md";
  slug: "marcus-brown";
  body: string;
  collection: "colleagues";
  data: any
} & { render(): Render[".md"] };
"mark-makdad.md": {
	id: "mark-makdad.md";
  slug: "mark-makdad";
  body: string;
  collection: "colleagues";
  data: any
} & { render(): Render[".md"] };
"matej-hrescak.md": {
	id: "matej-hrescak.md";
  slug: "matej-hrescak";
  body: string;
  collection: "colleagues";
  data: any
} & { render(): Render[".md"] };
"matt-halford.md": {
	id: "matt-halford.md";
  slug: "matt-halford";
  body: string;
  collection: "colleagues";
  data: any
} & { render(): Render[".md"] };
"naoki-masuda.md": {
	id: "naoki-masuda.md";
  slug: "naoki-masuda";
  body: string;
  collection: "colleagues";
  data: any
} & { render(): Render[".md"] };
"natalie-friedman.md": {
	id: "natalie-friedman.md";
  slug: "natalie-friedman";
  body: string;
  collection: "colleagues";
  data: any
} & { render(): Render[".md"] };
"nathan-borror.md": {
	id: "nathan-borror.md";
  slug: "nathan-borror";
  body: string;
  collection: "colleagues";
  data: any
} & { render(): Render[".md"] };
"neil-hamilton-ritchie.md": {
	id: "neil-hamilton-ritchie.md";
  slug: "neil-hamilton-ritchie";
  body: string;
  collection: "colleagues";
  data: any
} & { render(): Render[".md"] };
"noush-isaac.md": {
	id: "noush-isaac.md";
  slug: "noush-isaac";
  body: string;
  collection: "colleagues";
  data: any
} & { render(): Render[".md"] };
"paul-chapman.md": {
	id: "paul-chapman.md";
  slug: "paul-chapman";
  body: string;
  collection: "colleagues";
  data: any
} & { render(): Render[".md"] };
"philip-zhao.md": {
	id: "philip-zhao.md";
  slug: "philip-zhao";
  body: string;
  collection: "colleagues";
  data: any
} & { render(): Render[".md"] };
"rena-matsumoto.md": {
	id: "rena-matsumoto.md";
  slug: "rena-matsumoto";
  body: string;
  collection: "colleagues";
  data: any
} & { render(): Render[".md"] };
"rendy-pranata.md": {
	id: "rendy-pranata.md";
  slug: "rendy-pranata";
  body: string;
  collection: "colleagues";
  data: any
} & { render(): Render[".md"] };
"roberto-sobachi.md": {
	id: "roberto-sobachi.md";
  slug: "roberto-sobachi";
  body: string;
  collection: "colleagues";
  data: any
} & { render(): Render[".md"] };
"ryota-katoh.md": {
	id: "ryota-katoh.md";
  slug: "ryota-katoh";
  body: string;
  collection: "colleagues";
  data: any
} & { render(): Render[".md"] };
"samyak-shah.md": {
	id: "samyak-shah.md";
  slug: "samyak-shah";
  body: string;
  collection: "colleagues";
  data: any
} & { render(): Render[".md"] };
"sang-lee.md": {
	id: "sang-lee.md";
  slug: "sang-lee";
  body: string;
  collection: "colleagues";
  data: any
} & { render(): Render[".md"] };
"shingo-fushimi.md": {
	id: "shingo-fushimi.md";
  slug: "shingo-fushimi";
  body: string;
  collection: "colleagues";
  data: any
} & { render(): Render[".md"] };
"simon-neveu.md": {
	id: "simon-neveu.md";
  slug: "simon-neveu";
  body: string;
  collection: "colleagues";
  data: any
} & { render(): Render[".md"] };
"susie-kim.md": {
	id: "susie-kim.md";
  slug: "susie-kim";
  body: string;
  collection: "colleagues";
  data: any
} & { render(): Render[".md"] };
"takashi-nozawa.md": {
	id: "takashi-nozawa.md";
  slug: "takashi-nozawa";
  body: string;
  collection: "colleagues";
  data: any
} & { render(): Render[".md"] };
"tetsuya-yamaguchi.md": {
	id: "tetsuya-yamaguchi.md";
  slug: "tetsuya-yamaguchi";
  body: string;
  collection: "colleagues";
  data: any
} & { render(): Render[".md"] };
"thai-tran.md": {
	id: "thai-tran.md";
  slug: "thai-tran";
  body: string;
  collection: "colleagues";
  data: any
} & { render(): Render[".md"] };
"thiago-hirai.md": {
	id: "thiago-hirai.md";
  slug: "thiago-hirai";
  body: string;
  collection: "colleagues";
  data: any
} & { render(): Render[".md"] };
"tuhin-kumar.md": {
	id: "tuhin-kumar.md";
  slug: "tuhin-kumar";
  body: string;
  collection: "colleagues";
  data: any
} & { render(): Render[".md"] };
"yoshiki-yasui.md": {
	id: "yoshiki-yasui.md";
  slug: "yoshiki-yasui";
  body: string;
  collection: "colleagues";
  data: any
} & { render(): Render[".md"] };
"yoshito-hasaka.md": {
	id: "yoshito-hasaka.md";
  slug: "yoshito-hasaka";
  body: string;
  collection: "colleagues";
  data: any
} & { render(): Render[".md"] };
"zach-taub.md": {
	id: "zach-taub.md";
  slug: "zach-taub";
  body: string;
  collection: "colleagues";
  data: any
} & { render(): Render[".md"] };
};
"companies": {
"facebook.md": {
	id: "facebook.md";
  slug: "facebook";
  body: string;
  collection: "companies";
  data: any
} & { render(): Render[".md"] };
"ministry-of-awesome.md": {
	id: "ministry-of-awesome.md";
  slug: "ministry-of-awesome";
  body: string;
  collection: "companies";
  data: any
} & { render(): Render[".md"] };
"moneytree.md": {
	id: "moneytree.md";
  slug: "moneytree";
  body: string;
  collection: "companies";
  data: any
} & { render(): Render[".md"] };
"origami.md": {
	id: "origami.md";
  slug: "origami";
  body: string;
  collection: "companies";
  data: any
} & { render(): Render[".md"] };
"rainforest-qa.md": {
	id: "rainforest-qa.md";
  slug: "rainforest-qa";
  body: string;
  collection: "companies";
  data: any
} & { render(): Render[".md"] };
"resn.md": {
	id: "resn.md";
  slug: "resn";
  body: string;
  collection: "companies";
  data: any
} & { render(): Render[".md"] };
"starboard-maritime-intelligence.md": {
	id: "starboard-maritime-intelligence.md";
  slug: "starboard-maritime-intelligence";
  body: string;
  collection: "companies";
  data: any
} & { render(): Render[".md"] };
"the-alchemist-design.md": {
	id: "the-alchemist-design.md";
  slug: "the-alchemist-design";
  body: string;
  collection: "companies";
  data: any
} & { render(): Render[".md"] };
"vuw.md": {
	id: "vuw.md";
  slug: "vuw";
  body: string;
  collection: "companies";
  data: any
} & { render(): Render[".md"] };
"xero.md": {
	id: "xero.md";
  slug: "xero";
  body: string;
  collection: "companies";
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
"feed-tagging.md": {
	id: "feed-tagging.md";
  slug: "feed-tagging";
  body: string;
  collection: "projects";
  data: any
} & { render(): Render[".md"] };
"photo-albums.md": {
	id: "photo-albums.md";
  slug: "photo-albums";
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
"voice-calling.md": {
	id: "voice-calling.md";
  slug: "voice-calling";
  body: string;
  collection: "projects";
  data: any
} & { render(): Render[".md"] };
"xero-me.md": {
	id: "xero-me.md";
  slug: "xero-me";
  body: string;
  collection: "projects";
  data: any
} & { render(): Render[".md"] };
};
"publications": {
"pro-design.md": {
	id: "pro-design.md";
  slug: "pro-design";
  body: string;
  collection: "publications";
  data: any
} & { render(): Render[".md"] };
"tweet-tray.md": {
	id: "tweet-tray.md";
  slug: "tweet-tray";
  body: string;
  collection: "publications";
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
"coaching-mentorship.md": {
	id: "coaching-mentorship.md";
  slug: "coaching-mentorship";
  body: string;
  collection: "work";
  data: any
} & { render(): Render[".md"] };
"facebook-product-designer.md": {
	id: "facebook-product-designer.md";
  slug: "facebook-product-designer";
  body: string;
  collection: "work";
  data: any
} & { render(): Render[".md"] };
"ministry-of-awesome-mentor.md": {
	id: "ministry-of-awesome-mentor.md";
  slug: "ministry-of-awesome-mentor";
  body: string;
  collection: "work";
  data: any
} & { render(): Render[".md"] };
"moneytree-design-consultant.md": {
	id: "moneytree-design-consultant.md";
  slug: "moneytree-design-consultant";
  body: string;
  collection: "work";
  data: any
} & { render(): Render[".md"] };
"moneytree-director-design-discovery.md": {
	id: "moneytree-director-design-discovery.md";
  slug: "moneytree-director-design-discovery";
  body: string;
  collection: "work";
  data: any
} & { render(): Render[".md"] };
"moneytree-director-design-fractional.md": {
	id: "moneytree-director-design-fractional.md";
  slug: "moneytree-director-design-fractional";
  body: string;
  collection: "work";
  data: any
} & { render(): Render[".md"] };
"moneytree-director-design.md": {
	id: "moneytree-director-design.md";
  slug: "moneytree-director-design";
  body: string;
  collection: "work";
  data: any
} & { render(): Render[".md"] };
"moneytree-product-design-lead.md": {
	id: "moneytree-product-design-lead.md";
  slug: "moneytree-product-design-lead";
  body: string;
  collection: "work";
  data: any
} & { render(): Render[".md"] };
"moneytree-senior-designer.md": {
	id: "moneytree-senior-designer.md";
  slug: "moneytree-senior-designer";
  body: string;
  collection: "work";
  data: any
} & { render(): Render[".md"] };
"origami-designer.md": {
	id: "origami-designer.md";
  slug: "origami-designer";
  body: string;
  collection: "work";
  data: any
} & { render(): Render[".md"] };
"personal-stay-at-home-dad.md": {
	id: "personal-stay-at-home-dad.md";
  slug: "personal-stay-at-home-dad";
  body: string;
  collection: "work";
  data: any
} & { render(): Render[".md"] };
"rainforest-qa-design-lead.md": {
	id: "rainforest-qa-design-lead.md";
  slug: "rainforest-qa-design-lead";
  body: string;
  collection: "work";
  data: any
} & { render(): Render[".md"] };
"rainforest-qa-director-design.md": {
	id: "rainforest-qa-director-design.md";
  slug: "rainforest-qa-director-design";
  body: string;
  collection: "work";
  data: any
} & { render(): Render[".md"] };
"resn-intern.md": {
	id: "resn-intern.md";
  slug: "resn-intern";
  body: string;
  collection: "work";
  data: any
} & { render(): Render[".md"] };
"starboard-creative-generalist.md": {
	id: "starboard-creative-generalist.md";
  slug: "starboard-creative-generalist";
  body: string;
  collection: "work";
  data: any
} & { render(): Render[".md"] };
"the-alchemist-junior-web-designer.md": {
	id: "the-alchemist-junior-web-designer.md";
  slug: "the-alchemist-junior-web-designer";
  body: string;
  collection: "work";
  data: any
} & { render(): Render[".md"] };
"vuw-research-assistant.md": {
	id: "vuw-research-assistant.md";
  slug: "vuw-research-assistant";
  body: string;
  collection: "work";
  data: any
} & { render(): Render[".md"] };
"vuw-teacher-assistant.md": {
	id: "vuw-teacher-assistant.md";
  slug: "vuw-teacher-assistant";
  body: string;
  collection: "work";
  data: any
} & { render(): Render[".md"] };
"vuw-web-graphic-designer.md": {
	id: "vuw-web-graphic-designer.md";
  slug: "vuw-web-graphic-designer";
  body: string;
  collection: "work";
  data: any
} & { render(): Render[".md"] };
"xero-mobile-product-designer.md": {
	id: "xero-mobile-product-designer.md";
  slug: "xero-mobile-product-designer";
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
