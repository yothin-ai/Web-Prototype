# The Moodboard is the only source of UI styling

Every Prototype's UI is built only from the design tokens and components shown on `/moodboard`; no Prototype may carry its own colors, fonts or one-off components. A component the Moodboard lacks is proposed first and added to the Moodboard once the user approves it. We chose this over per-Prototype or per-Dataset styling so the three Prototypes stay visually consistent and AI can build UI by following one set of rules, at the cost of freedom to give each Prototype a distinct look.
