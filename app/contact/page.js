import { fetchAPI } from "@/lib/strapi";
import ContactContent from "./ContactContent";
import { SITE } from "@/lib/config";

export const revalidate = 60;

export default async function ContactPage() {
  const data = await fetchAPI("contact");
  const contact = {
    email: data?.email || SITE.email,
    github: data?.github || SITE.github,
    linkedin: data?.linkedin || SITE.linkedin,
    twitter: data?.twitter || SITE.twitter,
  };
  return <ContactContent contact={contact} />;
}