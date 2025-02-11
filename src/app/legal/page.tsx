import "@/app/globals.css";
import styles from "./page.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Legal | Recoz",
  description: "End User Agreement and Privacy Policy",
};

export default async function EndUserAgreement() {
  return (
    <>
      <main className={styles.legal}>
        <h2>Legal</h2>
        <h3>
          <strong>End User Agreement</strong>
        </h3>
        <p className={styles.date}>
          <strong>Last Updated: 11/02/2025</strong>
        </p>
        <p>
          This End User Agreement ("Agreement") governs your use of Recoz ("the
          App"), a web-based application that provides music recommendations
          based on user input using the Spotify API. By accessing or using the
          App, you agree to be bound by this Agreement. If you do not agree to
          these terms, please do not use the App.
        </p>
        ​
        <h4>
          1. <strong>Use of the App</strong>
        </h4>
        <ul>
          <li>
            <p>
              The App is designed to provide music recommendations based on user
              input using the Spotify API.
            </p>
          </li>
          <li>
            <p>
              To use the App, you must log in to your Spotify account through
              Spotify's authentication system. The App does not handle or store
              your Spotify login credentials.
            </p>
          </li>
          <li>
            <p>
              The App does not create or manage user accounts and does not store
              any personal data.
            </p>
          </li>
          <li>
            <p>
              You agree to use the App only for lawful purposes and in
              compliance with all applicable laws and regulations.
            </p>
          </li>
        </ul>
        ​
        <h4>
          2. <strong>Spotify API</strong>
        </h4>
        <ul>
          <li>
            <p>
              The App uses the Spotify API to retrieve music recommendations. By
              using the App, you agree to comply with Spotify's 
              <a href="https://developer.spotify.com/terms/">
                Developer Terms of Use
              </a>
               and 
              <a href="https://www.spotify.com/legal/privacy-policy/">
                Spotify's Privacy Policy
              </a>
              .
            </p>
          </li>
          <li>
            <p>
              The App does not store, cache, or retain any data obtained from
              the Spotify API, including but not limited to track information,
              artist information, or user data.
            </p>
          </li>
        </ul>
        ​
        <h4>
          3. <strong>Intellectual Property</strong>
        </h4>
        <ul>
          <li>
            <p>
              All content provided through the Spotify API, including music,
              artist names, and album art, is owned by Spotify and/or its
              licensors. You may not reproduce, distribute, or use such content
              outside of the App without proper authorization from Spotify.
            </p>
          </li>
        </ul>
        ​
        <h4>
          4. <strong>Disclaimer of Warranties</strong>
        </h4>
        <ul>
          <li>
            <p>
              The App is provided "as is" and "as available" without any
              warranties of any kind, either express or implied, including but
              not limited to the accuracy, reliability, or availability of the
              recommendations provided.
            </p>
          </li>
          <li>
            <p>
              We do not guarantee that the App will be error-free,
              uninterrupted, or compatible with your device or browser.
            </p>
          </li>
        </ul>
        ​
        <h4>
          5. <strong>Limitation of Liability</strong>
        </h4>
        <ul>
          <li>
            <p>
              To the fullest extent permitted by law, the Recoz team shall not
              be liable for any indirect, incidental, special, or consequential
              damages arising out of or in connection with your use of the App.
            </p>
          </li>
        </ul>
        ​
        <h4>
          6. <strong>Changes to This Agreement</strong>
        </h4>
        <ul>
          <li>
            <p>
              We reserve the right to modify this Agreement at any time. Any
              changes will be effective immediately upon posting the updated
              Agreement on the App. Your continued use of the App after such
              changes constitutes your acceptance of the revised Agreement.
            </p>
          </li>
        </ul>
        ​
        <h4>
          7. <strong>Governing Law</strong>
        </h4>
        <ul>
          <li>
            <p>
              This Agreement shall be governed by and construed in accordance
              with the laws of <strong>France</strong> and the European Union.
              Any disputes arising out of or in connection with this Agreement
              shall be subject to the exclusive jurisdiction of the courts of 
              <strong>France</strong>.
            </p>
          </li>
          <li>
            <p>
              <strong>Spotify Compliance</strong>: Ensure your app continues to
              comply with Spotify's 
              <a href="https://developer.spotify.com/terms/">
                Developer Terms of Use
              </a>
               and 
              <a href="https://developer.spotify.com/branding-guidelines/">
                Branding Guidelines
              </a>
              .
            </p>
          </li>
        </ul>
        <h3>
          <strong>Privacy Policy</strong>
        </h3>
        <p className={styles.date}>
          <strong>Last Updated: 11/02/2025</strong>
        </p>
        <p>
          This Privacy Policy explains how Recoz ("the App") handles information
          when you use our web-based application. The App does not collect,
          store, or retain any personal data. However, since the App uses the
          Spotify API and necessary cookies, we want to ensure transparency
          about how data is processed.
        </p>
        ​
        <h4>
          1. <strong>Information We Do Not Collect</strong>
        </h4>
        <ul>
          <li>
            <p>
              The App does not require user accounts, logins, or any form of
              registration on our side.
            </p>
          </li>
          <li>
            <p>
              When you log in to Spotify to use the App, your Spotify
              credentials are handled directly by Spotify. We do not collect,
              store, or have access to your Spotify login information.
            </p>
          </li>
          <li>
            <p>
              The App does not collect, store, or retain any personal data,
              including but not limited to names, email addresses, IP addresses,
              or browsing history.
            </p>
          </li>
        </ul>
        ​
        <h4>
          2. <strong>Spotify API Data</strong>
        </h4>
        <ul>
          <li>
            <p>
              The App uses the Spotify API to retrieve music recommendations
              based on your input. To access the Spotify API, you must log in to
              your Spotify account through Spotify's authentication system.
            </p>
          </li>
          <li>
            <p>
              The App does not store or cache any data obtained from the Spotify
              API, including but not limited to track information, artist
              information, or user data.
            </p>
          </li>
          <li>
            <p>
              Any data processed through the Spotify API is subject to
              Spotify's 
              <a href="https://www.spotify.com/legal/privacy-policy/">
                Privacy Policy
              </a>
              . We encourage you to review Spotify's policies to understand how
              they handle your data.
            </p>
          </li>
        </ul>
        ​
        <h4>
          3. <strong>Cookies and Tracking</strong>
        </h4>
        <ul>
          <li>
            <p>
              The App uses <strong>strictly necessary cookies</strong> to store
              an API token required for the functionality of the App. These
              cookies are essential for the App to operate and do not collect
              any personal data.
            </p>
          </li>
          <li>
            <p>
              The App does not use any other cookies, tracking technologies, or
              analytics tools to collect information about your use of the App.
            </p>
          </li>
        </ul>
        ​
        <h4>
          4. <strong>Third-Party Links</strong>
        </h4>
        <ul>
          <li>
            <p>
              The App may include links to third-party websites or services,
              such as Spotify. We are not responsible for the privacy practices
              or content of these third-party sites.
            </p>
          </li>
        </ul>
        ​
        <h4>
          5. <strong>Changes to This Privacy Policy</strong>
        </h4>
        <ul>
          <li>
            <p>
              We may update this Privacy Policy from time to time. Any changes
              will be effective immediately upon posting the updated Privacy
              Policy on the App. Your continued use of the App after such
              changes constitutes your acceptance of the revised Privacy Policy.
            </p>
          </li>
        </ul>
        ​
        <h4>
          6. <strong>Contact Us</strong>
        </h4>
        <ul>
          <li>
            <p>
              If you have any questions about this Privacy Policy, please
              contact us at fk.contactme@gmail.com.
            </p>
          </li>
        </ul>
      </main>
    </>
  );
}
