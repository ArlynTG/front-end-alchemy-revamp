
import PolicyLayout from "@/components/PolicyLayout";

const PrivacyPolicy = () => {
  return (
    <PolicyLayout title="Privacy Policy">
      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-medium mb-4">Introduction</h2>
          <p className="mb-4">
            At Tobey's Tutor, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our AI-powered learning platform designed for neurodivergent learners.
          </p>
          <p>
            Please read this Privacy Policy carefully. By accessing or using our service, you acknowledge that you have read, understood, and agree to be bound by all the terms outlined in this Privacy Policy.
          </p>
        </section>
        
        <section>
          <h2 className="text-xl font-medium mb-4">Information We Collect</h2>
          <p className="mb-4">We may collect the following types of information:</p>
          <h3 className="text-lg font-medium mb-2">Personal Information</h3>
          <ul className="list-disc ml-6 mb-4 space-y-2">
            <li>Contact information (name, email address, phone number)</li>
            <li>Account credentials (username, password)</li>
            <li>Billing information (credit card details, billing address)</li>
            <li>Profile information (age, educational background, learning preferences)</li>
          </ul>
          
          <h3 className="text-lg font-medium mb-2">Usage Data</h3>
          <ul className="list-disc ml-6 mb-4 space-y-2">
            <li>Interaction with our platform (lessons completed, time spent, performance metrics)</li>
            <li>Learning patterns and preferences</li>
            <li>Technical data (IP address, browser type, device information)</li>
            <li>Cookies and similar tracking technologies</li>
          </ul>
        </section>
        
        <section>
          <h2 className="text-xl font-medium mb-4">How We Use Your Information</h2>
          <p className="mb-4">We use the information we collect for various purposes, including to:</p>
          <ul className="list-disc ml-6 space-y-2">
            <li>Provide, operate, and maintain our platform</li>
            <li>Personalize and improve your learning experience</li>
            <li>Process transactions and send related information</li>
            <li>Send administrative information, updates, and marketing communications</li>
            <li>Respond to inquiries and provide customer support</li>
            <li>Monitor and analyze usage trends to improve our service</li>
            <li>Protect our platform from unauthorized access and abuse</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>
        
        <section>
          <h2 className="text-xl font-medium mb-4">Sharing Your Information</h2>
          <p className="mb-4">We may share your information with:</p>
          <ul className="list-disc ml-6 space-y-2">
            <li>Service providers who assist us in operating our platform</li>
            <li>Partners who offer complementary services (with your consent)</li>
            <li>Legal and regulatory authorities when required by law</li>
            <li>In connection with a business transfer or acquisition</li>
          </ul>
          <p className="mt-4">
            We do not sell or rent your personal information to third parties for their marketing purposes without your explicit consent.
          </p>
        </section>
        
        <section>
          <h2 className="text-xl font-medium mb-4">Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, disclosure, alteration, and destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
          </p>
        </section>
        
        <section>
          <h2 className="text-xl font-medium mb-4">Your Rights</h2>
          <p className="mb-4">Depending on your location, you may have the following rights regarding your personal information:</p>
          <ul className="list-disc ml-6 space-y-2">
            <li>Access and obtain a copy of your personal information</li>
            <li>Rectify inaccurate or incomplete information</li>
            <li>Request deletion of your personal information</li>
            <li>Restrict or object to processing of your information</li>
            <li>Data portability</li>
            <li>Withdraw consent (where processing is based on consent)</li>
          </ul>
          <p className="mt-4">
            To exercise these rights, please contact us at privacy@tobeystutor.com.
          </p>
        </section>
        
        <section>
          <h2 className="text-xl font-medium mb-4">Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.
          </p>
        </section>
        
        <section>
          <h2 className="text-xl font-medium mb-4">Contact Us</h2>
          <p>
            If you have any questions or concerns about this Privacy Policy or our privacy practices, please contact us at:
          </p>
          <div className="mt-4">
            <p>Email: privacy@tobeystutor.com</p>
            <p>Address: 123 Learning Lane, San Francisco, CA 94110</p>
          </div>
        </section>
      </div>
    </PolicyLayout>
  );
};

export default PrivacyPolicy;
