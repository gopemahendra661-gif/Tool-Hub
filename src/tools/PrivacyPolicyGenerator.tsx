import React, { useState } from 'react';
import { Shield, Copy, Check, Download } from 'lucide-react';
import { ToolComponentProps } from '../types';

export const PrivacyPolicyGenerator: React.FC<ToolComponentProps> = () => {
  const [formData, setFormData] = useState({
    websiteName: '',
    websiteUrl: '',
    companyName: '',
    email: '',
    country: '',
    state: '',
  });
  const [policy, setPolicy] = useState('');
  const [copied, setCopied] = useState(false);

  const generatePolicy = () => {
    const { websiteName, websiteUrl, companyName, email, country, state } = formData;
    if (!websiteName || !websiteUrl) return;

    const date = new Date().toLocaleDateString();
    const generatedPolicy = `
# Privacy Policy for ${websiteName}

At ${websiteName}, accessible from ${websiteUrl}, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by ${websiteName} and how we use it.

If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.

This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in ${websiteName}. This policy is not applicable to any information collected offline or via channels other than this website.

## Consent

By using our website, you hereby consent to our Privacy Policy and agree to its terms.

## Information we collect

The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.

If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.

When you register for an Account, we may ask for your contact information, including items such as name, company name, address, email address, and telephone number.

## How we use your information

We use the information we collect in various ways, including to:

* Provide, operate, and maintain our website
* Improve, personalize, and expand our website
* Understand and analyze how you use our website
* Develop new products, services, features, and functionality
* Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes
* Send you emails
* Find and prevent fraud

## Log Files

${websiteName} follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.

## Cookies and Web Beacons

Like any other website, ${websiteName} uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.

## Google DoubleClick DART Cookie

Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to www.website.com and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL – https://policies.google.com/technologies/ads

## Advertising Partners Privacy Policies

You may consult this list to find the Privacy Policy for each of the advertising partners of ${websiteName}.

Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on ${websiteName}, which are sent directly to users' browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.

Note that ${websiteName} has no access to or control over these cookies that are used by third-party advertisers.

## Third Party Privacy Policies

${websiteName}'s Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.

You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers' respective websites.

## CCPA Privacy Rights (Do Not Sell My Personal Information)

Under the CCPA, among other rights, California consumers have the right to:

Request that a business that collects a consumer's personal data disclose the categories and specific pieces of personal data that a business has collected about consumers.

Request that a business delete any personal data about the consumer that a business has collected.

Request that a business that sells a consumer's personal data, not sell the consumer's personal data.

If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.

## GDPR Data Protection Rights

We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:

The right to access – You have the right to request copies of your personal data. We may charge you a small fee for this service.

The right to rectification – You have the right to request that we correct any information you believe is inaccurate. You also have the right to request that we complete the information you believe is incomplete.

The right to erasure – You have the right to request that we erase your personal data, under certain conditions.

The right to restrict processing – You have the right to request that we restrict the processing of your personal data, under certain conditions.

The right to object to processing – You have the right to object to our processing of your personal data, under certain conditions.

The right to data portability – You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.

If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.

## Children's Information

Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.

${websiteName} does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.

## Contact Us

If you have any questions about this Privacy Policy, you can contact us:

* By email: ${email || 'your-email@example.com'}
* By visiting this page on our website: ${websiteUrl}/contact

Generated by MyToolHub Privacy Policy Generator on ${date}.
    `;
    setPolicy(generatedPolicy);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(policy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadPolicy = () => {
    const element = document.createElement("a");
    const file = new Blob([policy], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "privacy-policy.txt";
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div className="space-y-8">
      <div className="bg-white p-8 rounded-3xl border border-neutral-200 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-neutral-900 mb-2">Website Name</label>
            <input
              type="text"
              className="w-full p-4 bg-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="e.g. My Tool Hub"
              value={formData.websiteName}
              onChange={(e) => setFormData({ ...formData, websiteName: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-neutral-900 mb-2">Website URL</label>
            <input
              type="text"
              className="w-full p-4 bg-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="e.g. https://mytoolhub.info"
              value={formData.websiteUrl}
              onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-neutral-900 mb-2">Company Name (Optional)</label>
            <input
              type="text"
              className="w-full p-4 bg-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="e.g. My Tool Hub Inc."
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-neutral-900 mb-2">Contact Email</label>
            <input
              type="email"
              className="w-full p-4 bg-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="e.g. contact@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
        </div>
        <button
          onClick={generatePolicy}
          className="mt-8 w-full py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
        >
          <Shield size={20} /> Generate Privacy Policy
        </button>
      </div>

      {policy && (
        <div className="bg-white p-8 rounded-3xl border border-neutral-200 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-neutral-900">Generated Privacy Policy</h3>
            <div className="flex gap-3">
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-4 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-xl transition-colors text-sm font-bold text-neutral-700"
              >
                {copied ? <Check size={16} className="text-emerald-600" /> : <Copy size={16} />}
                {copied ? 'Copied!' : 'Copy Text'}
              </button>
              <button
                onClick={downloadPolicy}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-colors text-sm font-bold text-indigo-600"
              >
                <Download size={16} /> Download .txt
              </button>
            </div>
          </div>
          <div className="bg-neutral-50 p-8 rounded-2xl border border-neutral-100 font-mono text-sm whitespace-pre-wrap h-96 overflow-y-auto">
            {policy}
          </div>
        </div>
      )}
    </div>
  );
};
