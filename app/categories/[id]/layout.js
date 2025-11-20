import { categoryData } from '../../utils/categoryData';

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const category = categoryData[resolvedParams.id];
  
  if (!category) {
    return {
      title: 'Category Not Found',
      description: 'The category you are looking for does not exist.',
    };
  }

  const categoryName = category.name;
  const title = `${categoryName} calculators`;
  const description = `Free online ${categoryName.toLowerCase()} calculators. Explore a wide range of tools designed specifically for ${categoryName.toLowerCase()} calculations.`;
  const keywords = category.keywords;

  return {
    title: title,
    description: description,
    keywords: keywords,
    alternates: {
      canonical: `https://www.calculatorvast.com/categories/${resolvedParams.id}`,
    },
    openGraph: {
      title: title,
      description: description,
      url: `https://www.calculatorvast.com/categories/${resolvedParams.id}`,
      siteName: 'CalculatorVast',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
    },
  };
}

export default function CategoriesLayout({ children }) {
  return children;
}
