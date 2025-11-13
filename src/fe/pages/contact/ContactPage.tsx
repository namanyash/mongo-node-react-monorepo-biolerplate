import React, { FC } from "react";
import { PageContainer } from "../../components/PageContainer";
import { ContactHero } from "./components/ContactHero";
import { ContactForm } from "./components/ContactForm";
import { ContactInfo } from "./components/ContactInfo";

export const ContactPage: FC = () => {
  return (
    <PageContainer>
      <ContactHero />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 py-16">
        <ContactForm />
        <ContactInfo />
      </div>
    </PageContainer>
  );
};
