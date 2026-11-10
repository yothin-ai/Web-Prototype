# Mock Prototype Showcase

A single website that hosts several clickable mock sites of different kinds, used to help a client or executive decide which direction to build. Nothing is sent to a server.

## Language

**Prototype**:
One clickable mock site of a single kind (for example E-Commerce, Landing Page or Educational), complete enough to walk through end to end.
_Avoid_: Demo site, template, mockup

**Hub**:
The entry page that lists every Prototype and lets someone open one.
_Avoid_: Home, menu, launcher

**Presenter**:
The person who opens and switches between Prototypes live while pitching a decision.
_Avoid_: Host, demoer

**Viewer**:
A person who opens a Prototype, through the Hub or a direct link, to judge it.
_Avoid_: Client, user, audience

**Demo state**:
Whatever a Viewer has entered or saved inside one Prototype, kept only in their own browser and separate for each Prototype.
_Avoid_: Data, session, account

**Reset**:
Clearing a Prototype's Demo state so the next walkthrough starts from the beginning, either for one Prototype or for all of them.
_Avoid_: Clear, wipe

**Journey**:
The one main end-to-end path a Prototype must let a Viewer click through, such as browse, cart, checkout, confirmation and order history for E-Commerce.
_Avoid_: Flow, scenario, use case

**Dataset**:
A named bundle of content and wording in Thai and English that every Prototype reads, such as the generic default or one for a specific client. It carries no visual styling, and a Viewer picks one at a time from the Hub.
_Avoid_: Content pack, config, seed

**Language**:
Thai or English, switched by a Viewer from the Shell and kept in Demo state; content missing in one Language falls back to the Dataset's main Language.
_Avoid_: Locale, translation

**Shell**:
The shared frame around every Prototype, holding the way back to the Hub, the Prototype name and Reset; it can be hidden for a clean full-screen view.
_Avoid_: Wrapper, chrome, layout

**Moodboard**:
The `/moodboard` page that is the single source of truth for the system's look and feel, read by both people and AI; every Prototype's UI follows it and nothing else.
_Avoid_: Style guide, theme, mockup

**Storefront**:
The frame shared by every E-Commerce page: promo strip, utility bar, site header and category menu above the page, and a footer below.
_Avoid_: Layout, template, chrome

**Back Office**:
The Prototype for the shop's owner and staff: orders to pack, stock to count and receive. It reads the same Dataset and the same orders as the E-Commerce Prototype, so what a Viewer does in the storefront shows up here and the other way round.
_Avoid_: Admin, dashboard, ERP

**Stock**:
How many of a product a place holds. Three figures: on hand (on the shelf), set aside (ordered but not yet packed) and available (on hand minus set aside, what the storefront may sell). Nothing is stored as a total; each figure is worked out from the Dataset's starting stock, the orders and the movements the Back Office recorded, so a Reset puts it back.
_Avoid_: Inventory, quantity

**Transfer**:
A move of goods between two places (the central warehouse and the branches). Stock leaves the source when the transfer is approved and reaches the destination when it is received.
_Avoid_: Shipment, relocation

**Purchase order**:
An order to a supplier for goods. It moves from draft to ordered to received, and receiving it adds the stock at the chosen place.
_Avoid_: Procurement, PO request

**Daily close**:
Closing one day's books by comparing the cash counted at the till with the cash the books expect. A closed day takes no new costs until it is reopened.
_Avoid_: End of day, reconciliation

**Tax invoice**:
A document for a shopper who asked for one at checkout, with its own number given when it is issued. The Back Office shows only a sample of the document, never a real tax document.
_Avoid_: Receipt, e-Tax file

**Flash Sale**:
A time-limited group of discounted products shown with a countdown, each carrying its price before the discount and how many are sold and left.
_Avoid_: Promotion, deal of the day

**Category tree**:
The three-level list of product groups (category, subcategory, item) that the Storefront's category menu shows; each Dataset carries its own.
_Avoid_: Taxonomy, sitemap

**Product page**:
The page for one product, with its gallery, price and buy box, details, specifications, reviews and related products.
_Avoid_: Detail page, PDP

