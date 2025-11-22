import AnnealingCalculatorContent from './AnnealingCalculatorContent';
import { AnnealingCalculatorGuide } from './AnnealingCalculatorGuide';
import CreatorCard from '../components/CreatorCard';

export const metadata = {
  title: 'Annealing Temperature Calculator — Estimate Ta from Tm',
  description: 'Estimate the PCR primer annealing temperature (Ta) from primer and target melting temperatures (Tm). Supports Celsius (°C), Fahrenheit (°F) and Kelvin (K) with practical tips for experiment optimization.',
  keywords: 'PCR annealing temperature calculator, primer annealing temperature, Ta calculator, primer Tm to Ta, PCR primer calculator, annealing temperature estimator',
  alternates: {
    canonical: 'https://bmi-calculator.com/annealing-temperature-calculator',
  },
  openGraph: {
    title: 'Annealing Temperature Calculator',
    description: 'Quickly calculate an empirical PCR annealing temperature (Ta) using primer and target Tm values. Includes unit conversion (°C/°F/K) and practical lab tips.',
    url: 'https://bmi-calculator.com/annealing-temperature-calculator',
    siteName: 'Free Online Calculators',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Annealing Temperature Calculator',
    description: 'Estimate PCR annealing temperature (Ta) from primer and target melting temperatures.',
  }
};

const annealingReferences = [
  {
    id: 1,
    authors: "Rychlik, W., Spencer, W. J., & Rhoads, R. E.",
    title: "Optimization of the annealing temperature for DNA amplification in vitro.",
    publication: "Nucleic Acids Research. 1990;18(21):6409-6412",
    url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC332522/",
    literatureType: "Journal Article",
    purpose: "Core calculation formula: Ta = 0.3×Tmp + 0.7×Tmt - 14.9"
  },
  {
    id: 2,
    authors: "Premier Biosoft",
    title: "PCR primer design guidelines.",
    publication: "Premier Biosoft International",
    url: "http://www.premierbiosoft.com/tech_notes/PCR_Primer_Design.html",
    literatureType: "Technical Guide",
    purpose: "Primer Tm: 52-58°C (Optimal range)"
  },
  {
    id: 3,
    authors: "Integrated DNA Technologies",
    title: "Primer design tips.",
    publication: "IDT DNA",
    url: "https://www.idtdna.com/pages/education/decoded/article/designing-pcr-primers-and-probes",
    literatureType: "Industry Standard",
    purpose: "Primer Tm: 52-64°C (Recommended range)"
  },
  {
    id: 4,
    authors: "Thermo Fisher Scientific",
    title: "PCR primer design guidelines.",
    publication: "Thermo Fisher Scientific",
    url: "https://www.thermofisher.com/us/en/home/life-science/cloning/cloning-learning-center/invitrogen-school-of-molecular-biology/pcr-education/pcr-reagents-enzymes/pcr-primer-design-guidelines.html",
    literatureType: "Technical Documentation",
    purpose: "Primer Tm: 55-65°C; Primer pair Tm difference ≤5°C"
  },
  {
    id: 5,
    authors: "Dieffenbach, C. W., Lowe, T. M., & Dveksler, G. S.",
    title: "General concepts for PCR primer design.",
    publication: "PCR Methods and Applications. 1993;3(3):S30-S37",
    url: "https://www.cshlpress.com/default.tpl?cart=1732338479389175865&fromlink=T&linkaction=full&linksortby=oop_title&--eqSKUdatarq=615",
    literatureType: "Journal Article",
    purpose: "Fundamental PCR primer design principles"
  },
  {
    id: 6,
    authors: "Wikipedia contributors",
    title: "Polymerase chain reaction.",
    publication: "Wikipedia, The Free Encyclopedia. 2024",
    url: "https://en.wikipedia.org/wiki/Polymerase_chain_reaction",
    literatureType: "Encyclopedia",
    purpose: "Standard PCR annealing temperature: 50-65°C"
  },
  {
    id: 7,
    authors: "AAT Bioquest",
    title: "PCR annealing temperature optimization.",
    publication: "Quest Graph™ Application Notes",
    url: "https://www.aatbio.com/resources/application-notes/pcr-annealing-temperature-optimization",
    literatureType: "Application Guide",
    purpose: "Annealing temperature optimization strategies"
  },
  {
    id: 8,
    authors: "Integrated DNA Technologies",
    title: "Rules and tips for PCR and qPCR primer design.",
    publication: "IDT Education",
    url: "https://www.idtdna.com/pages/education/decoded/article/rules-and-tips-for-pcr-and-qpcr-primer-design",
    literatureType: "Educational Resource",
    purpose: "Ta setting principles and practical tips"
  },
  {
    id: 9,
    authors: "Thermo Fisher Scientific",
    title: "PCR cycling considerations.",
    publication: "PCR Education Center",
    url: "https://www.thermofisher.com/us/en/home/life-science/cloning/cloning-learning-center/invitrogen-school-of-molecular-biology/pcr-education/pcr-reagents-enzymes/pcr-cycling-considerations.html",
    literatureType: "Technical Tutorial",
    purpose: "PCR three-step temperature control"
  },
  {
    id: 10,
    authors: "miniPCR",
    title: "How to design PCR primers.",
    publication: "miniPCR Learning Lab",
    url: "https://www.minipcr.com/how-to-design-pcr-primers/",
    literatureType: "Educational Resource",
    purpose: "Complete PCR primer design workflow"
  },
  {
    id: 11,
    authors: "Omnicalculator",
    title: "Annealing temperature calculator.",
    publication: "Biology Calculators",
    url: "https://www.omnicalculator.com/biology/annealing-temperature",
    literatureType: "Online Tool",
    purpose: "Calculator design reference"
  },
  {
    id: 12,
    authors: "Thornton, B., & Basu, C.",
    title: "Real-time PCR (qPCR) primer design using free online software.",
    publication: "Biochemistry and Molecular Biology Education. 2011;39(2):145-154",
    url: "https://iubmb.onlinelibrary.wiley.com/doi/10.1002/bmb.20461",
    literatureType: "Journal Article",
    purpose: "qPCR primer design methods"
  },
  {
    id: 13,
    authors: "Ye, J., Coulouris, G., Zaretskaya, I., Cutcutache, I., Rozen, S., & Madden, T. L.",
    title: "Primer-BLAST: A tool to design target-specific primers for polymerase chain reaction.",
    publication: "BMC Bioinformatics. 2012;13:134",
    url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3412702/",
    literatureType: "Journal Article",
    purpose: "NCBI Primer-BLAST tool"
  }
];

export default function AnnealingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      {/* Structured data for SEO */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Annealing Temperature Calculator",
        "description": "Estimate PCR primer annealing temperature (Ta) from primer and target melting temperatures (Tm).",
        "url": "https://bmi-calculator.com/annealing-temperature-calculator",
        "applicationCategory": "EducationApplication",
        "creator": {
          "@type": "Person",
          "name": "Frank Zhao"
        },
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        }
      }) }} />

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">Annealing Temperature Calculator</h1>
          <p className="text-gray-600 text-lg mb-2">Estimate optimal PCR primer annealing temperature (Ta) from melting temperatures (Tm).</p>
          <p className="text-gray-500 text-sm">Fast, accurate, and provides practical lab guidance with multi-unit support.</p>
          <div className="mt-3">
            <span className="inline-block bg-indigo-600 text-white text-xs px-3 py-1 rounded-full">Last updated: November 21, 2025</span>
          </div>
        </div>

        <CreatorCard calculatorName="Annealing Temperature Calculator" customReferences={annealingReferences} />

        <AnnealingCalculatorContent />

        <AnnealingCalculatorGuide />
      </div>
    </div>
  );
}
