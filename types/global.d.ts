type Messages = typeof import("../messages/en.json");
type TrMessages = typeof import("../messages/tr.json");

declare interface IntlMessages extends Messages, TrMessages {}
