export interface FaqItem {
  category: string;
  faqs: {
    question: string;
    answer: string;
    active: boolean | false;
  }[];
}

export interface IFAQFilterModel {
  label: string;
  value: string;
}
