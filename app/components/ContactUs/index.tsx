import ContactUsForm from "./ContactUsForm";
import ContactHeader from "./ContactHeader";

export default function ContactUs() {
  return (
    <main className="relative overflow-hidden">
      <ContactHeader />
      {/* Contact Form Section */}
      <section className="relative z-20 -mt-12 md:-mt-24">
        <ContactUsForm />
      </section>
    </main>
  );
}
