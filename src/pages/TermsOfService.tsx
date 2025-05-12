import PolicyLayout from "@/components/PolicyLayout";

const TermsOfService = () => {
  return (
    <PolicyLayout title="Terms of Service">
      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-medium mb-4">Agreement to Terms</h2>
          <p className="mb-4">
            These Terms of Service ("Terms") govern your access to and use of Tobey's Tutor's website, products, and services ("Services"). Please read these Terms carefully before using our Services.
          </p>
          <p>
            By accessing or using our Services, you agree to be bound by these Terms and our Privacy Policy. If you disagree with any part of the Terms, you may not access the Services.
          </p>
        </section>
        
        <section>
          <h2 className="text-xl font-medium mb-4">Account Registration</h2>
          <p className="mb-4">
            To access certain features of our Services, you may be required to register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
          </p>
          <p className="mb-4">
            You are responsible for safeguarding the password that you use to access the Services and for any activities or actions under your password. We encourage you to use "strong" passwords (passwords that use a combination of upper and lower case letters, numbers, and symbols) with your account.
          </p>
          <p>
            You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
          </p>
        </section>
        
        <section>
          <h2 className="text-xl font-medium mb-4">Subscriptions and Payments</h2>
          <p className="mb-4">
            Some parts of the Services are billed on a subscription basis. You will be billed in advance on a recurring and periodic basis (monthly or annually, depending on the subscription plan you select). Billing cycles are set on a recurring basis, starting on the date your subscription begins.
          </p>
          <p className="mb-4">
            Auto-renewal: Your subscription will automatically renew at the end of each billing period unless you cancel it or we terminate it. You may cancel your subscription renewal by contacting us or through your account settings.
          </p>
          <p className="mb-4">
            Free Trial: We offer a 7-day free trial for new users. If you do not cancel during the free trial period, you will be automatically charged for the subscription plan you selected.
          </p>
          <p>
            Refunds: Refunds are handled on a case-by-case basis. Please contact our customer support team to request a refund.
          </p>
        </section>
        
        <section>
          <h2 className="text-xl font-medium mb-4">Acceptable Use Policy</h2>
          <p className="mb-4">You agree not to use the Services:</p>
          <ul className="list-disc ml-6 space-y-2">
            <li>In any way that violates any applicable federal, state, local, or international law or regulation</li>
            <li>For the purpose of exploiting, harming, or attempting to exploit or harm minors in any way</li>
            <li>To transmit, or procure the sending of, any advertising or promotional material, including any "junk mail," "chain letter," "spam," or any other similar solicitation</li>
            <li>To impersonate or attempt to impersonate Tobey's Tutor, a Tobey's Tutor employee, another user, or any other person or entity</li>
            <li>To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the Services, or which may harm Tobey's Tutor or users of the Services or expose them to liability</li>
          </ul>
        </section>
        
        <section>
          <h2 className="text-xl font-medium mb-4">Intellectual Property Rights</h2>
          <p className="mb-4">
            The Services and their original content (excluding content provided by users), features, and functionality are and will remain the exclusive property of Tobey's Tutor and its licensors. The Services are protected by copyright, trademark, and other laws of both the United States and foreign countries.
          </p>
          <p>
            Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Tobey's Tutor.
          </p>
        </section>
        
        <section>
          <h2 className="text-xl font-medium mb-4">User-Generated Content</h2>
          <p className="mb-4">
            Our Services may allow you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material. You are responsible for the content that you post to the Services, including its legality, reliability, and appropriateness.
          </p>
          <p className="mb-4">
            By posting content to the Services, you grant us the right and license to use, modify, publicly perform, publicly display, reproduce, and distribute such content on and through the Services. You retain any and all of your rights to any content you submit, post, or display on or through the Services and you are responsible for protecting those rights.
          </p>
          <p>
            You represent and warrant that: (i) the content is yours or you have the right to use it and grant us the rights and license as provided in these Terms, and (ii) the posting of your content on or through the Services does not violate the privacy rights, publicity rights, copyrights, contract rights or any other rights of any person.
          </p>
        </section>
        
        <section>
          <h2 className="text-xl font-medium mb-4">Limitation of Liability</h2>
          <p className="mb-4">
            In no event shall Tobey's Tutor, its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Services.
          </p>
        </section>
        
        <section>
          <h2 className="text-xl font-medium mb-4">Termination</h2>
          <p className="mb-4">
            We may terminate or suspend your account and bar access to the Services immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.
          </p>
          <p>
            If you wish to terminate your account, you may simply discontinue using the Services, or contact us to request account deletion.
          </p>
        </section>
        
        <section>
          <h2 className="text-xl font-medium mb-4">Changes to Terms</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
          </p>
        </section>
        
        <section>
          <h2 className="text-xl font-medium mb-4">Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at:
          </p>
          <div className="mt-4">
            <p>Email: support@tobeystutor.com</p>
          </div>
        </section>
      </div>
    </PolicyLayout>
  );
};

export default TermsOfService;
