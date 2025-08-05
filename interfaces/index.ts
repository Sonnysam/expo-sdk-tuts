export interface Contact {
  id: string;
  name: string;
  phoneNumbers?: { number: string; label: string }[];
}
