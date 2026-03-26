import React from 'react';
import { Layout } from '../components/Layout';
import { SEO } from '../components/SEO';
import { Schema } from '../components/Schema';
import { Info, Shield, Zap, Users, Target, Heart } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <Layout>
      <SEO 
        title="About Us - My Tool Hub" 
        description="Learn more about My Tool Hub, our mission to provide free online tools, and our commitment to user privacy and blazing-fast performance."
        keywords={['about my tool hub', 'free online tools mission', 'privacy first tools']}
        canonicalUrl="https://mytoolhub.info/about"
      />
      <Schema 
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "name": "About Us - My Tool Hub",
          "url": "https://mytoolhub.info/about",
          "description": "Information about My Tool Hub, its mission, and values.",
          "mainEntity": {
            "@type": "Organization",
            "name": "My Tool Hub",
            "url": "https://mytoolhub.info",
            "logo": "https://mytoolhub.info/logo.png"
          }
        }}
      />
      <div className="py-24 max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black text-neutral-900 mb-6">About My Tool Hub</h1>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed">
            Empowering millions of users with free, fast, and secure online tools since 2024. We are dedicated to making digital tasks easier for everyone.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          <div className="bg-white p-10 rounded-[2.5rem] border border-neutral-200 shadow-xl">
            <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6">
              <Shield size={28} />
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-4">Privacy First</h3>
            <p className="text-neutral-600 leading-relaxed">
              We believe your data belongs to you. Most of our tools process data directly in your browser, meaning your sensitive information never even reaches our servers.
            </p>
          </div>
          <div className="bg-white p-10 rounded-[2.5rem] border border-neutral-200 shadow-xl">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
              <Zap size={28} />
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-4">Blazing Fast</h3>
            <p className="text-neutral-600 leading-relaxed">
              Built with modern web technologies, My Tool Hub ensures that every utility is optimized for speed. No waiting, no lag—just results.
            </p>
          </div>
          <div className="bg-white p-10 rounded-[2.5rem] border border-neutral-200 shadow-xl">
            <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-6">
              <Users size={28} />
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-4">Community Driven</h3>
            <p className="text-neutral-600 leading-relaxed">
              We constantly add new tools based on user feedback. Our goal is to be the ultimate Swiss Army knife for the internet.
            </p>
          </div>
          <div className="bg-white p-10 rounded-[2.5rem] border border-neutral-200 shadow-xl">
            <div className="w-14 h-14 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mb-6">
              <Info size={28} />
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-4">100% Free</h3>
            <p className="text-neutral-600 leading-relaxed">
              No subscriptions, no hidden fees, and no registration required. Access all 50+ tools instantly from any device.
            </p>
          </div>
        </div>

        <div className="space-y-16">
          <div className="bg-neutral-900 rounded-[3rem] p-16 text-center text-white">
            <div className="flex justify-center mb-6">
              <Target size={48} className="text-indigo-400" />
            </div>
            <h2 className="text-3xl font-black mb-6">Our Mission</h2>
            <p className="text-neutral-400 text-lg max-w-3xl mx-auto leading-relaxed">
              To provide a comprehensive suite of high-quality digital utilities that simplify complex tasks for developers, designers, students, and professionals worldwide. We strive to maintain the highest standards of accessibility and performance. Our mission is to be the most reliable and user-friendly <strong>free AI tools</strong> platform on the internet.
            </p>
          </div>

          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Heart size={48} className="text-rose-500" />
            </div>
            <h2 className="text-3xl font-black text-neutral-900 mb-6">Why We Do It</h2>
            <p className="text-neutral-600 text-lg max-w-3xl mx-auto leading-relaxed mb-8">
              We started My Tool Hub because we were tired of cluttered, slow, and ad-heavy tool sites that required registration for simple tasks. We wanted to build a clean, minimal, and powerful alternative that puts the user experience first. Every tool we build is a step toward a more efficient web.
            </p>
            <div className="prose prose-neutral max-w-none text-left bg-neutral-50 p-12 rounded-[3rem] border border-neutral-100">
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">A Better Alternative to My Tools Hub</h3>
              <p className="text-neutral-600 leading-relaxed mb-6">
                Many users are familiar with platforms like <strong>My Tools Hub</strong>, but they often find them overwhelming or slow. At <strong>My Tool Hub (mytoolhub.info)</strong>, we have focused on a "less is more" philosophy. Our tools are optimized for mobile and desktop, ensuring that you can generate an AI caption or format JSON while on the go or at your workstation.
              </p>
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">Our Commitment to the Community</h3>
              <p className="text-neutral-600 leading-relaxed">
                We are committed to keeping our tools free forever. We support our operations through minimal, non-intrusive advertising (AdSense) and community support. This allows us to keep innovating and adding new <strong>AI generator tools</strong> and <strong>online tools</strong> to our library every month. Thank you for being part of our journey!
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
