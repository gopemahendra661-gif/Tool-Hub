import React from 'react';
import { Layout } from '../components/Layout';
import { FileText, AlertCircle, Scale, CheckCircle } from 'lucide-react';
import { SEO } from '../components/SEO';
import { Schema } from '../components/Schema';

export const Terms: React.FC = () => {
  return (
    <Layout>
      <SEO 
        title="Terms of Service - My Tool Hub" 
        description="Read the Terms of Service for My Tool Hub. Understand the rules, guidelines, and legal agreements for using our free online tools."
        keywords={['terms of service', 'my tool hub terms', 'user agreement', 'legal']}
        canonicalUrl="https://mytoolhub.info/terms"
      />
      <Schema 
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Terms of Service - My Tool Hub",
          "url": "https://mytoolhub.info/terms",
          "description": "Terms of Service for My Tool Hub, outlining the rules and regulations for using the website.",
          "publisher": {
            "@type": "Organization",
            "name": "My Tool Hub",
            "url": "https://mytoolhub.info"
          }
        }}
      />
      <div className="py-24 max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="w-20 h-20 bg-amber-50 text-amber-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-inner">
            <FileText size={40} />
          </div>
          <h1 className="text-5xl font-black text-neutral-900 mb-6">Terms of Service</h1>
          <p className="text-xl text-neutral-600">Last updated: March 21, 2026</p>
        </div>

        <div className="bg-white p-12 rounded-[3rem] border border-neutral-200 shadow-xl space-y-12">
          <section className="space-y-4">
            <div className="flex items-center gap-3 text-indigo-600 mb-2">
              <CheckCircle size={24} />
              <h2 className="text-2xl font-bold">Acceptance of Terms & Use of AI Tools</h2>
            </div>
            <p className="text-neutral-600 leading-relaxed">
              By accessing and using My Tool Hub (mytoolhub.info), you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you must not use our services. These terms apply to all visitors, users, and others who access or use the Service.
            </p>
            <p className="text-neutral-600 leading-relaxed">
              When using our <strong>AI generator tools</strong>, you agree to use them responsibly. You are responsible for the inputs you provide and the outputs you generate. While our AI tools are designed to provide high-quality content, we do not guarantee the accuracy or appropriateness of the results for any specific purpose.
            </p>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3 text-rose-600 mb-2">
              <AlertCircle size={24} />
              <h2 className="text-2xl font-bold">Disclaimer of Warranties</h2>
            </div>
            <p className="text-neutral-600 leading-relaxed">
              My Tool Hub provides its tools and services on an "as is" and "as available" basis. We make no warranties, expressed or implied, regarding the accuracy, reliability, or availability of our tools. We do not warrant that the results obtained from the use of the service will be accurate or reliable. Use of any tool is at your own risk.
            </p>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3 text-emerald-600 mb-2">
              <Scale size={24} />
              <h2 className="text-2xl font-bold">Limitations of Liability</h2>
            </div>
            <p className="text-neutral-600 leading-relaxed">
              In no event shall My Tool Hub or its creators be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on My Tool Hub, even if we have been notified orally or in writing of the possibility of such damage.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-neutral-900">User Conduct and Content</h2>
            <p className="text-neutral-600 leading-relaxed">
              You agree not to use My Tool Hub for any unlawful purpose or in any way that could damage, disable, overburden, or impair the site. You are solely responsible for the content you process through our tools. You must not upload or process any content that:
            </p>
            <ul className="list-disc list-inside text-neutral-600 space-y-2 ml-4">
              <li>Is illegal, threatening, or defamatory</li>
              <li>Infringes on any third-party intellectual property rights</li>
              <li>Contains software viruses or any other harmful computer code</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-neutral-900">Intellectual Property</h2>
            <p className="text-neutral-600 leading-relaxed">
              The Service and its original content, features, and functionality are and will remain the exclusive property of My Tool Hub and its licensors. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of My Tool Hub.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-neutral-900">Modifications to Service</h2>
            <p className="text-neutral-600 leading-relaxed">
              My Tool Hub reserves the right to revise these terms of service at any time without notice. We also reserve the right to modify or discontinue, temporarily or permanently, the Service (or any part thereof) with or without notice.
            </p>
          </section>

          <div className="pt-8 border-t border-neutral-100">
            <p className="text-neutral-400 text-sm text-center">
              For any legal inquiries, please contact chillforai@gmail.com
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};
