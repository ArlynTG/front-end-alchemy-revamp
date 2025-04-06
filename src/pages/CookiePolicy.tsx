
import PolicyLayout from "@/components/PolicyLayout";

const CookiePolicy = () => {
  return (
    <PolicyLayout title="Cookie Policy">
      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-medium mb-4">What Are Cookies</h2>
          <p className="mb-4">
            Cookies are small text files that are placed on your computer or mobile device when you visit a website. Cookies are widely used to make websites work more efficiently and provide information to the website owners.
          </p>
          <p>
            Cookies help us enhance your experience on our website by remembering your preferences, understanding how you use our website, and tailoring content to your interests.
          </p>
        </section>
        
        <section>
          <h2 className="text-xl font-medium mb-4">Types of Cookies We Use</h2>
          <p className="mb-4">We use the following types of cookies:</p>
          
          <h3 className="text-lg font-medium mb-2">Essential Cookies</h3>
          <p className="mb-4">
            These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and account access. You can set your browser to block these cookies, but some parts of the website may not function properly.
          </p>
          
          <h3 className="text-lg font-medium mb-2">Performance and Analytics Cookies</h3>
          <p className="mb-4">
            These cookies collect information about how visitors use our website, such as which pages visitors go to most often and if they receive error messages. This information helps us improve our website and your browsing experience. All information collected by these cookies is aggregated and anonymous.
          </p>
          
          <h3 className="text-lg font-medium mb-2">Functionality Cookies</h3>
          <p className="mb-4">
            These cookies allow the website to remember choices you make (such as your username, language, or the region you are in) and provide enhanced, personalized features. They may also be used to provide services you have requested, such as watching a video or commenting on a blog.
          </p>
          
          <h3 className="text-lg font-medium mb-2">Targeting and Advertising Cookies</h3>
          <p className="mb-4">
            These cookies are used to deliver advertisements that are more relevant to you and your interests. They are also used to limit the number of times you see an advertisement and help measure the effectiveness of advertising campaigns. They remember that you have visited a website and this information may be shared with other organizations, such as advertisers.
          </p>
        </section>
        
        <section>
          <h2 className="text-xl font-medium mb-4">Third-Party Cookies</h2>
          <p className="mb-4">
            In addition to our own cookies, we may also use various third-party cookies to report usage statistics, deliver advertisements, and so on. These cookies may be used when you share information using a social media sharing button or link on our site.
          </p>
          <p>
            The third-party companies we work with include Google Analytics, Facebook, Twitter, and other advertising networks and partners.
          </p>
        </section>
        
        <section>
          <h2 className="text-xl font-medium mb-4">Managing Cookies</h2>
          <p className="mb-4">
            Most web browsers allow you to control cookies through their settings preferences. However, if you limit the ability of websites to set cookies, you may worsen your overall user experience, as it will no longer be personalized to you. It may also stop you from saving customized settings like login information.
          </p>
          <p className="mb-4">
            To manage cookies through your web browser, you can:
          </p>
          <ul className="list-disc ml-6 space-y-2">
            <li>
              <strong>Google Chrome:</strong> Click the three dots in the top right corner, select "Settings" {'>'}  "Privacy and security" {'>'} "Cookies and other site data."
            </li>
            <li>
              <strong>Microsoft Edge:</strong> Click the three dots in the top right corner, select "Settings" {'>'} "Cookies and site permissions" {'>'} "Manage and delete cookies and site data."
            </li>
            <li>
              <strong>Safari:</strong> Click "Safari" in the top menu, select "Preferences" {'>'} "Privacy" {'>'} "Manage Website Data."
            </li>
            <li>
              <strong>Firefox:</strong> Click the three lines in the top right corner, select "Options" {'>'} "Privacy & Security" {'>'} in the "Cookies and Site Data" section, click "Manage Data."
            </li>
          </ul>
          <p className="mt-4">
            You can also visit <a href="https://www.aboutcookies.org" className="text-tobey-orange hover:underline" target="_blank" rel="noopener noreferrer">www.aboutcookies.org</a> or <a href="https://www.allaboutcookies.org" className="text-tobey-orange hover:underline" target="_blank" rel="noopener noreferrer">www.allaboutcookies.org</a> for more information about cookies and how to manage them.
          </p>
        </section>
        
        <section>
          <h2 className="text-xl font-medium mb-4">Do Not Track Signals</h2>
          <p>
            Some browsers have a "Do Not Track" feature that lets you tell websites that you do not want to have your online activities tracked. We currently do not respond to "Do Not Track" signals because there is not yet a common understanding of how to interpret these signals.
          </p>
        </section>
        
        <section>
          <h2 className="text-xl font-medium mb-4">Changes to Our Cookie Policy</h2>
          <p>
            We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie Policy on this page and updating the "Last Updated" date. You are advised to review this Cookie Policy periodically for any changes.
          </p>
        </section>
        
        <section>
          <h2 className="text-xl font-medium mb-4">Contact Us</h2>
          <p>
            If you have any questions about our Cookie Policy, please contact us at:
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

export default CookiePolicy;
