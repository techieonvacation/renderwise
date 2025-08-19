import { Globe, Shield, Zap } from "lucide-react";
import { CheckCircle } from "lucide-react";
import Image from "next/image";

const ContactHeader = () => {
  return (
    <section className="relative">
      <div className="grid lg:grid-cols-2">
        <div className="bg-primary px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-lg">
            <h1 className="title text-primary-foreground">
              Let&apos;s build your digital future together
            </h1>
            <p className="mt-6 text-lg text-primary-foreground/90 font-dmsans">
              Our team of experts is ready to help you transform your business
              with cutting-edge technology solutions.
            </p>
          </div>
        </div>

        <div className="relative">
          <Image
            src="https://media.istockphoto.com/id/1271752802/photo/phone-and-e-mail-icons-on-wooden-cubes-with-contact-us-text-on-blue-background-web-page.jpg?s=612x612&w=0&k=20&c=dk9oPaDy_L9mv_icOMgsFGzEDrX0NUI3I8xBQ-DAxQM="
            width={500}
            height={500}
            alt="IT professionals in a modern office"
            className="h-auto w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default ContactHeader;
