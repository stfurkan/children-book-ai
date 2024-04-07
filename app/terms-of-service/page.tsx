import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL('https://childrensbookai.net'),
  title: "Terms of Service | Children’s Book AI",
  description: "Terms of Service for Children’s Book AI.",
  openGraph: {
    type: "website",
    url: "https://childrensbookai.net",
    title: "Terms of Service | Children’s Book AI",
    description: "Terms of Service for Children’s Book AI.",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/logo-square.png`,
        width: 1024,
        height: 1024,
        alt: "Children’s Book AI",
      },
    ],
  },
};

export default function TermsOfService() {
  return (
    <div className="flex flex-col items-center sm:mx-24 space-y-2">
      <h1 className="font-bold text-3xl">Terms of Service</h1>
      <p>
        Effective date: April 7, 2024
      </p>
      <p>
        Welcome to Children’s Book AI, accessible at childrensbookai.net.
        These Terms of Service (&quot;Terms&quot;, &quot;ToS&quot;) govern your use of our website and its
        associated services (collectively, &quot;Website&quot; or &quot;Service&quot;). By accessing or using
        the Service, you signify your agreement to these Terms. If you do not agree to these
        terms, please do not use our Service.
      </p>

      <h2 className="font-semibold text-xl">Use of Our Service</h2>
      <p>
        Children’s Book AI provides a platform for users to create, share, and publish children’s books
        using AI technology provided by third parties such as OpenAI, as well as other functionalities
        related to the creation and distribution of children’s books.
      </p>
      <ul className="list-disc pl-8">
        <li>
          <strong>Eligibility:</strong> You must be at least 18 years old to use our Service or the age of
          majority in your country of residence. By agreeing to these Terms, you represent and warrant to us
          that you are at least 18 years old or of legal age in your jurisdiction.
        </li>
        <li>
          <strong>Account Registration:</strong> You may be required to register for an account to access
          certain features of the Service. You agree to keep your password confidential and will be
          responsible for all use of your account and password.
        </li>
        <li>
          <strong>Accounts:</strong> When you create an account with us, you must provide
          us with information that is accurate, complete, and current at all times. Failure to do so
          constitutes a breach of the Terms, which may result in immediate termination of your account
          on our Service.
        </li>
        <li>
          <strong>Content:</strong> You are responsible for the content you create and share on our Service.
          By using our Service, you agree not to post content that is defamatory, obscene, threatening,
          invasive of privacy, infringing of intellectual property rights, or otherwise objectionable.
        </li>
        <li>
          <strong>User Contributions:</strong> Users can publish their created content on our website.
          By posting content, you grant us the right and license to use, modify, publicly perform,
          publicly display, reproduce, and distribute such content on and through the Service.
        </li>
      </ul>

      <h2 className="font-semibold text-xl">Prohibited Activities</h2>
      <p>
        You are prohibited from using the site or its content for any unlawful purpose, to solicit others
        to perform or participate in any unlawful acts, to violate any international, federal, or state
        regulations, rules, laws, or local ordinances, to infringe upon or violate our intellectual
        property rights or the intellectual property rights of others, to harass, abuse, insult, harm,
        defame, slander, disparage, intimidate, or discriminate based on gender, sexual orientation,
        religion, ethnicity, race, age, national origin, or disability, to submit false or misleading
        information, to upload or transmit viruses or any other type of malicious code, or to engage in
        any other conduct that restricts or inhibits anyone’s use or enjoyment of the Service, or which,
        as determined by us, may harm or offend the company or users of the Service or expose them to liability.
      </p>

      <h2 className="font-semibold text-xl">Intellectual Property Rights</h2>
      <p>
        The Service and its original content, features, and functionality are and will remain the exclusive
        property of Children’s Book AI and its licensors. The Service is protected by copyright,
        trademark, and other laws of both the United States and foreign countries. Our trademarks and trade
        dress may not be used in connection with any product or service without the prior written consent
        of Children’s Book AI.
      </p>

      <h2 className="font-semibold text-xl">Termination</h2>
      <p>
        We may terminate or suspend your account and bar access to the Service immediately, without prior
        notice or liability, under our sole discretion, for any reason whatsoever and without limitation,
        including but not limited to a breach of the Terms. If you wish to terminate your account, you may
        simply discontinue using the Service.
      </p>

      <h2 className="font-semibold text-xl">Indemnification</h2>
      <p>
        You agree to defend, indemnify, and hold harmless Children’s Book AI and its licensee and licensors,
        and their employees, contractors, agents, officers, and directors, from and against any and all claims,
        damages, obligations, losses, liabilities, costs or debt, and expenses (including but not
        limited to attorney’s fees), resulting from or arising out of a) your use and access of the Service,
        by you or any person using your account and password; b) a breach of these Terms,
        or c) Content posted on the Service.
      </p>

      <h2 className="font-semibold text-xl">Limitation of Liability</h2>
      <p>
        In no event shall Children’s Book AI, nor its directors, employees, partners, agents, suppliers,
        or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages,
        including without limitation, loss of profits, data, use, goodwill, or other intangible losses,
        resulting from (i) your access to or use of or inability to access or use the Service;
        (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the
        Service; and (iv) unauthorized access, use, or alteration of your transmissions or content,
        whether based on warranty, contract, tort (including negligence), or any other legal theory,
        whether or not we have been informed of the possibility of such damage, and even if a remedy set
        forth herein is found to have failed of its essential purpose.
      </p>

      <h2 className="font-semibold text-xl">Disclaimer</h2>
      <p>
        Your use of the Service is at your sole risk. The Service is provided on an &quot;AS IS&quot; and
        &quot;AS AVAILABLE&quot; basis. The Service is provided without warranties of any kind, whether
        express or implied, including, but not limited to, implied warranties of merchantability,
        fitness for a particular purpose, non-infringement, or course of performance.
      </p>

      <h2 className="font-semibold text-xl">Governing Law</h2>
      <p>
        These Terms shall be governed and construed in accordance with the laws of the United States,
        without regard to its conflict of law provisions.
      </p>

      <h2 className="font-semibold text-xl">Changes</h2>
      <p>
        We reserve the right, at our sole discretion, to modify or replace these Terms at any time.
        If a revision is material, we will provide at least 30 days’ notice prior to any new terms taking effect.
        What constitutes a material change will be determined at our sole discretion.
      </p>

      <h2 className="font-semibold text-xl">Contact Us</h2>
      <p>
        If you have any questions about these Terms, please contact us at: {' '}
        <a href="mailto:contact@childrensbookai.net">contact@childrensbookai.net</a>
      </p>
    </div>
  );
}
