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
		"achievements": {
"academic-achievement.md": {
	id: "academic-achievement.md";
  slug: "academic-achievement";
  body: string;
  collection: "achievements";
  data: any
} & { render(): Render[".md"] };
"eliciting-user-sharing.md": {
	id: "eliciting-user-sharing.md";
  slug: "eliciting-user-sharing";
  body: string;
  collection: "achievements";
  data: any
} & { render(): Render[".md"] };
"fast-company.md": {
	id: "fast-company.md";
  slug: "fast-company";
  body: string;
  collection: "achievements";
  data: any
} & { render(): Render[".md"] };
"omg-ubuntu.md": {
	id: "omg-ubuntu.md";
  slug: "omg-ubuntu";
  body: string;
  collection: "achievements";
  data: any
} & { render(): Render[".md"] };
"pro-design.md": {
	id: "pro-design.md";
  slug: "pro-design";
  body: string;
  collection: "achievements";
  data: any
} & { render(): Render[".md"] };
"student-achievement.md": {
	id: "student-achievement.md";
  slug: "student-achievement";
  body: string;
  collection: "achievements";
  data: any
} & { render(): Render[".md"] };
"windows-central.md": {
	id: "windows-central.md";
  slug: "windows-central";
  body: string;
  collection: "achievements";
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
"experience": {
"facebook.md": {
	id: "facebook.md";
  slug: "facebook";
  body: string;
  collection: "experience";
  data: any
} & { render(): Render[".md"] };
"moneytree-return.md": {
	id: "moneytree-return.md";
  slug: "moneytree-return";
  body: string;
  collection: "experience";
  data: any
} & { render(): Render[".md"] };
"moneytree.md": {
	id: "moneytree.md";
  slug: "moneytree";
  body: string;
  collection: "experience";
  data: any
} & { render(): Render[".md"] };
"origami.md": {
	id: "origami.md";
  slug: "origami";
  body: string;
  collection: "experience";
  data: any
} & { render(): Render[".md"] };
"rainforest-qa.md": {
	id: "rainforest-qa.md";
  slug: "rainforest-qa";
  body: string;
  collection: "experience";
  data: any
} & { render(): Render[".md"] };
"resn.md": {
	id: "resn.md";
  slug: "resn";
  body: string;
  collection: "experience";
  data: any
} & { render(): Render[".md"] };
"sabbatical.md": {
	id: "sabbatical.md";
  slug: "sabbatical";
  body: string;
  collection: "experience";
  data: any
} & { render(): Render[".md"] };
"starboard.md": {
	id: "starboard.md";
  slug: "starboard";
  body: string;
  collection: "experience";
  data: any
} & { render(): Render[".md"] };
"xero.md": {
	id: "xero.md";
  slug: "xero";
  body: string;
  collection: "experience";
  data: any
} & { render(): Render[".md"] };
};
"people": {
"aaron-carambula.md": {
	id: "aaron-carambula.md";
  slug: "aaron-carambula";
  body: string;
  collection: "people";
  data: any
} & { render(): Render[".md"] };
"akihiro-ome.md": {
	id: "akihiro-ome.md";
  slug: "akihiro-ome";
  body: string;
  collection: "people";
  data: any
} & { render(): Render[".md"] };
"alex-kyo.md": {
	id: "alex-kyo.md";
  slug: "alex-kyo";
  body: string;
  collection: "people";
  data: any
} & { render(): Render[".md"] };
"alexander-auld.md": {
	id: "alexander-auld.md";
  slug: "alexander-auld";
  body: string;
  collection: "people";
  data: any
} & { render(): Render[".md"] };
"andy-chung.md": {
	id: "andy-chung.md";
  slug: "andy-chung";
  body: string;
  collection: "people";
  data: any
} & { render(): Render[".md"] };
"andy-hovey.md": {
	id: "andy-hovey.md";
  slug: "andy-hovey";
  body: string;
  collection: "people";
  data: any
} & { render(): Render[".md"] };
"antony-brown.md": {
	id: "antony-brown.md";
  slug: "antony-brown";
  body: string;
  collection: "people";
  data: any
} & { render(): Render[".md"] };
"arata-yanase.md": {
	id: "arata-yanase.md";
  slug: "arata-yanase";
  body: string;
  collection: "people";
  data: any
} & { render(): Render[".md"] };
"austin-bales.md": {
	id: "austin-bales.md";
  slug: "austin-bales";
  body: string;
  collection: "people";
  data: any
} & { render(): Render[".md"] };
"barton-smith.md": {
	id: "barton-smith.md";
  slug: "barton-smith";
  body: string;
  collection: "people";
  data: any
} & { render(): Render[".md"] };
"ben-kelly.md": {
	id: "ben-kelly.md";
  slug: "ben-kelly";
  body: string;
  collection: "people";
  data: any
} & { render(): Render[".md"] };
"bhupendra-singh.md": {
	id: "bhupendra-singh.md";
  slug: "bhupendra-singh";
  body: string;
  collection: "people";
  data: any
} & { render(): Render[".md"] };
"billy-roh.md": {
	id: "billy-roh.md";
  slug: "billy-roh";
  body: string;
  collection: "people";
  data: any
} & { render(): Render[".md"] };
"bob-baldwin.md": {
	id: "bob-baldwin.md";
  slug: "bob-baldwin";
  body: string;
  collection: "people";
  data: any
} & { render(): Render[".md"] };
"brian-boarini.md": {
	id: "brian-boarini.md";
  slug: "brian-boarini";
  body: string;
  collection: "people";
  data: any
} & { render(): Render[".md"] };
"camy-tsukamoto.md": {
	id: "camy-tsukamoto.md";
  slug: "camy-tsukamoto";
  body: string;
  collection: "people";
  data: any
} & { render(): Render[".md"] };
"charlie-deets.md": {
	id: "charlie-deets.md";
  slug: "charlie-deets";
  body: string;
  collection: "people";
  data: any
} & { render(): Render[".md"] };
"chris-kalani.md": {
	id: "chris-kalani.md";
  slug: "chris-kalani";
  body: string;
  collection: "people";
  data: any
} & { render(): Render[".md"] };
"christophe-tauziet.md": {
	id: "christophe-tauziet.md";
  slug: "christophe-tauziet";
  body: string;
  collection: "people";
  data: any
} & { render(): Render[".md"] };
"christopher-chedeau.md": {
	id: "christopher-chedeau.md";
  slug: "christopher-chedeau";
  body: string;
  collection: "people";
  data: any
} & { render(): Render[".md"] };
"colin-dunn.md": {
	id: "colin-dunn.md";
  slug: "colin-dunn";
  body: string;
  collection: "people";
  data: any
} & { render(): Render[".md"] };
"dan-barak.md": {
	id: "dan-barak.md";
  slug: "dan-barak";
  body: string;
  collection: "people";
  data: any
} & { render(): Render[".md"] };
"dan-cowell.md": {
	id: "dan-cowell.md";
  slug: "dan-cowell";
  body: string;
  collection: "people";
  data: any
} & { render(): Render[".md"] };
"dan-newman.md": {
	id: "dan-newman.md";
  slug: "dan-newman";
  body: string;
  collection: "people";
  data: any
} & { render(): Render[".md"] };
"dineth-mapa.md": {
	id: "dineth-mapa.md";
  slug: "dineth-mapa";
  body: string;
  collection: "people";
  data: any
} & { render(): Render[".md"] };
"dongri-jin.md": {
	id: "dongri-jin.md";
  slug: "dongri-jin";
  body: string;
  collection: "people";
  data: any
} & { render(): Render[".md"] };
"emlyn-hughes.md": {
	id: "emlyn-hughes.md";
  slug: "emlyn-hughes";
  body: string;
  collection: "people";
  data: any
} & { render(): Render[".md"] };
"fiid-williams.md": {
	id: "fiid-williams.md";
  slug: "fiid-williams";
  body: string;
  collection: "people";
  data: any
} & { render(): Render[".md"] };
"george-hajian.md": {
	id: "george-hajian.md";
  slug: "george-hajian";
  body: string;
  collection: "people";
  data: any
} & { render(): Render[".md"] };
"gosha-tcherednitchenko.md": {
	id: "gosha-tcherednitchenko.md";
  slug: "gosha-tcherednitchenko";
  body: string;
  collection: "people";
  data: any
} & { render(): Render[".md"] };
"hayoung-shin.md": {
	id: "hayoung-shin.md";
  slug: "hayoung-shin";
  body: string;
  collection: "people";
  data: any
} & { render(): Render[".md"] };
"hiro-noguchi.md": {
	id: "hiro-noguchi.md";
  slug: "hiro-noguchi";
  body: string;
  collection: "people";
  data: any
} & { render(): Render[".md"] };
"isaac-minogue.md": {
	id: "isaac-minogue.md";
  slug: "isaac-minogue";
  body: string;
  collection: "people";
  data: any
} & { render(): Render[".md"] };
"james-simpson.md": {
	id: "james-simpson.md";
  slug: "james-simpson";
  body: string;
  collection: "people";
  data: any
} & { render(): Render[".md"] };
"jan-grodowski.md": {
	id: "jan-grodowski.md";
  slug: "jan-grodowski";
  body: string;
  collection: "people";
  data: any
} & { render(): Render[".md"] };
"jason-cashdollar.md": {
	id: "jason-cashdollar.md";
  slug: "jason-cashdollar";
  body: string;
  collection: "people";
  data: any
} & { render(): Render[".md"] };
"jasper-r-hauser.md": {
	id: "jasper-r-hauser.md";
  slug: "jasper-r-hauser";
  body: string;
  collection: "people";
  data: any
} & { render(): Render[".md"] };
"jeremy-bank.md": {
	id: "jeremy-bank.md";
  slug: "jeremy-bank";
  body: string;
  collection: "people";
  data: any
} & { render(): Render[".md"] };
"jitachi-garcia.md": {
	id: "jitachi-garcia.md";
  slug: "jitachi-garcia";
  body: string;
  collection: "people";
  data: any
} & { render(): Render[".md"] };
"jonathan-arena.md": {
	id: "jonathan-arena.md";
  slug: "jonathan-arena";
  body: string;
  collection: "people";
  data: any
} & { render(): Render[".md"] };
"jonathan-barber.md": {
	id: "jonathan-barber.md";
  slug: "jonathan-barber";
  body: string;
  collection: "people";
  data: any
} & { render(): Render[".md"] };
"jonathan-hawke.md": {
	id: "jonathan-hawke.md";
  slug: "jonathan-hawke";
  body: string;
  collection: "people";
  data: any
} & { render(): Render[".md"] };
"josh-wilburne.md": {
	id: "josh-wilburne.md";
  slug: "josh-wilburne";
  body: string;
  collection: "people";
  data: any
} & { render(): Render[".md"] };
"jp-ren.md": {
	id: "jp-ren.md";
  slug: "jp-ren";
  body: string;
  collection: "people";
  data: any
} & { render(): Render[".md"] };
"jt-trollman.md": {
	id: "jt-trollman.md";
  slug: "jt-trollman";
  body: string;
  collection: "people";
  data: any
} & { render(): Render[".md"] };
"juan-arreguin.md": {
	id: "juan-arreguin.md";
  slug: "juan-arreguin";
  body: string;
  collection: "people";
  data: any
} & { render(): Render[".md"] };
"kayla-sommer.md": {
	id: "kayla-sommer.md";
  slug: "kayla-sommer";
  body: string;
  collection: "people";
  data: any
} & { render(): Render[".md"] };
"keegan-jones.md": {
	id: "keegan-jones.md";
  slug: "keegan-jones";
  body: string;
  collection: "people";
  data: any
} & { render(): Render[".md"] };
"keita-suzuki.md": {
	id: "keita-suzuki.md";
  slug: "keita-suzuki";
  body: string;
  collection: "people";
  data: any
} & { render(): Render[".md"] };
"kejia-zhu.md": {
	id: "kejia-zhu.md";
  slug: "kejia-zhu";
  body: string;
  collection: "people";
  data: any
} & { render(): Render[".md"] };
"kelly-rummins.md": {
	id: "kelly-rummins.md";
  slug: "kelly-rummins";
  body: string;
  collection: "people";
  data: any
} & { render(): Render[".md"] };
"kris-hermansson.md": {
	id: "kris-hermansson.md";
  slug: "kris-hermansson";
  body: string;
  collection: "people";
  data: any
} & { render(): Render[".md"] };
"kyle-meyer.md": {
	id: "kyle-meyer.md";
  slug: "kyle-meyer";
  body: string;
  collection: "people";
  data: any
} & { render(): Render[".md"] };
"laura-javier.md": {
	id: "laura-javier.md";
  slug: "laura-javier";
  body: string;
  collection: "people";
  data: any
} & { render(): Render[".md"] };
"lavinia-petrache.md": {
	id: "lavinia-petrache.md";
  slug: "lavinia-petrache";
  body: string;
  collection: "people";
  data: any
} & { render(): Render[".md"] };
"lee-gibson.md": {
	id: "lee-gibson.md";
  slug: "lee-gibson";
  body: string;
  collection: "people";
  data: any
} & { render(): Render[".md"] };
"livio-canonica.md": {
	id: "livio-canonica.md";
  slug: "livio-canonica";
  body: string;
  collection: "people";
  data: any
} & { render(): Render[".md"] };
"luke-smith.md": {
	id: "luke-smith.md";
  slug: "luke-smith";
  body: string;
  collection: "people";
  data: any
} & { render(): Render[".md"] };
"maciej-gryka.md": {
	id: "maciej-gryka.md";
  slug: "maciej-gryka";
  body: string;
  collection: "people";
  data: any
} & { render(): Render[".md"] };
"makito-ninomiya.md": {
	id: "makito-ninomiya.md";
  slug: "makito-ninomiya";
  body: string;
  collection: "people";
  data: any
} & { render(): Render[".md"] };
"marcus-brown.md": {
	id: "marcus-brown.md";
  slug: "marcus-brown";
  body: string;
  collection: "people";
  data: any
} & { render(): Render[".md"] };
"mark-makdad.md": {
	id: "mark-makdad.md";
  slug: "mark-makdad";
  body: string;
  collection: "people";
  data: any
} & { render(): Render[".md"] };
"matej-hrescak.md": {
	id: "matej-hrescak.md";
  slug: "matej-hrescak";
  body: string;
  collection: "people";
  data: any
} & { render(): Render[".md"] };
"matt-halford.md": {
	id: "matt-halford.md";
  slug: "matt-halford";
  body: string;
  collection: "people";
  data: any
} & { render(): Render[".md"] };
"naoki-masuda.md": {
	id: "naoki-masuda.md";
  slug: "naoki-masuda";
  body: string;
  collection: "people";
  data: any
} & { render(): Render[".md"] };
"natalie-friedman.md": {
	id: "natalie-friedman.md";
  slug: "natalie-friedman";
  body: string;
  collection: "people";
  data: any
} & { render(): Render[".md"] };
"nathan-borror.md": {
	id: "nathan-borror.md";
  slug: "nathan-borror";
  body: string;
  collection: "people";
  data: any
} & { render(): Render[".md"] };
"neil-hamilton-ritchie.md": {
	id: "neil-hamilton-ritchie.md";
  slug: "neil-hamilton-ritchie";
  body: string;
  collection: "people";
  data: any
} & { render(): Render[".md"] };
"nikki-radov.md": {
	id: "nikki-radov.md";
  slug: "nikki-radov";
  body: string;
  collection: "people";
  data: any
} & { render(): Render[".md"] };
"noush-isaac.md": {
	id: "noush-isaac.md";
  slug: "noush-isaac";
  body: string;
  collection: "people";
  data: any
} & { render(): Render[".md"] };
"paul-chapman.md": {
	id: "paul-chapman.md";
  slug: "paul-chapman";
  body: string;
  collection: "people";
  data: any
} & { render(): Render[".md"] };
"philip-zhao.md": {
	id: "philip-zhao.md";
  slug: "philip-zhao";
  body: string;
  collection: "people";
  data: any
} & { render(): Render[".md"] };
"rena-matsumoto.md": {
	id: "rena-matsumoto.md";
  slug: "rena-matsumoto";
  body: string;
  collection: "people";
  data: any
} & { render(): Render[".md"] };
"rendy-pranata.md": {
	id: "rendy-pranata.md";
  slug: "rendy-pranata";
  body: string;
  collection: "people";
  data: any
} & { render(): Render[".md"] };
"roberto-sobachi.md": {
	id: "roberto-sobachi.md";
  slug: "roberto-sobachi";
  body: string;
  collection: "people";
  data: any
} & { render(): Render[".md"] };
"ryota-katoh.md": {
	id: "ryota-katoh.md";
  slug: "ryota-katoh";
  body: string;
  collection: "people";
  data: any
} & { render(): Render[".md"] };
"samyak-shah.md": {
	id: "samyak-shah.md";
  slug: "samyak-shah";
  body: string;
  collection: "people";
  data: any
} & { render(): Render[".md"] };
"sang-lee.md": {
	id: "sang-lee.md";
  slug: "sang-lee";
  body: string;
  collection: "people";
  data: any
} & { render(): Render[".md"] };
"shingo-fushimi.md": {
	id: "shingo-fushimi.md";
  slug: "shingo-fushimi";
  body: string;
  collection: "people";
  data: any
} & { render(): Render[".md"] };
"simon-neveu.md": {
	id: "simon-neveu.md";
  slug: "simon-neveu";
  body: string;
  collection: "people";
  data: any
} & { render(): Render[".md"] };
"susie-kim.md": {
	id: "susie-kim.md";
  slug: "susie-kim";
  body: string;
  collection: "people";
  data: any
} & { render(): Render[".md"] };
"takashi-nozawa.md": {
	id: "takashi-nozawa.md";
  slug: "takashi-nozawa";
  body: string;
  collection: "people";
  data: any
} & { render(): Render[".md"] };
"tetsuya-yamaguchi.md": {
	id: "tetsuya-yamaguchi.md";
  slug: "tetsuya-yamaguchi";
  body: string;
  collection: "people";
  data: any
} & { render(): Render[".md"] };
"thai-tran.md": {
	id: "thai-tran.md";
  slug: "thai-tran";
  body: string;
  collection: "people";
  data: any
} & { render(): Render[".md"] };
"thiago-hirai.md": {
	id: "thiago-hirai.md";
  slug: "thiago-hirai";
  body: string;
  collection: "people";
  data: any
} & { render(): Render[".md"] };
"tuhin-kumar.md": {
	id: "tuhin-kumar.md";
  slug: "tuhin-kumar";
  body: string;
  collection: "people";
  data: any
} & { render(): Render[".md"] };
"yoshiki-yasui.md": {
	id: "yoshiki-yasui.md";
  slug: "yoshiki-yasui";
  body: string;
  collection: "people";
  data: any
} & { render(): Render[".md"] };
"yoshito-hasaka.md": {
	id: "yoshito-hasaka.md";
  slug: "yoshito-hasaka";
  body: string;
  collection: "people";
  data: any
} & { render(): Render[".md"] };
"zach-taub.md": {
	id: "zach-taub.md";
  slug: "zach-taub";
  body: string;
  collection: "people";
  data: any
} & { render(): Render[".md"] };
};
"projects": {
"manifest.md": {
	id: "manifest.md";
  slug: "manifest";
  body: string;
  collection: "projects";
  data: any
} & { render(): Render[".md"] };
"tweet-tray.md": {
	id: "tweet-tray.md";
  slug: "tweet-tray";
  body: string;
  collection: "projects";
  data: any
} & { render(): Render[".md"] };
};
"sessions": {
"early-career.md": {
	id: "early-career.md";
  slug: "early-career";
  body: string;
  collection: "sessions";
  data: any
} & { render(): Render[".md"] };
"founder.md": {
	id: "founder.md";
  slug: "founder";
  body: string;
  collection: "sessions";
  data: any
} & { render(): Render[".md"] };
"mid-career.md": {
	id: "mid-career.md";
  slug: "mid-career";
  body: string;
  collection: "sessions";
  data: any
} & { render(): Render[".md"] };
"out-of-work.md": {
	id: "out-of-work.md";
  slug: "out-of-work";
  body: string;
  collection: "sessions";
  data: any
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = never;
}
