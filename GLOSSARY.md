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

**Flash Sale**:
A time-limited group of discounted products shown with a countdown, each carrying its price before the discount and how many are sold and left.
_Avoid_: Promotion, deal of the day

