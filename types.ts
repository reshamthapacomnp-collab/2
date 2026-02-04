
export interface WebsiteSection {
  title: string;
  description: string;
  features: string[];
}

export interface WebsiteData {
  businessName: string;
  tagline: string;
  heroText: string;
  aboutUs: string;
  sections: WebsiteSection[];
  colorPalette: {
    primary: string;
    secondary: string;
    accent: string;
  };
  imagePrompt: string;
}

export interface GeneratedAsset {
  data: WebsiteData | null;
  heroImage: string | null;
  loading: boolean;
  error: string | null;
}
