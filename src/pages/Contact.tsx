import React from 'react';
import { Layout } from '../components/Layout';
import { SEO } from '../components/SEO';
import { Schema } from '../components/Schema';
import { Mail, MessageSquare, Send, MapPin } from 'lucide-react';

export const Contact: React.FC = () => {
  const [submitted, setSubmitted] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message'),
    };

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        const errorMessage = result.details ? `${result.error}: ${result.details}` : (result.error || 'Failed to send message. Please try again.');
        throw new Error(errorMessage);
      }

      setSubmitted(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <SEO 
        title="Contact Us - My Tool Hub" 
        description="Get in touch with My Tool Hub. We're here to help with any questions, feedback, or tool suggestions you may have."
        keywords={['contact my tool hub', 'feedback', 'support', 'tool suggestion']}
        canonicalUrl="https://mytoolhub.info/contact"
      />
      <Schema 
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "Contact Us - My Tool Hub",
          "url": "https://mytoolhub.info/contact",
          "description": "Contact page for My Tool Hub, providing ways to get in touch with the team.",
          "mainEntity": {
            "@type": "Organization",
            "name": "My Tool Hub",
            "url": "https://mytoolhub.info",
            "contactPoint": {
              "@type": "ContactPoint",
              "email": "chillforai@gmail.com",
              "contactType": "customer support"
            }
          }
        }}
      />
      <div className="py-24 max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-12">
            <div>
              <h1 className="text-5xl font-black text-neutral-900 mb-6">Get in Touch</h1>
              <p className="text-xl text-neutral-600 leading-relaxed mb-8">
                Have a question, feedback, or a tool suggestion? We'd love to hear from you. Our team typically responds within 24 hours.
              </p>
              <div className="prose prose-neutral max-w-none text-neutral-600 bg-neutral-50 p-8 rounded-[2.5rem] border border-neutral-100">
                <h3 className="text-xl font-bold text-neutral-900 mb-4">Why Contact My Tool Hub?</h3>
                <p className="mb-4">
                  We are constantly looking to improve our platform. If you have an idea for a new <strong>AI generator tool</strong> or if you've found a bug in one of our existing <strong>online tools</strong>, please let us know. Your feedback helps us maintain the highest standards of quality and utility for the entire community.
                </p>
                <p>
                  Whether you're a developer looking for a specific utility or a content creator with a unique request, we are here to support your digital journey.
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-neutral-900 mb-1">Email Us</h4>
                  <p className="text-neutral-500">chillforai@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shrink-0">
                  <MessageSquare size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-neutral-900 mb-1">Live Chat</h4>
                  <p className="text-neutral-500">Available Mon-Fri, 9am - 5pm EST</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-neutral-900 mb-1">Office</h4>
                  <p className="text-neutral-500">123 Tool Street, Digital City, DC 10101</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-12 rounded-[3rem] border border-neutral-200 shadow-2xl">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-12">
                <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center">
                  <Send size={40} />
                </div>
                <h3 className="text-3xl font-black text-neutral-900">Message Sent!</h3>
                <p className="text-neutral-500">Thank you for reaching out. We'll get back to you shortly.</p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="px-8 py-3 bg-neutral-900 text-white font-bold rounded-xl hover:bg-black transition-all"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-neutral-700 ml-1">Full Name</label>
                    <input 
                      required
                      name="name"
                      type="text" 
                      className="w-full p-4 bg-neutral-50 border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-neutral-700 ml-1">Email Address</label>
                    <input 
                      required
                      name="email"
                      type="email" 
                      className="w-full p-4 bg-neutral-50 border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-neutral-700 ml-1">Subject</label>
                  <select name="subject" className="w-full p-4 bg-neutral-50 border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all">
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Tool Suggestion">Tool Suggestion</option>
                    <option value="Bug Report">Bug Report</option>
                    <option value="Partnership">Partnership</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-neutral-700 ml-1">Message</label>
                  <textarea 
                    required
                    name="message"
                    className="w-full p-4 bg-neutral-50 border border-neutral-200 rounded-2xl h-40 focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none"
                    placeholder="Tell us more about your request..."
                  ></textarea>
                </div>
                {error && (
                  <p className="text-red-500 text-sm font-medium ml-1">{error}</p>
                )}
                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full py-5 bg-indigo-600 text-white font-black text-lg rounded-2xl shadow-xl shadow-indigo-100 hover:scale-[1.02] transition-all active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50 disabled:hover:scale-100"
                >
                  <Send size={20} className={loading ? 'animate-pulse' : ''} />
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};
