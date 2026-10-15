type PlaceholderPageProps = {
title: string;
};

const PlaceholderPage = ({ title }: PlaceholderPageProps) => (

  <main>
    <h1>{title}</h1>
    <p>This page will be implemented next.</p>
  </main>
);

export default PlaceholderPage;
