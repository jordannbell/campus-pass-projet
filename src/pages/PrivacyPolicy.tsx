import React from 'react';

function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Politique de Confidentialité</h1>
        
        <div className="prose prose-red max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Collecte des informations</h2>
            <p className="text-gray-700 mb-4">
              Nous collectons les informations que vous nous fournissez directement lorsque vous :
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Créez un compte</li>
              <li>Remplissez un formulaire</li>
              <li>Communiquez avec nous</li>
              <li>Utilisez notre service</li>
            </ul>
            <p className="text-gray-700">
              Ces informations peuvent inclure votre nom, adresse email, numéro de téléphone,
              et documents académiques.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Utilisation des informations</h2>
            <p className="text-gray-700 mb-4">
              Nous utilisons les informations collectées pour :
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Traiter votre dossier d\u0027admission</li>
              <li>Communiquer avec vous concernant nos services</li>
              <li>Améliorer nos services</li>
              <li>Respecter nos obligations légales</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Protection des informations</h2>
            <p className="text-gray-700 mb-4">
              Nous prenons la sécurité de vos informations très au sérieux. Nous utilisons
              des mesures de sécurité appropriées pour protéger vos données contre tout accès
              non autorisé ou toute modification.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Partage des informations</h2>
            <p className="text-gray-700 mb-4">
              Nous ne partageons vos informations qu\u0027avec :
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Les établissements d\u0027enseignement concernés par votre dossier</li>
              <li>Les autorités compétentes si requis par la loi</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Vos droits</h2>
            <p className="text-gray-700 mb-4">
              Vous avez le droit de :
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Accéder à vos données personnelles</li>
              <li>Rectifier vos données</li>
              <li>Supprimer vos données</li>
              <li>Vous opposer au traitement de vos données</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Contact</h2>
            <p className="text-gray-700">
              Pour toute question concernant notre politique de confidentialité,
              veuillez nous contacter à{' '}
              <a href="mailto:campuspasscontact@gmail.com" className="text-red-800 hover:text-red-700">
                campuspasscontact@gmail.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;