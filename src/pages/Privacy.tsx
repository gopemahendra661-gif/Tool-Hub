import React from 'react';
import { Layout } from '../components/Layout';
import { Shield, Lock, Eye, Server, ExternalLink } from 'lucide-react';
import { SEO } from '../components/SEO';
import { Schema } from '../components/Schema';

export const Privacy: React.FC = () => {
  return (
    <Layout>
      <SEO 
        title="Privacy Policy - My Tool Hub" 
        description="Read our Privacy Policy to understand how we collect, use, and protect your data at My Tool Hub. We prioritize your privacy and data security."
        keywords={['privacy policy', 'my tool hub privacy', 'data protection', 'cookie policy']}
        canonicalUrl="https://mytoolhub.info/privacy"
      />
      <Schema 
        data={{
          "@context": "https://schema.org",
          "@type": "PrivacyPolicy",
          "name": "Privacy Policy - My Tool Hub",
          "url": "https://mytoolhub.info/privacy",
          "description": "Privacy Policy for My Tool Hub, detailing data collection and usage practices.",
          "publisher": {
            "@type": "Organization",
            "name": "My Tool Hub",
            "url": "https://mytoolhub.info"
          }
        }}
      />
      <div className="py-24 max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-inner">
            <Shield size={40} />
          </div>
          <h1 className="text-5xl font-black text-neutral-900 mb-6">Privacy Policy</h1>
          <p className="text-xl text-neutral-600">Last updated: March 21, 2026</p>
        </div>

        <div className="bg-white p-12 rounded-[3rem] border border-neutral-200 shadow-xl space-y-12">
          <section className="space-y-4">
            <div className="flex items-center gap-3 text-indigo-600 mb-2">
              <Lock size={24} />
              <h2 className="text-2xl font-bold">Data Processing & User Privacy</h2>
            </div>
            <p className="text-neutral-600 leading-relaxed">
              At My Tool Hub (mytoolhub.info), we prioritize your privacy above all else. The vast majority of our tools are designed to process data locally in your browser. This means when you use our Text Tools, Image Tools, or Calculators, your data never leaves your device. We do not store or see the content you process. This "client-side" approach ensures that your sensitive information remains private and secure.
            </p>
            <p className="text-neutral-600 leading-relaxed">
              For our <strong>AI generator tools</strong>, data is processed through secure API endpoints. We do not store the input or output of these AI interactions on our servers. Your prompts and the generated content are used only for the immediate task and are not used to train models or for any other secondary purposes.
            </p>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3 text-emerald-600 mb-2">
              <Eye size={24} />
              <h2 className="text-2xl font-bold">Information We Collect</h2>
            </div>
            <p className="text-neutral-600 leading-relaxed">
              We do not collect or store the content you process through our tools. However, like most websites, we collect minimal, non-personally identifiable information to improve our services and understand how users interact with our platform:
            </p>
            <ul className="list-disc list-inside text-neutral-600 space-y-2 ml-4">
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>Pages visited and time spent</li>
              <li>Referrer URL and IP address (anonymized)</li>
            </ul>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3 text-amber-600 mb-2">
              <Server size={24} />
              <h2 className="text-2xl font-bold">Cookies and Web Beacons</h2>
            </div>
            <p className="text-neutral-600 leading-relaxed">
              We use essential cookies to ensure the site functions correctly and to remember your preferences. We also use third-party analytics (like Google Analytics) and advertising services.
            </p>
            <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100">
              <h3 className="font-bold text-amber-900 mb-2">Google DoubleClick DART Cookie</h3>
              <p className="text-amber-800 text-sm leading-relaxed">
                Google, as a third-party vendor, uses cookies to serve ads on My Tool Hub. Google's use of the DART cookie enables it to serve ads to our users based on their visit to our site and other sites on the Internet. Users may opt out of the use of the DART cookie by visiting the Google ad and content network privacy policy.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-neutral-900">Advertising Partners</h2>
            <p className="text-neutral-600 leading-relaxed">
              Some of our advertising partners may use cookies and web beacons on our site. Our advertising partners include:
            </p>
            <ul className="list-disc list-inside text-neutral-600 space-y-2 ml-4 font-bold">
              <li>Google AdSense</li>
            </ul>
            <p className="text-neutral-600 leading-relaxed">
              These third-party ad servers or ad networks use technology in their respective advertisements and links that appear on My Tool Hub, which are sent directly to your browser. They automatically receive your IP address when this occurs.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-neutral-900">Third-Party Privacy Policies</h2>
            <p className="text-neutral-600 leading-relaxed">
              My Tool Hub's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.
            </p>
          </section>

          <div className="pt-8 border-t border-neutral-100">
            <p className="text-neutral-400 text-sm text-center">
              If you have any questions about this Privacy Policy, please contact us at chillforai@gmail.com
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};
